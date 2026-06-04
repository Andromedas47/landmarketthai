"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import LineButton from "@/components/ui/LineButton";

type LeadType = "buyer" | "partner" | "owner";

interface Props {
  listingId?: string;
  defaultType?: LeadType;
  compact?: boolean;
  referralCode?: string;
}

export default function LeadForm({ listingId, defaultType = "buyer", compact = false, referralCode }: Props) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    // Honeypot check (client-side; also checked server-side)
    if (data._hp) { setState("success"); return; }

    const payload = {
      lead_type: defaultType,
      name: data.name,
      phone: data.phone,
      line_id: data.line_id || undefined,
      listing_id: listingId,
      referral_code: referralCode || data.referral_code || undefined,
      consent_pdpa: data.consent_pdpa === "on" ? true : undefined,
      source: typeof window !== "undefined" ? window.location.pathname : undefined,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        setErrorMsg("กรุณาตรวจสอบข้อมูลอีกครั้ง");
        setState("error");
      } else {
        setState("success");
      }
    } catch {
      setErrorMsg("เกิดข้อผิดพลาด กรุณาลองใหม่");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <CheckCircle2 size={40} className="text-green-500" />
        <div>
          <div className="font-semibold text-slate-800 text-lg">ได้รับข้อมูลแล้ว!</div>
          <div className="text-sm text-slate-500 mt-1">
            ทีมงานจะติดต่อกลับภายใน 1 วันทำการ หรือเพิ่ม LINE เพื่อตอบเร็วขึ้น
          </div>
        </div>
        <LineButton label="เพิ่ม LINE OA เพื่อติดตามสถานะ" size="sm" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Honeypot */}
      <input type="text" name="_hp" className="hidden" tabIndex={-1} autoComplete="off" />

      {!compact && (
        <h3 className="font-semibold text-slate-800 text-lg">
          {defaultType === "buyer" ? "สนใจที่ดินนี้" :
           defaultType === "partner" ? "สมัครพาร์ทเนอร์" :
           "ส่งข้อมูลที่ดิน"}
        </h3>
      )}

      <div>
        <label className="label" htmlFor="lead-name">ชื่อ – นามสกุล *</label>
        <input
          id="lead-name"
          name="name"
          required
          className="input"
          placeholder="สมชาย ใจดี"
          disabled={state === "loading"}
        />
      </div>

      <div>
        <label className="label" htmlFor="lead-phone">เบอร์โทรศัพท์ *</label>
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          required
          pattern="0[0-9]{8,9}"
          className="input"
          placeholder="0812345678"
          disabled={state === "loading"}
        />
      </div>

      <div>
        <label className="label" htmlFor="lead-line">LINE ID (ถ้ามี)</label>
        <input
          id="lead-line"
          name="line_id"
          className="input"
          placeholder="@yourline"
          disabled={state === "loading"}
        />
      </div>

      {/* PDPA */}
      <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
        <input
          type="checkbox"
          name="consent_pdpa"
          required
          className="mt-0.5 accent-brand-500"
          disabled={state === "loading"}
        />
        <span>
          ยินยอมให้เก็บและใช้ข้อมูลส่วนบุคคล ตาม{" "}
          <a href="/privacy" target="_blank" className="underline text-brand-600">
            นโยบายความเป็นส่วนตัว
          </a>
        </span>
      </label>

      {state === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={15} />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="btn-primary w-full justify-center disabled:opacity-60"
      >
        {state === "loading" ? <Loader2 size={16} className="animate-spin" /> : null}
        {defaultType === "buyer" ? "สนใจที่ดินนี้" :
         defaultType === "partner" ? "สมัครพาร์ทเนอร์" :
         "ส่งข้อมูลที่ดิน"}
      </button>
    </form>
  );
}
