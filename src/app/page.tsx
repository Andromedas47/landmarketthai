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
import JsonLd from "@/components/seo/JsonLd";
import { getFeaturedListings, getSiteStats, getActiveDemands } from "@/lib/supabase/queries";
import { LAND_TYPE_LABELS } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "LandmarketThai – ที่ดินอุตสาหกรรม EEC ทั่วไทย | รับค่าแนะนำสูงสุดหลายล้าน",
  description:
    "เปลี่ยน Connection เป็นรายได้ ไม่ต้องลงทุน ไม่ต้องสต็อก แนะนำที่ดินอุตสาหกรรม EEC Rayong Chonburi รับค่าคอมสูงสุดหลายล้านบาท",
};

const LINE_OA = process.env.NEXT_PUBLIC_LINE_OA_URL ?? "https://lin.ee/landmarketthai";

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
        <div className="relative isolate overflow-hidden bg-sky-100 shadow-[0_22px_58px_rgba(4,16,44,0.18)] h-70 sm:h-100 md:h-125 lg:h-140 xl:h-150">
          <img
            src="/images/final-banner.png"
            alt="LandmarketThai referral income hero banner"
            className="block h-full w-full object-cover object-center"
            fetchPriority="high"
          />
          {/* ── Sales copy + offer — left overlay (lg+) ── */}
          <div className="absolute left-8 top-10 hidden w-[520px] lg:block xl:left-16 xl:top-12 xl:w-[600px]">
            <div className="drop-shadow-[0_4px_12px_rgba(255,255,255,0.70)]">
              <p className="text-[2rem] font-black leading-tight text-[#06235f] xl:text-[2.55rem]">
                เปลี่ยนความรู้ เป็นรายได้
              </p>
              <h1 className="mt-0 text-[4.4rem] font-black leading-[0.92] text-[#06377d] xl:text-[5.7rem]">
                อาชีพเสริม
              </h1>
              <div className="mt-3 inline-flex rounded-full bg-[#11934a] px-8 py-2.5 text-2xl font-black text-white shadow-[0_10px_24px_rgba(17,147,74,0.24)] xl:text-[2rem]">
                สร้างรายได้ไปกับที่ดิน
              </div>
            </div>

            <div className="relative mt-5 w-[370px] overflow-hidden rounded-[30px] border border-gold-400/55 bg-[#071f58]/94 text-white shadow-[0_22px_50px_rgba(4,16,44,0.42)] ring-1 ring-white/15 xl:mt-6 xl:w-[430px]">
              <div
                className="absolute inset-0 opacity-80"
                style={{
                  background:
                    "radial-gradient(circle at 12% 18%, rgba(255,210,75,0.22), transparent 30%), linear-gradient(135deg, rgba(25,72,154,0.88), rgba(5,20,62,0.96))",
                }}
              />
              <div className="absolute left-0 top-0 h-full w-1.5 bg-gold-400" />
              <div className="relative flex items-center gap-4 px-5 py-4 xl:gap-5 xl:px-6 xl:py-5">
                <div
                  className="shrink-0 bg-gradient-to-b from-[#ffe27a] via-[#ffc426] to-[#d79200] bg-clip-text text-[6.7rem] font-black leading-[0.82] tracking-tight text-transparent xl:text-[7.9rem]"
                  style={{ textShadow: "0 10px 20px rgba(0,0,0,0.18)" }}
                >
                  4
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[2rem] font-black leading-none text-gold-400 xl:text-[2.7rem]">
                    ล้านบาท*
                  </div>
                  <div className="mt-1 text-2xl font-black leading-tight text-white xl:text-[2.15rem]">
                    ค่าคอมสูงสุด
                  </div>
                  <div className="mt-3 inline-flex rounded-full bg-gold-400 px-6 py-2 text-lg font-black text-[#06235f] shadow-[0_12px_24px_rgba(255,199,38,0.28)]">
                    จบดีล
                  </div>
                </div>
              </div>
              <div className="relative border-t border-white/10 px-5 py-2.5 text-center text-sm font-bold text-blue-100 xl:px-6">
                ตลาดที่ดินไทย.com
              </div>
            </div>
          </div>

          {/* ── QR / LINE card — top-right (lg+) ── */}
          <div className="absolute right-16 top-8 hidden w-52 flex-col overflow-hidden rounded-[30px] bg-white/97 text-center text-brand-900 shadow-[0_20px_58px_rgba(4,16,44,0.30)] ring-1 ring-white/80 backdrop-blur-md lg:flex xl:right-28 xl:top-10 xl:w-60 2xl:right-32">
            {/* Header */}
            <div className="bg-[#06235f] px-4 py-4 text-white">
              <p className="text-lg font-black leading-tight xl:text-xl">เริ่มวันนี้!</p>
              <p className="mt-1 text-sm font-black text-gold-400">สร้างรายได้ไม่จำกัด!</p>
            </div>
            <div className="flex flex-col items-center gap-3.5 px-4 py-4 xl:px-5">
              <div>
                <p className="text-sm font-black text-brand-800">สแกนเพิ่มเพื่อนใน LINE</p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                  รับข่าวสารและดีลพิเศษก่อนใคร
                </p>
              </div>
              {/* QR code */}
              <div className="flex h-32 w-32 items-center justify-center rounded-[22px] bg-white p-2 shadow-[0_10px_26px_rgba(15,52,120,0.12)] ring-1 ring-slate-200 xl:h-36 xl:w-36">
                <img
                  src="/images/line-qr.png"
                  alt="LINE Official QR code"
                  className="h-full w-full rounded-xl object-contain"
                />
              </div>
              {/* LINE CTA */}
              <Link
                href={LINE_OA}
                target="_blank"
                rel="noopener"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#06C755] py-3 text-sm font-black text-white shadow-[0_12px_26px_rgba(6,199,85,0.30)] transition hover:bg-[#05b74d] active:scale-95"
              >
                {LINE_ICON}
                ID : @Landthaimarket
              </Link>
              {/* Social proof */}
              <div className="flex w-full items-center justify-center gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
                <div className="flex -space-x-1">
                  <span className="h-5 w-5 rounded-full border-2 border-white bg-slate-300" />
                  <span className="h-5 w-5 rounded-full border-2 border-white bg-gold-400" />
                  <span className="h-5 w-5 rounded-full border-2 border-white bg-emerald-400" />
                </div>
                <div className="text-left leading-tight">
                  <span className="font-black text-brand-900">{stats.total_partners.toLocaleString()} คน</span>
                  <br />
                  ไว้วางใจเรา
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile offer bar (< sm only) ── */}
        <div className="sm:hidden flex items-center gap-3 bg-[#06235f] px-5 py-3">
          <span className="shrink-0 rounded-full bg-gold-400 px-2.5 py-0.5 text-[10px] font-black text-[#06235f]">
            จบดีล
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black leading-none text-gold-400">4</span>
            <span className="text-sm font-bold text-white">ล้านบาท*</span>
          </div>
          <span className="ml-auto shrink-0 text-[11px] font-medium text-blue-200">ค่าคอมสูงสุด</span>
        </div>

        {/* Benefit strip */}
        <div className="container-xl px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 mt-0 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_32px_rgba(4,16,44,0.14)] sm:-mt-16 lg:-mt-20">
            <div className="grid grid-cols-1 sm:grid-cols-5 divide-y sm:divide-x sm:divide-y-0 divide-slate-100/80">
              {benefits.map((b) => {
                const Icon = b.Icon;
                return (
                  <div key={b.label} className="flex items-center gap-3 px-4 py-3 sm:flex-col sm:items-center sm:justify-center sm:gap-2 sm:px-3 sm:py-4 sm:text-center lg:flex-row lg:justify-start lg:text-left">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-100/60 bg-brand-50">
                      <Icon size={21} strokeWidth={2} className="text-brand-600" />
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
                <article
                  key={item.title}
                  className="bg-white rounded-[18px] overflow-hidden shadow-[0_2px_8px_rgba(13,30,70,0.06)] border border-slate-100 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(13,30,70,0.10)]"
                >
                  <div className="relative h-48">
                    <span className="absolute top-3 left-3 z-10 rounded-full bg-[#2f9e44] text-white text-[13px] font-semibold px-3.5 py-1 shadow">
                      {item.province}
                    </span>
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background:
                          "repeating-linear-gradient(45deg, #e3e9f2 0 11px, #edf1f7 11px 22px)",
                      }}
                    >
                      <span className="text-[10px] font-mono text-slate-500 bg-white/90 rounded px-2 py-1">
                        PLACEHOLDER_LISTING_IMAGE
                      </span>
                    </div>
                  </div>
                  <div className="p-4 pb-5">
                    <div className="text-xs text-slate-400 mb-1">ค่าคอมสูงสุด</div>
                    <div className="text-[28px] font-black text-[#2f9e44] leading-tight mb-2">
                      {item.reward}
                    </div>
                    <div className="text-[18px] font-semibold text-slate-800 mb-3">{item.title}</div>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500 py-3 border-t border-b border-slate-100 mb-3">
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
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-medium text-slate-500">{item.price}</div>
                      <Link
                        href="/land"
                        className="btn-line text-xs px-3 py-1.5 rounded-lg shrink-0"
                      >
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
                <Link href="/become-partner" className="btn-primary text-sm">
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
                <Link href="/become-partner" className="btn-line w-full justify-center text-sm">
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
              className="rounded-[18px] p-5 flex flex-col justify-center items-center text-center text-white sm:col-span-2 lg:col-span-1"
              style={{ background: "linear-gradient(150deg, #0f3478, #071d4a)" }}
            >
              <h3 className="font-bold text-[21px] mb-2">ส่งที่ดินของคุณ</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                ให้ตรงกับความต้องการ<br />เพื่อโอกาสปิดดีล
              </p>
              <Link href="/submit-land" className="btn-line text-sm justify-center">
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
                className="btn-line text-base px-8 py-4"
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
