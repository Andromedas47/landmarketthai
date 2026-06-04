import { Users, MapPin, CheckCircle, Banknote } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SiteStats } from "@/lib/types/database";

interface Props {
  stats: SiteStats;
}

interface StatItem {
  Icon: LucideIcon;
  value: string;
  unit: string;
  label: string;
}

export default function StatStrip({ stats }: Props) {
  const items: StatItem[] = [
    {
      Icon: Users,
      value: stats.total_partners.toLocaleString(),
      unit: "+ คน",
      label: "สมาชิกในเครือข่าย เติบโตต่อเนื่อง",
    },
    {
      Icon: MapPin,
      value: stats.total_listings.toLocaleString(),
      unit: "+ แปลง",
      label: "ที่ดินในระบบ อัปเดตทุกวัน",
    },
    {
      Icon: CheckCircle,
      value: String(stats.total_deals),
      unit: "+ ดีล",
      label: "ดีลที่ปิดแล้ว อ้างอิงได้จริง",
    },
    {
      Icon: Banknote,
      value: String(stats.total_payout_mb),
      unit: "ล้านบาท",
      label: "มูลค่าค่าคอมรวม มอบให้ผู้แนะนำ",
    },
  ];

  return (
    <section className="bg-[#eef2f9] px-4 pb-5 pt-2 sm:px-6 lg:px-8">
      <div className="container-xl">
        <div
          className="overflow-hidden rounded-[20px] shadow-[0_14px_36px_rgba(13,30,70,0.18)]"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          <div className="grid grid-cols-2 gap-px sm:grid-cols-4">
            {items.map((item) => {
              const Icon = item.Icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-center gap-3 px-4 py-4 text-white sm:px-5 lg:py-5"
                  style={{
                    background: "linear-gradient(125deg, #0f3478, #071d4a)",
                  }}
                >
                  <Icon
                    size={36}
                    strokeWidth={1.5}
                    className="shrink-0 text-yellow-300"
                  />
                  <div>
                    <div className="font-black leading-none text-2xl sm:text-[28px]">
                      {item.value}{" "}
                      <span className="text-sm sm:text-[18px] font-semibold">
                        {item.unit}
                      </span>
                    </div>
                    <div className="mt-1 text-[10px] text-white/70 leading-snug sm:text-[11px]">
                      {item.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
