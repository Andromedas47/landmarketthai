import type { Metadata } from "next";
import { CheckCircle2, Shield, Eye, FileCheck } from "lucide-react";
import SubmitLandForm from "@/components/forms/SubmitLandForm";
import LineButton from "@/components/ui/LineButton";

export const metadata: Metadata = {
  title: "ส่งที่ดินของคุณ – ขายที่ดินอุตสาหกรรม EEC",
  description:
    "ส่งข้อมูลที่ดินอุตสาหกรรม EEC ฟรี ทีม LandmarketThai ช่วยหาผู้ซื้อในเครือข่าย รักษาความลับ PDPA Compliant",
  alternates: { canonical: "/submit-land" },
};

const reassurances = [
  { icon: <CheckCircle2 size={18} />, text: "ฟรี ไม่มีค่าใช้จ่ายใดๆ" },
  { icon: <Shield size={18} />, text: "รักษาความลับ ข้อมูลไม่เปิดเผยโดยไม่ได้รับอนุญาต" },
  { icon: <Eye size={18} />, text: "PDPA Compliant – จัดเก็บข้อมูลอย่างปลอดภัย" },
  { icon: <FileCheck size={18} />, text: "ทีมผู้เชี่ยวชาญตรวจสอบก่อนทุกครั้ง" },
];

export default function SubmitLandPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="container-xl max-w-2xl text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">ส่งข้อมูลที่ดินของคุณ</h1>
          <p className="text-slate-400">
            ขายที่ดินอุตสาหกรรม EEC ให้ถึงมือผู้ซื้อตัวจริง
            ผ่านเครือข่ายพาร์ทเนอร์กว่า 200+ ราย
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container-xl">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Reassurances sidebar */}
            <div className="lg:col-span-2">
              <h2 className="font-semibold text-slate-800 mb-5">ทำไมถึงส่งกับเรา?</h2>
              <ul className="space-y-4">
                {reassurances.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <span className="text-green-500 shrink-0 mt-0.5">{r.icon}</span>
                    <span className="text-sm leading-relaxed">{r.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-5 bg-brand-50 rounded-2xl border border-brand-100">
                <div className="font-semibold text-brand-800 mb-2">ขั้นตอนหลังส่งข้อมูล</div>
                <ol className="space-y-2 text-sm text-brand-700">
                  <li>1. ทีมรับข้อมูลและติดต่อกลับ 1 วันทำการ</li>
                  <li>2. นัดดูพื้นที่และตรวจสอบเอกสาร</li>
                  <li>3. ประเมินราคาและกลยุทธ์การขาย</li>
                  <li>4. นำเสนอต่อเครือข่ายผู้ซื้อ</li>
                </ol>
              </div>

              <div className="mt-6">
                <LineButton label="ส่งผ่าน LINE OA แทน" className="w-full justify-center" size="sm" />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card p-8">
                <SubmitLandForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
