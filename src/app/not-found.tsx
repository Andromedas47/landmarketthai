import Link from "next/link";
import LineButton from "@/components/ui/LineButton";

export default function NotFound() {
  return (
    <div className="section flex flex-col items-center justify-center text-center min-h-[60vh] gap-6">
      <div className="text-6xl font-bold text-slate-200">404</div>
      <div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">ไม่พบหน้าที่ต้องการ</h1>
        <p className="text-slate-500">หน้านี้อาจถูกย้ายหรือลบไปแล้ว</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="btn-primary">กลับหน้าแรก</Link>
        <Link href="/land" className="btn-outline">ดูที่ดินทั้งหมด</Link>
        <LineButton size="sm" label="สอบถาม LINE OA" />
      </div>
    </div>
  );
}
