import { NextRequest, NextResponse } from "next/server";
import { generatePresignedUpload } from "@/lib/storage/provider";
import { presignSchema } from "@/lib/validations";
import { createServerClient } from "@/lib/supabase/server";
import type { StorageFolder } from "@/lib/storage/provider";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = presignSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 422 });
    }

    const { leadId, mimeType, fileSize, originalName } = result.data;

    // Verify the lead exists before issuing a presigned URL
    const db = createServerClient();
    const { data: lead, error: leadError } = await db
      .from("leads")
      .select("id")
      .eq("id", leadId)
      .single();

    if (leadError || !lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Construct folder server-side — never trust folder from client
    const folder: StorageFolder = `leads/${leadId}/attachments`;

    const { uploadUrl, storageKey } = await generatePresignedUpload({
      folder,
      mimeType,
      fileSize,
      originalName,
    });

    // cdnUrl is omitted — attachments are private
    return NextResponse.json({ uploadUrl, storageKey });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
