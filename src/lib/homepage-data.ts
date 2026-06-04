import type { LucideIcon } from "lucide-react";
import {
  Banknote, Users, Smartphone, TrendingUp, UserCheck,
  Home, MapPin, Wrench, BarChart2, Briefcase, Globe,
  Shield, Search, Calendar, Clock,
} from "lucide-react";
import type { SiteStats } from "@/lib/types/database";

export const SEED_STATS: SiteStats = {
  total_partners: 4328,
  total_listings: 1290,
  total_deals: 84,
  total_payout_mb: 42.6,
};

export const benefits: { Icon: LucideIcon; label: string }[] = [
  { Icon: Banknote,   label: "ไม่ต้องลงทุน\nไม่ต้องสต็อก" },
  { Icon: Users,      label: "มีระบบ-ทีมงาน\nสนับสนุน" },
  { Icon: Smartphone, label: "ใช้งานง่าย\nผ่านออนไลน์" },
  { Icon: TrendingUp, label: "รายได้ไม่จำกัด\nยิ่งแนะ ยิ่งได้" },
  { Icon: UserCheck,  label: "เหมาะสำหรับ\nทุกคนที่อยากมีรายได้เพิ่ม" },
];

export const howToEarnSteps = [
  {
    num: "1",
    title: "สมัคร\nเข้าร่วมฟรี",
    desc: "กรอกข้อมูลออนไลน์ ไม่มีค่าใช้จ่าย",
  },
  {
    num: "2",
    title: "แนะนำที่ดิน\nจากแพลตฟอร์ม",
    desc: "ส่งลีดผ่าน LINE หรือแชร์ referral code ทีมเราดูแลทั้งหมด",
  },
  {
    num: "3",
    title: "จบดีล\nรับค่าแนะนำทันที",
    desc: "ปิดดีลเมื่อไหร่ รับเงินทันที สูงสุดหลายล้านบาท",
  },
];

export const earnerPersonas: { Icon: LucideIcon; label: string }[] = [
  { Icon: Home,       label: "คนรู้จักเจ้าของที่ดิน" },
  { Icon: MapPin,     label: "คนในพื้นที่" },
  { Icon: Wrench,     label: "ผู้รับเหมา / วิศวกร" },
  { Icon: BarChart2,  label: "นักขาย" },
  { Icon: Briefcase,  label: "พนักงานบริษัท" },
  { Icon: Globe,      label: "ฟรีแลนซ์ / แม่บ้าน" },
];

export const testimonials = [
  {
    name: "คุณสมชาย ว.",
    province: "ระยอง",
    payoutLabel: "2,400,000 บาท",
    text: "แนะนำที่ดินติดถนนใหญ่ 304 ได้รับค่าแนะนำ 2.4 ล้านบาท",
  },
  {
    name: "คุณวรรณา น.",
    province: "ชลบุรี",
    payoutLabel: "850,000 บาท",
    text: "ส่งข้อมูลที่ดินนิคมพัฒนา 60 ไร่ ผ่าน LINE ได้รับค่าแนะนำ 850,000 บาท",
  },
  {
    name: "คุณกณพ อ.",
    province: "สมุทรปราการ",
    payoutLabel: "4,000,000 บาท",
    text: "ได้ค่าคอมรวม 4 ล้านบาท แนะนำเพื่อนๆ แล้ว 3 คนครับ",
  },
  {
    name: "คุณกิตติพัทธ์ ร.",
    province: "ระยอง",
    payoutLabel: "1,200,000 บาท",
    text: "รายได้เสริมที่เห็นผลจริง เพราะมีทีมผู้เชี่ยวชาญช่วยปิดดีลตลอด",
  },
];

export const trustItems: { Icon: LucideIcon; label: string }[] = [
  { Icon: Shield,   label: "ปลอดภัย\nเชื่อถือได้" },
  { Icon: Search,   label: "ตรวจสอบข้อมูล\nก่อนเผยแพร่" },
  { Icon: Users,    label: "มีทีมงานมืออาชีพ\nช่วยปิดดีล" },
  { Icon: Calendar, label: "ข้อมูลอัปเดต\nทุกวัน" },
  { Icon: Clock,    label: "ปิดดีลไว\nตรวจสอบ 100%" },
];

export const sampleListings = [
  {
    province: "ระยอง",
    badgeColor: "bg-orange-500",
    title: "ที่ดินติดถนนใหญ่ 304",
    size: "15 ไร่",
    loc: "ติดถนนใหญ่",
    status: "ผังสีม่วง",
    price: "3.2 ล้านบาท/ไร่",
    reward: "2.4 ล้านบาท",
  },
  {
    province: "ชลบุรี",
    badgeColor: "bg-blue-600",
    title: "ที่ดินนิคมพัฒนา",
    size: "20 ไร่",
    loc: "ใกล้นิคม",
    status: "ผังสีม่วง",
    price: "2.75 ล้านบาท/ไร่",
    reward: "850,000 บาท",
  },
  {
    province: "สมุทรปราการ",
    badgeColor: "bg-purple-600",
    title: "ที่ดินใกล้โปรเจกต์ M6",
    size: "50 ไร่",
    loc: "ใกล้ทางด่วน/สุวรรณภูมิ",
    status: "ผังสีม่วง",
    price: "1.8 ล้านบาท/ไร่",
    reward: "4 ล้านบาท",
  },
];

export const fallbackDemands = [
  { province: "ระยอง",        type: "อุตสาหกรรม",  size: "50–100 ไร่", note: "ใกล้นิคมอุตสาหกรรม สำหรับโรงงานผลิต",    ago: "2 ชม. ที่แล้ว" },
  { province: "ชลบุรี",       type: "โลจิสติกส์",  size: "20–50 ไร่",  note: "ใกล้ท่าเรือแหลมฉบัง สำหรับคลังสินค้า",    ago: "4 ชม. ที่แล้ว" },
  { province: "สมุทรปราการ", type: "Data Center", size: "30–80 ไร่",  note: "บางนา-เทพารักษ์ สำหรับ Data Center",       ago: "1 วัน ที่แล้ว" },
  { province: "อยุธยา",       type: "อุตสาหกรรม",  size: "100+ ไร่",  note: "ใกล้นิคมบางปะอิน สำหรับโรงงาน",            ago: "1 วัน ที่แล้ว" },
];
