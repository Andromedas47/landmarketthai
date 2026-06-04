import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { z } from "zod";

const schema = z.object({
  event_type: z.string().min(1).max(100),
  entity_type: z.string().max(50).optional(),
  entity_id: z.string().uuid().optional(),
  session_id: z.string().max(100).optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);
    if (!result.success) return NextResponse.json({ ok: true }); // Silent ignore bad events

    const db = createServerClient();
    await db.from("events").insert({
      ...result.data,
      meta: result.data.meta ?? {},
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // Never error on analytics
  }
}
