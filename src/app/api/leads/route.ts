import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import {
  buyerLeadSchema,
  partnerLeadSchema,
  ownerLeadSchema,
} from "@/lib/validations";
// Honeypot + rate limit (basic: rely on Vercel edge for real rate limiting)
const MAX_BODY = 10_000;

export async function POST(req: NextRequest) {
  try {
    const text = await req.text();
    if (text.length > MAX_BODY) {
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    }
    const body = JSON.parse(text);

    // Honeypot field check
    if (body._hp) {
      return NextResponse.json({ ok: true }); // Silent discard
    }

    const { lead_type } = body;

    let parsed: Record<string, unknown>;
    let details: Record<string, unknown> = {};

    if (lead_type === "buyer") {
      const result = buyerLeadSchema.safeParse(body);
      if (!result.success) {
        return NextResponse.json({ error: result.error.flatten() }, { status: 422 });
      }
      const { name, phone, line_id, referral_code, source, consent_pdpa, ...buyerDetails } = result.data;
      parsed = { name, phone, line_id, referral_code, source, consent_pdpa };
      details = buyerDetails;
    } else if (lead_type === "partner") {
      const result = partnerLeadSchema.safeParse(body);
      if (!result.success) {
        return NextResponse.json({ error: result.error.flatten() }, { status: 422 });
      }
      const { name, phone, line_id, referral_code, source, consent_pdpa, ...partnerDetails } = result.data;
      parsed = { name, phone, line_id, referral_code, source, consent_pdpa };
      details = partnerDetails;
    } else if (lead_type === "owner") {
      const result = ownerLeadSchema.safeParse(body);
      if (!result.success) {
        return NextResponse.json({ error: result.error.flatten() }, { status: 422 });
      }
      const { name, phone, line_id, source, consent_pdpa, ...ownerDetails } = result.data;
      parsed = { name, phone, line_id, source, consent_pdpa };
      details = ownerDetails;
    } else {
      return NextResponse.json({ error: "Invalid lead_type" }, { status: 400 });
    }

    const db = createServerClient();
    const { data: lead, error } = await db
      .from("leads")
      .insert({
        lead_type,
        name: parsed.name,
        phone: parsed.phone,
        line_id: parsed.line_id ?? null,
        referral_code: (parsed.referral_code as string) ?? null,
        source: (parsed.source as string) ?? req.headers.get("referer") ?? null,
        details,
        consent_pdpa: parsed.consent_pdpa,
        consent_at: parsed.consent_pdpa ? new Date().toISOString() : null,
        status: "new",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Lead insert error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    // Record referral attribution if referral_code present
    if ((parsed.referral_code as string) && lead?.id) {
      await db.from("referral_attributions").insert({
        referral_code: parsed.referral_code as string,
        lead_id: lead.id,
        entity_type: lead_type === "owner" ? "owner" : "buyer",
        first_touch_at: new Date().toISOString(),
      });
    }

    // Fire n8n webhook async (fire-and-forget; never blocks response)
    const webhookUrl = process.env.N8N_WEBHOOK_LEADS;
    if (webhookUrl && lead?.id) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead_id: lead.id, lead_type, name: parsed.name }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true, id: lead?.id });
  } catch (err) {
    console.error("Lead route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
