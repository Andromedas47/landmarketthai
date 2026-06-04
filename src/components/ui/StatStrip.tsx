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
  iconClass: string;
}

export default function StatStrip({ stats }: Props) {
  const items: StatItem[] = [
    {
      Icon: Users,
      value: stats.total_partners.toLocaleString(),
      unit: "+ คน",
      label: "สมาชิกในเครือข่าย เติบโตต่อเนื่อง",
      iconClass: "text-sky-300",
    },
    {
      Icon: MapPin,
      value: stats.total_listings.toLocaleString(),
      unit: "+ แปลง",
      label: "ที่ดินในระบบ อัปเดตทุกวัน",
      iconClass: "text-emerald-300",
    },
    {
      Icon: CheckCircle,
      value: String(stats.total_deals),
      unit: "+ ดีล",
      label: "ดีลที่ปิดแล้ว อ้างอิงได้จริง",
      iconClass: "text-gold-400",
    },
    {
      Icon: Banknote,
      value: String(stats.total_payout_mb),
      unit: "ล้านบาท",
      label: "มูลค่าค่าคอมรวม มอบให้ผู้แนะนำ",
      iconClass: "text-amber-300",
    },
  ];

  return (
    <section className="relative z-10 bg-white pb-5 pt-3">
      <div className="container-xl px-4 sm:px-6 lg:px-8">
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
                  className="flex items-center justify-center gap-3 px-4 py-3.5 text-white sm:px-5 lg:py-4"
                  style={{
                    background: "linear-gradient(125deg, #0f3478, #071d4a)",
                  }}
                >
                  <Icon
                    size={32}
                    strokeWidth={1.5}
                    className={`shrink-0 ${item.iconClass}`}
                  />
                  <div>
                    <div className="font-black leading-none text-2xl sm:text-[26px]">
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
