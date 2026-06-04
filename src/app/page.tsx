import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight, MapPin, Ruler,
  BadgeDollarSign, BarChart3, Smartphone, Wallet, Target, Users,
  Shield, Search, Calendar, Clock, CheckCircle,
  Home, Wrench, Briefcase, Globe, BarChart2,
} from "lucide-react";
import StatStrip from "@/components/ui/StatStrip";
import ListingCard from "@/components/listings/ListingCard";
import FacebookIcon from "@/components/ui/FacebookIcon";
import LineIcon from "@/components/ui/LineIcon";
import JsonLd from "@/components/seo/JsonLd";
import { getFeaturedListings, getSiteStats, getActiveDemands } from "@/lib/supabase/queries";
import { LAND_TYPE_LABELS } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "LandmarketThai – ที่ดินอุตสาหกรรม EEC ทั่วไทย | รับค่าแนะนำสูงสุดหลายล้าน",
  description:
    "เปลี่ยน Connection เป็นรายได้ ไม่ต้องลงทุน ไม่ต้องสต็อก แนะนำที่ดินอุตสาหกรรม EEC Rayong Chonburi รับค่าคอมสูงสุดหลายล้านบาท",
};

const LINE_OA = process.env.NEXT_PUBLIC_LINE_OA_URL ?? "https://lin.ee/8p064f7";
const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://www.facebook.com/Landmarketthai";

const LINE_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
  </svg>
);

const benefits: { Icon: LucideIcon; label: string }[] = [
  { Icon: BadgeDollarSign, label: "ไม่ต้องลงทุน\nไม่ต้องสต็อก" },
  { Icon: BarChart3,       label: "มีระบบ-ทีมงาน\nสนับสนุน" },
  { Icon: Smartphone, label: "ใช้งานง่าย\nผ่านออนไลน์" },
  { Icon: Wallet,      label: "รายได้ไม่จำกัด\nยิ่งแนะ ยิ่งได้" },
  { Icon: Target,      label: "เหมาะกับทุกคน\nที่อยากมีรายได้เพิ่ม" },
];

const howToEarnSteps = [
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

const earnerPersonas: { Icon: LucideIcon; label: string }[] = [
  { Icon: Home,       label: "คนรู้จักเจ้าของที่ดิน" },
  { Icon: MapPin,     label: "คนในพื้นที่" },
  { Icon: Wrench,     label: "ผู้รับเหมา / วิศวกร" },
  { Icon: BarChart2,  label: "นักขาย" },
  { Icon: Briefcase,  label: "พนักงานบริษัท" },
  { Icon: Globe,      label: "ฟรีแลนซ์ / แม่บ้าน" },
];

const testimonials = [
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

const trustItems: { Icon: LucideIcon; label: string }[] = [
  { Icon: Shield,       label: "ปลอดภัย\nเชื่อถือได้" },
  { Icon: Search,       label: "ตรวจสอบข้อมูล\nก่อนเผยแพร่" },
  { Icon: Users,        label: "มีทีมงานมืออาชีพ\nช่วยปิดดีล" },
  { Icon: Calendar,     label: "ข้อมูลอัปเดต\nทุกวัน" },
  { Icon: Clock,        label: "ปิดดีลไว\nตรวจสอบ 100%" },
];

const SEED_STATS = { total_partners: 4328, total_listings: 1290, total_deals: 84, total_payout_mb: 42.6 };

const sampleListings = [
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

const fallbackDemands = [
  { province: "ระยอง",         type: "อุตสาหกรรม",  size: "50–100 ไร่", note: "ใกล้นิคมอุตสาหกรรม สำหรับโรงงานผลิต",         ago: "2 ชม. ที่แล้ว" },
  { province: "ชลบุรี",        type: "โลจิสติกส์",  size: "20–50 ไร่",  note: "ใกล้ท่าเรือแหลมฉบัง สำหรับคลังสินค้า",         ago: "4 ชม. ที่แล้ว" },
  { province: "สมุทรปราการ",  type: "Data Center", size: "30–80 ไร่",  note: "บางนา-เทพารักษ์ สำหรับ Data Center",              ago: "1 วัน ที่แล้ว" },
  { province: "อยุธยา",        type: "อุตสาหกรรม",  size: "100+ ไร่",   note: "ใกล้นิคมบางปะอิน สำหรับโรงงาน",                 ago: "1 วัน ที่แล้ว" },
];

export default async function HomePage() {
  const [featuredListings, rawStats, demands] = await Promise.all([
    getFeaturedListings(6).catch(() => []),
    getSiteStats().catch(() => SEED_STATS),
    getActiveDemands(4).catch(() => []),
  ]);

  const stats = {
    total_partners:  Math.max(rawStats.total_partners,  SEED_STATS.total_partners),
    total_listings:  Math.max(rawStats.total_listings,  SEED_STATS.total_listings),
    total_deals:     Math.max(rawStats.total_deals,     SEED_STATS.total_deals),
    total_payout_mb: Math.max(rawStats.total_payout_mb, SEED_STATS.total_payout_mb),
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LandmarketThai",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://landmarketthai.com",
    description: "เครือข่ายที่ดินอุตสาหกรรมและ EEC ที่ใหญ่ที่สุดในไทย",
    contactPoint: { "@type": "ContactPoint", contactType: "customer support", availableLanguage: "Thai" },
  };

  return (
    <>
      <JsonLd data={[orgSchema]} />

      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section className="bg-white pt-0 pb-0">
        {/* Banner — full viewport width, capped height */}
        <div className="hero-banner">
          <img
            src="/images/final-banner.png"
            alt="LandmarketThai referral income hero banner"
            className="block h-full w-full object-cover object-[center_43%]"
            fetchPriority="high"
          />
          {/* ── Sales copy + offer — left overlay (lg+) ── */}
          <div className="absolute left-8 top-7 hidden w-[520px] lg:block xl:left-16 xl:top-8 xl:w-[600px]">
            <div className="drop-shadow-[0_4px_12px_rgba(255,255,255,0.70)]">
              <p className="text-[2rem] font-black leading-tight text-[#06235f] xl:text-[2.55rem]">
                เปลี่ยนความรู้ เป็นรายได้
              </p>
              <h1 className="mt-0 text-[4.4rem] font-black leading-[0.92] text-[#06377d] xl:text-[5.7rem]">
                อาชีพเสริม
              </h1>
              <div className="mt-2 inline-flex rounded-lg bg-[#00A859] px-8 py-2.5 text-2xl font-black text-white shadow-[0_10px_24px_rgba(0,168,89,0.24)] xl:text-[2rem]">
                สร้างรายได้ไปกับที่ดิน
              </div>
            </div>

            {/* 4 ล้านบาท — ref badge */}
            <div className="commission-hero-badge relative mt-3 w-[390px] overflow-hidden rounded-[28px] xl:mt-4 xl:w-[440px]">
              <div
                className="absolute inset-0 rounded-[28px]"
                style={{
                  background:
                    "linear-gradient(145deg, #ffd84d 0%, #ffc329 45%, #e6a800 100%)",
                }}
              />
              <div className="relative m-[3px] overflow-hidden rounded-[25px] bg-[#071f58] text-white">
                <div
                  className="absolute inset-0 opacity-95"
                  style={{
                    background:
                      "radial-gradient(circle at 18% 22%, rgba(255,211,84,0.35), transparent 34%), linear-gradient(145deg, #0f3478 0%, #071d4a 100%)",
                  }}
                />
                <div className="relative">
                  <div className="grid grid-cols-[108px_1fr] items-stretch xl:grid-cols-[124px_1fr]">
                    <div className="flex items-center justify-center border-r border-white/10 bg-[#051a4a]/40 px-2">
                      <span className="commission-digit">4</span>
                    </div>
                    <div className="min-w-0 px-5 py-3.5 xl:px-6 xl:py-4">
                      <div className="text-[2rem] font-black leading-none text-gold-400 xl:text-[2.55rem]">
                        ล้านบาท*
                      </div>
                      <div className="mt-1 text-[1.25rem] font-bold leading-tight text-white xl:text-[1.75rem]">
                        ค่าคอมสูงสุด
                      </div>
                      <div className="mt-2.5 flex items-center gap-2.5">
                        <span className="inline-flex rounded-md bg-gold-400 px-4 py-1 text-sm font-black text-[#001B48]">
                          จบดีล
                        </span>
                        <span className="text-xs font-medium text-blue-100/75">ต่อดีล</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/10 bg-[#051536]/60 px-4 py-2 text-center text-xs font-semibold text-blue-100/90">
                    ตลาดที่ดินไทย.com
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── QR / LINE card — top-right (lg+) ── */}
          <div className="absolute right-16 top-8 hidden w-[216px] overflow-hidden rounded-xl bg-[#06235f] p-2 text-center text-brand-900 shadow-[0_20px_58px_rgba(4,16,44,0.30)] ring-1 ring-white/80 backdrop-blur-md lg:block xl:right-28 xl:top-10 xl:w-[248px] 2xl:right-32">
            <div className="px-4 pb-3 pt-2 text-white">
              <p className="text-lg font-black leading-tight xl:text-xl">เริ่มวันนี้!</p>
              <p className="mt-1 text-sm font-black text-gold-400">สร้างรายได้ไม่จำกัด!</p>
            </div>
            <div className="flex flex-col items-center gap-3.5 rounded-xl bg-white px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] xl:px-5">
              <div>
                <p className="text-sm font-black text-brand-800">สแกนเพิ่มเพื่อนใน LINE</p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                  รับข่าวสารและดีลพิเศษก่อนใคร
                </p>
              </div>
              <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-white p-2 shadow-[0_10px_26px_rgba(15,52,120,0.12)] ring-1 ring-slate-200 xl:h-36 xl:w-36">
                <img
                  src="/images/line-qr.png"
                  alt="LINE Official QR code"
                  className="h-full w-full rounded-lg object-contain"
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <Link
                  href={LINE_OA}
                  target="_blank"
                  rel="noopener"
                  className="btn-line w-full justify-center gap-2.5 py-2.5 text-sm font-bold tracking-tight active:scale-[0.98]"
                >
                  <LineIcon size={22} />
                  @landmarketthai
                </Link>
                <Link
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="btn-facebook w-full justify-center py-2.5"
                >
                  <FacebookIcon size={22} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile offer bar (< sm only) ── */}
        <div className="commission-hero-badge flex items-center gap-3 bg-[#071f58] px-5 py-3 sm:hidden">
          <span className="shrink-0 rounded-md bg-gold-400 px-2.5 py-0.5 text-[10px] font-black text-[#001B48]">
            จบดีล
          </span>
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-2xl font-black leading-none text-gold-400"
              style={{ filter: "drop-shadow(0 2px 4px rgba(255,180,0,0.3))" }}
            >
              4
            </span>
            <span className="text-sm font-bold text-white">ล้านบาท*</span>
          </div>
          <span className="ml-auto shrink-0 text-[11px] font-medium text-blue-200">ค่าคอมสูงสุด</span>
        </div>

        {/* Benefit strip */}
        <div className="container-xl px-4 sm:px-6 lg:px-8">
          <div className="relative z-20 mt-0 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-[0_8px_32px_rgba(4,16,44,0.14)] sm:-mt-14 lg:-mt-16">
            <div className="grid grid-cols-1 divide-y divide-slate-100/80 sm:grid-cols-5 sm:divide-x sm:divide-y-0">
              {benefits.map((b, index) => {
                const Icon = b.Icon;
                const iconStyle = [
                  "border-emerald-100 bg-emerald-50 text-emerald-600",
                  "border-sky-100 bg-sky-50 text-sky-600",
                  "border-blue-100 bg-blue-50 text-blue-600",
                  "border-amber-100 bg-amber-50 text-amber-600",
                  "border-rose-100 bg-rose-50 text-rose-600",
                ][index % 5];
                return (
                  <div key={b.label} className="flex items-center gap-3 px-4 py-3 sm:flex-col sm:items-center sm:justify-center sm:gap-2 sm:px-3 sm:py-4 sm:text-center lg:flex-row lg:justify-start lg:text-left">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${iconStyle}`}>
                      <Icon size={21} strokeWidth={2.15} />
                    </div>
                    <span className="text-xs font-semibold leading-snug text-brand-900 whitespace-pre-line">{b.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS BAR ─────────────────────────────────────────────────── */}
      <StatStrip stats={stats} />

      {/* ── 3. FEATURED LISTINGS ─────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container-xl">
          <div className="relative flex justify-center mb-7">
            <h2 className="text-[28px] font-bold text-[#0a2a63] text-center">
              ที่ดินแนะนำ <b className="text-[#2f9e44]">อัปเดตทุกวัน</b>
            </h2>
            <Link
              href="/land"
              className="absolute right-0 bottom-1 text-sm font-semibold text-blue-700 hover:underline"
            >
              ดูทั้งหมด ›
            </Link>
          </div>

          {featuredListings.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((land) => (
                <ListingCard key={land.id} land={land} />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleListings.map((item) => (
                <article key={item.title} className="card-ref flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <span className="absolute left-3 top-3 z-10 rounded-md bg-[#00A859] px-3 py-1 text-xs font-bold text-white shadow-sm">
                      {item.province}
                    </span>
                    <div
                      className="flex h-full w-full items-center justify-center"
                      style={{
                        background:
                          "repeating-linear-gradient(45deg, #e3e9f2 0 11px, #edf1f7 11px 22px)",
                      }}
                    >
                      <span className="rounded bg-white/90 px-2 py-1 font-mono text-[10px] text-slate-500">
                        PLACEHOLDER_LISTING_IMAGE
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 z-10 bg-[#001B48]/92 px-4 py-2.5">
                      <div className="text-[11px] font-medium text-white/85">ค่าคอมสูงสุด</div>
                      <div className="text-xl font-black leading-tight text-gold-400">{item.reward}</div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4 pb-5">
                    <h3 className="mb-3 text-base font-semibold leading-snug text-slate-800">{item.title}</h3>
                    <div className="mb-3 flex flex-wrap gap-3 border-y border-slate-100 py-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Ruler size={13} />
                        {item.size}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={13} />
                        {item.loc}
                      </span>
                      <span>{item.status}</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <div>
                        <div className="text-xs text-slate-400">ราคา/ไร่</div>
                        <div className="text-sm font-bold text-gold-500">{item.price}</div>
                      </div>
                      <Link href="/land" className="btn-green shrink-0 px-3 py-2 text-xs">
                        ส่งต่อให้ลูกค้า
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 4. HOW IT WORKS + WHO CAN EARN ───────────────────────────────── */}
      <section className="bg-[#eef2f9] py-14 px-4 sm:px-6 lg:px-8">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-5">

            {/* Steps panel */}
            <div className="bg-white rounded-[18px] border border-slate-100 shadow-[0_2px_8px_rgba(13,30,70,0.06)] p-7">
              <h3 className="font-bold text-[22px] text-[#0a2a63] text-center mb-6">
                3 ขั้นตอนง่ายๆ เริ่มต้นสร้างรายได้
              </h3>
              <div className="flex items-start justify-center">
                {howToEarnSteps.map((step, i) => (
                  <div key={step.num} className="flex items-start flex-1 min-w-0">
                    <div className="flex flex-col items-center flex-1 min-w-0">
                      <div className="w-11 h-11 rounded-full bg-[#0f3478] text-white flex items-center justify-center text-[19px] font-bold shrink-0 shadow-[0_8px_18px_rgba(15,52,120,0.32)] mb-2.5">
                        {step.num}
                      </div>
                      <div className="text-center px-1">
                        <div className="font-semibold text-slate-800 text-sm leading-snug whitespace-pre-line">
                          {step.title}
                        </div>
                      </div>
                    </div>
                    {i < howToEarnSteps.length - 1 && (
                      <div className="flex items-start pt-3 shrink-0 px-1">
                        <ArrowRight size={20} className="text-[#14409a] mt-1.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-7 flex gap-3 flex-wrap justify-center">
                <Link href="/become-partner" className="btn-green text-sm">
                  สมัครฟรีทันที
                </Link>
                <Link href="/how-it-works" className="btn-outline text-sm">
                  ดูรายละเอียด
                </Link>
              </div>
            </div>

            {/* Who can earn panel */}
            <div className="bg-white rounded-[18px] border border-slate-100 shadow-[0_2px_8px_rgba(13,30,70,0.06)] p-7">
              <h3 className="font-bold text-[22px] text-[#0a2a63] text-center mb-6">
                ใครๆ ก็สามารถสร้างรายได้จากที่ดิน
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {earnerPersonas.map((p) => {
                  const Icon = p.Icon;
                  return (
                    <div key={p.label} className="flex flex-col items-center text-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#0f3478]">
                        <Icon size={18} strokeWidth={1.8} />
                      </div>
                      <div className="text-[13.5px] font-semibold text-slate-700 leading-snug">{p.label}</div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6">
                <Link href="/become-partner" className="btn-green w-full justify-center text-sm">
                  เข้าร่วมฟรีทันที — ไม่มีค่าใช้จ่าย
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. BUYER DEMAND ──────────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container-xl">
          <div className="relative flex justify-center mb-7">
            <h2 className="text-[28px] font-bold text-[#0a2a63] text-center">
              ความต้องการที่ดิน <b className="text-[#2f9e44]">(Buyer กำลังหา)</b>
            </h2>
            <Link
              href="/buyer-demand"
              className="absolute right-0 bottom-1 text-sm font-semibold text-blue-700 hover:underline"
            >
              ดูทั้งหมด ›
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {demands.length > 0
              ? demands.slice(0, 4).map((d) => (
                  <Link
                    key={d.id}
                    href={`/buyer-demand/${d.slug}`}
                    className="rounded-[18px] p-4 pb-5 transition-shadow hover:shadow-md"
                    style={{ background: "#fdf3e5", border: "1px solid #f1ddbd" }}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[17px] text-[#0a2a63]">
                      <MapPin size={16} className="text-[#2f9e44]" />
                      {d.province?.name_th ?? "ทั่วไทย"}
                    </div>
                    <div className="text-sm font-semibold text-slate-800 mt-2 mb-1.5">
                      ต้องการที่ดิน{" "}
                      {d.size_min_rai && d.size_max_rai
                        ? `${d.size_min_rai}–${d.size_max_rai} ไร่`
                        : d.size_min_rai
                        ? `${d.size_min_rai}+ ไร่`
                        : "ทุกขนาด"}
                    </div>
                    {d.budget_note && (
                      <div className="text-xs text-slate-500 leading-relaxed">{d.budget_note}</div>
                    )}
                    {d.land_type && (
                      <div className="mt-3 text-xs text-[#2a8a3c] font-semibold">
                        {LAND_TYPE_LABELS[d.land_type]}
                      </div>
                    )}
                  </Link>
                ))
              : fallbackDemands.map((d) => (
                  <div
                    key={d.province}
                    className="rounded-[18px] p-4 pb-5"
                    style={{ background: "#fdf3e5", border: "1px solid #f1ddbd" }}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[17px] text-[#0a2a63]">
                      <MapPin size={16} className="text-[#2f9e44]" />
                      {d.province}
                    </div>
                    <div className="text-sm font-semibold text-slate-800 mt-2 mb-1.5">
                      ต้องการที่ดิน {d.size}
                    </div>
                    <div className="text-xs text-slate-500 leading-relaxed">{d.note}</div>
                    <div className="mt-3 text-xs text-[#2a8a3c] font-semibold">
                      อัปเดต {d.ago}
                    </div>
                  </div>
                ))}

            {/* CTA card */}
            <div
              className="flex flex-col items-center justify-center rounded-xl p-5 text-center text-white sm:col-span-2 lg:col-span-1"
              style={{ background: "linear-gradient(150deg, #0f3478, #071d4a)" }}
            >
              <h3 className="mb-2 text-[21px] font-bold">ส่งที่ดินของคุณ</h3>
              <p className="mb-4 text-sm leading-relaxed text-white/80">
                ให้ตรงกับความต้องการ<br />เพื่อโอกาสปิดดีล
              </p>
              <Link href="/submit-land" className="btn-white text-sm">
                ส่งข้อมูลที่ดินเลย
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="bg-[#eef2f9] py-14 px-4 sm:px-6 lg:px-8">
        <div className="container-xl">
          <div className="relative flex justify-center mb-7">
            <h2 className="text-[28px] font-bold text-[#0a2a63] text-center">
              เสียงจากผู้แนะนำที่ดินของเรา{" "}
              <b className="text-[#2f9e44]">(ได้รับค่าตอบแทนจริง)</b>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-[18px] overflow-hidden border border-slate-100 shadow-[0_2px_8px_rgba(13,30,70,0.06)]"
              >
                <div
                  className="h-58 relative flex items-center justify-center"
                  style={{
                    background:
                      "repeating-linear-gradient(45deg, #e3e9f2 0 11px, #edf1f7 11px 22px)",
                  }}
                >
                  <span className="text-[10px] font-mono text-slate-500 bg-white/90 rounded px-2 py-1">
                    PLACEHOLDER_TESTIMONIAL_PHOTO
                  </span>
                </div>
                <div className="p-4 pb-5">
                  <p className="text-sm text-slate-700 leading-relaxed min-h-15.5">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 text-sm text-[#2a8a3c] font-semibold">
                    <CheckCircle size={16} strokeWidth={2.2} />
                    ได้รับค่าตอบแทนแล้ว
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. BOTTOM CTA + TRUST STRIP ─────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container-xl">
          {/* CTA box — navy 3-col card */}
          <div
            className="relative overflow-hidden rounded-[26px] px-8 py-9 lg:px-10 grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-7 items-center shadow-[0_14px_36px_rgba(13,30,70,0.10)]"
            style={{ background: "linear-gradient(120deg, #0f3478, #071d4a)" }}
          >
            {/* green glow decoration */}
            <div
              className="absolute -right-14 -top-14 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(47,158,68,0.22), transparent 70%)",
              }}
            />

            {/* Text */}
            <div className="text-white text-center lg:text-left relative z-10">
              <h2 className="text-xl lg:text-[26px] font-bold leading-snug">
                รู้จักที่ดินดี อย่าปล่อย Connection ให้เสียเปล่า
                <br />
                มาร่วมสร้างรายได้ไปกับ{" "}
                <b className="text-yellow-300">ตลาดที่ดินไทย.com</b>
              </h2>
            </div>

            {/* Button + note */}
            <div className="flex flex-col items-center gap-2 relative z-10">
              <Link
                href={LINE_OA}
                target="_blank"
                rel="noopener"
                className="btn-green px-8 py-4 text-base ring-2 ring-[#33c477]/50"
              >
                {LINE_ICON}
                เข้าร่วมฟรีทันที
              </Link>
              <small className="text-white/70 text-xs">ไม่มีค่าใช้จ่าย</small>
            </div>

            {/* QR card */}
            <div className="hidden sm:flex items-center gap-3 relative z-10">
              <div className="w-[92px] h-[92px] rounded-xl bg-white p-2 flex items-center justify-center shrink-0">
                <img
                  src="/images/line-qr.png"
                  alt="LINE Official QR code"
                  className="h-full w-full rounded-lg object-contain"
                />
              </div>
              <div>
                <small className="text-white font-semibold text-sm leading-snug block">
                  สแกนเพิ่มเพื่อน
                  <br />
                  ใน LINE Official
                </small>
                <div className="w-8 h-8 rounded-lg bg-[#06c755] flex items-center justify-center text-white mt-1.5">
                  {LINE_ICON}
                </div>
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-8 pb-1">
            {trustItems.map((t) => {
              const Icon = t.Icon;
              return (
                <div key={t.label} className="flex items-center gap-2.5 justify-center">
                  <div className="w-[38px] h-[38px] shrink-0 text-[#0f3478]">
                    <Icon size={38} strokeWidth={1.8} />
                  </div>
                  <div className="text-sm font-semibold text-slate-800 leading-tight whitespace-pre-line">
                    {t.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
