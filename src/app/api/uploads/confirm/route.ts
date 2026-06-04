import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { uploadConfirmSchema } from "@/lib/validations";
import { headStorageObject } from "@/lib/storage/provider";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = uploadConfirmSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 422 });
    }

    const { storageKey, leadId, docType, mimeType, fileSize, originalName } = result.data;

    // storageKey must match leads/{leadId}/attachments/ — prevents cross-lead writes
    const expectedPrefix = `leads/${leadId}/attachments/`;
    if (!storageKey.startsWith(expectedPrefix)) {
      return NextResponse.json({ error: "Storage key mismatch" }, { status: 403 });
    }

    // Verify the object was actually uploaded before recording metadata
    const exists = await headStorageObject(storageKey);
    if (!exists) {
      return NextResponse.json({ error: "File not found in storage" }, { status: 404 });
    }

    const db = createServerClient();
    const { error: insertError } = await db.from("lead_attachments").insert({
      lead_id: leadId,
      file_name: originalName,
      storage_key: storageKey,
      mime_type: mimeType,
      size_bytes: fileSize,
      doc_type: docType ?? "other",
      is_sensitive: true,
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
