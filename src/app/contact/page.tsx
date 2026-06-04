import type { Metadata } from "next";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import LineButton from "@/components/ui/LineButton";
import LeadForm from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "ติดต่อเรา – LandmarketThai",
  description: "ติดต่อทีม LandmarketThai สอบถามที่ดินอุตสาหกรรม EEC สมัครพาร์ทเนอร์ หรือส่งที่ดินของคุณ",
  alternates: { canonical: "/contact" },
};

const contactItems = [
  {
    icon: <MessageCircle size={20} />,
    label: "LINE OA (หลัก)",
    value: "@landmarketthai",
    href: process.env.NEXT_PUBLIC_LINE_OA_URL ?? "https://lin.ee/8p064f7",
  },
  {
    icon: <Phone size={20} />,
    label: "โทรศัพท์",
    value: "080-xxx-xxxx",
    href: "tel:080xxxxxxx",
  },
  {
    icon: <Mail size={20} />,
    label: "อีเมล",
    value: "contact@landmarketthai.com",
    href: "mailto:contact@landmarketthai.com",
  },
  {
    icon: <MapPin size={20} />,
    label: "พื้นที่ให้บริการ",
    value: "EEC · ระยอง · ชลบุรี · ฉะเชิงเทรา · สมุทรปราการ",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="container-xl max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">ติดต่อเรา</h1>
          <p className="text-slate-400">ทีมงานพร้อมตอบทุกคำถาม วันจันทร์–เสาร์ 9:00–18:00 น.</p>
        </div>
      </div>

      <div className="container-xl section">
        <div className="grid lg:grid-cols-2 gap-10 max-w-4xl">
          {/* Contact info */}
          <div>
            <h2 className="font-semibold text-slate-800 text-lg mb-6">ช่องทางติดต่อ</h2>
            <div className="flex flex-col gap-4">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-4 card">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="font-medium text-slate-800 hover:text-brand-600 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="font-medium text-slate-800">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <LineButton className="w-full justify-center" size="md" label="เพิ่ม LINE OA · ตอบเร็วที่สุด" />
            </div>
          </div>

          {/* Quick contact form */}
          <div className="card p-8">
            <h2 className="font-semibold text-slate-800 text-lg mb-1">ส่งข้อความหาเรา</h2>
            <p className="text-sm text-slate-500 mb-5">หรือต้องการสอบถามเรื่องที่ดิน พาร์ทเนอร์ หรืออื่นๆ</p>
            <LeadForm defaultType="buyer" />
          </div>
        </div>
      </div>
    </div>
  );
}
