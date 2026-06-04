"use client";

import { useRouter } from "next/navigation";
import { LAND_TYPE_LABELS } from "@/lib/utils";
import type { LandType } from "@/lib/types/database";

const PROVINCES = [
  { slug: "rayong", name: "ระยอง" },
  { slug: "chonburi", name: "ชลบุรี" },
  { slug: "chachoengsao", name: "ฉะเชิงเทรา" },
  { slug: "samut-prakan", name: "สมุทรปราการ" },
  { slug: "ayutthaya", name: "อยุธยา" },
  { slug: "bangkok", name: "กรุงเทพฯ" },
];

interface Props {
  province?: string;
  type?: string;
}

export default function FilterBar({ province, type }: Props) {
  const router = useRouter();

  function update(key: string, value: string) {
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`/land?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-slate-100">
      <select
        value={province ?? ""}
        onChange={(e) => update("province", e.target.value)}
        className="input w-auto min-w-36"
        aria-label="จังหวัด"
      >
        <option value="">ทุกจังหวัด</option>
        {PROVINCES.map((p) => (
          <option key={p.slug} value={p.slug}>{p.name}</option>
        ))}
      </select>

      <select
        value={type ?? ""}
        onChange={(e) => update("type", e.target.value)}
        className="input w-auto min-w-44"
        aria-label="ประเภทที่ดิน"
      >
        <option value="">ทุกประเภท</option>
        {(Object.entries(LAND_TYPE_LABELS) as [LandType, string][]).map(([slug, label]) => (
          <option key={slug} value={slug}>{label}</option>
        ))}
      </select>

      {(province || type) && (
        <button
          onClick={() => router.push("/land")}
          className="text-sm text-slate-500 hover:text-brand-600 underline"
        >
          ล้างตัวกรอง
        </button>
      )}
    </div>
  );
}
