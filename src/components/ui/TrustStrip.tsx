import { Shield, MapPin, Users, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const items: { Icon: LucideIcon; label: string; iconClass: string }[] = [
  {
    Icon: Shield,
    label: "ข้อมูลที่ดินพร้อมตรวจสอบ",
    iconClass: "text-emerald-300",
  },
  {
    Icon: MapPin,
    label: "มีพิกัด ผังเมือง และเอกสารประกอบ",
    iconClass: "text-sky-300",
  },
  {
    Icon: Users,
    label: "ทีมงานช่วยประสานงานและเจรจา",
    iconClass: "text-gold-400",
  },
  {
    Icon: Smartphone,
    label: "ติดต่อผ่าน LINE ได้ทันที",
    iconClass: "text-amber-300",
  },
];

export default function TrustStrip() {
  return (
    <section className="relative z-20 bg-white pb-5 pt-3 sm:pt-4 lg:pt-3">
      <div className="container-xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[20px] shadow-[0_14px_36px_rgba(13,30,70,0.18)]">
          <div className="grid grid-cols-2 gap-px sm:grid-cols-4">
            {items.map((item) => {
              const Icon = item.Icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 px-3 py-3.5 text-white sm:gap-3 sm:px-4 lg:px-5 lg:py-4"
                  style={{
                    background: "linear-gradient(125deg, #0f3478, #071d4a)",
                  }}
                >
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                    className={`shrink-0 sm:size-8 ${item.iconClass}`}
                  />
                  <div className="text-xs font-semibold leading-snug sm:text-[13px]">
                    {item.label}
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
