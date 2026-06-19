import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight, MapPin, Ruler,
  BadgeDollarSign, BarChart3, Smartphone, Wallet, Target, Users,
  Shield, Search, Calendar, Clock,
  Home, Wrench, Briefcase, Globe, BarChart2,
} from "lucide-react";
import StatStrip from "@/components/ui/StatStrip";
import ListingCard from "@/components/listings/ListingCard";
import FacebookIcon from "@/components/ui/FacebookIcon";
import LineIcon from "@/components/ui/LineIcon";
import JsonLd from "@/components/seo/JsonLd";
import { getFeaturedListings, getSiteStats, getActiveDemands } from "@/lib/supabase/queries";
import type { Land } from "@/lib/types/database";
import { propertyHref } from "@/lib/property-detail-data";
import { LAND_TYPE_LABELS } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "LandmarketThai – ที่ดินอุตสาหกรรม EEC ทั่วไทย | รับค่าแนะนำสูงสุดหลายล้าน",
  description:
    "เปลี่ยนคอนเนกชันเป็นรายได้ ไม่ต้องลงทุน ไม่ต้องสต็อก แนะนำที่ดินอุตสาหกรรม EEC ระยอง ชลบุรี รับค่าคอมสูงสุดหลายล้านบาท",
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
    desc: "ส่งลีดผ่าน LINE หรือแชร์รหัสแนะนำ ทีมเราดูแลทั้งหมด",
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
    title: "ที่ดินอุตสาหกรรม EEC ระยอง",
    size: "109 ไร่ 2 งาน 52 ตร.ว.",
    loc: "ใกล้ WHA / BYD",
    status: "ผังสีม่วง",
    price: "2.75 ล้านบาท/ไร่",
    reward: "4,000,000 บาท",
    highlights: ["หน้ากว้าง ~240 ม.", "ใกล้ WHA · BYD"],
    image: "/images/listings/109-rai-home-thumbnail.png",
    imageAlt: "ภาพโดรนที่ดินอุตสาหกรรม 109 ไร่ ระยอง",
    href: propertyHref("109-rai-eec-rayong"),
    comingSoon: false as const,
    soldOut: true as const,
  },
  {
    province: "ระยอง",
    title: "ที่ดินอุตสาหกรรม EEC ระยอง",
    size: "37 ไร่",
    loc: "ระยอง EEC",
    status: "ผังสีม่วง",
    price: "2.3 ล้านบาท/ไร่",
    reward: "1,200,000 บาท",
    highlights: ["หน้ากว้าง ~240 ม.", "ถนนเข้าถึง ปี 2569"],
    image: "/images/listings/37-rai-home-thumbnail.png",
    imageAlt: "ภาพโดรนที่ดินอุตสาหกรรม 37 ไร่ ระยอง",
    href: propertyHref("37-rai-eec-rayong"),
    comingSoon: false as const,
  },
  {
    province: "กบินทร์บุรี",
    title: "ที่ดินอุตสาหกรรม 101 ไร่ กบินทร์บุรี",
    size: "101 ไร่",
    loc: "",
    status: "",
    price: "",
    reward: "",
    highlights: [] as string[],
    image: "/images/listings/kabin-buri-101-rai-home-thumbnail.png",
    imageAlt: "ภาพโดรนที่ดินอุตสาหกรรม 101 ไร่ กบินทร์บุรี",
    href: "/become-partner",
    comingSoon: true as const,
  },
];

const homeListingImages = {
  rayong109: {
    src: "/images/listings/109-rai-home-thumbnail.png",
    alt: "ภาพโดรนที่ดินอุตสาหกรรม 109 ไร่ ระยอง",
  },
  rayong37: {
    src: "/images/listings/37-rai-home-thumbnail.png",
    alt: "ภาพโดรนที่ดินอุตสาหกรรม 37 ไร่ ระยอง",
  },
};

function getHomepageListingImage(land: Land) {
  if (land.size_rai >= 100 && land.size_rai <= 120) return homeListingImages.rayong109;
  if (land.size_rai >= 35 && land.size_rai <= 40) return homeListingImages.rayong37;
  return undefined;
}

function getHomepageListingHref(land: Land) {
  if (land.size_rai >= 100 && land.size_rai <= 120) return propertyHref("109-rai-eec-rayong");
  if (land.size_rai >= 35 && land.size_rai <= 40) return propertyHref("37-rai-eec-rayong");
  return undefined;
}

function isHomepageSoldOutListing(land: Land) {
  return land.slug === "109-rai-eec-rayong" || (land.size_rai >= 100 && land.size_rai <= 120);
}

const fallbackDemands = [
  { province: "ระยอง",         type: "อุตสาหกรรม",  size: "50–100 ไร่", note: "ใกล้นิคมอุตสาหกรรม สำหรับโรงงานผลิต",         ago: "2 ชม. ที่แล้ว" },
  { province: "ชลบุรี",        type: "โลจิสติกส์",  size: "20–50 ไร่",  note: "ใกล้ท่าเรือแหลมฉบัง สำหรับคลังสินค้า",         ago: "4 ชม. ที่แล้ว" },
  { province: "สมุทรปราการ",  type: "ศูนย์ข้อมูล", size: "30–80 ไร่",  note: "บางนา-เทพารักษ์ สำหรับศูนย์ข้อมูล",              ago: "1 วัน ที่แล้ว" },
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
          {/* ── Sales copy + offer — left overlay (md+) ── */}
          <div className="absolute left-5 top-5 hidden w-[360px] md:block lg:left-8 lg:top-7 lg:w-[520px] xl:left-16 xl:top-8 xl:w-[600px]">
            <div className="drop-shadow-[0_4px_12px_rgba(255,255,255,0.70)]">
              <p className="text-xl font-black leading-tight text-[#06235f] lg:text-[2rem] xl:text-[2.55rem]">
                เปลี่ยนความรู้ เป็นรายได้
              </p>
              <h1 className="mt-0 text-[3.25rem] font-black leading-[0.92] text-[#06377d] lg:text-[4.4rem] xl:text-[5.7rem]">
                อาชีพเสริม
              </h1>
              <div className="mt-1.5 inline-flex rounded-lg bg-[#00A859] px-5 py-2 text-lg font-black text-white shadow-[0_10px_24px_rgba(0,168,89,0.24)] lg:mt-2 lg:px-8 lg:py-2.5 lg:text-2xl xl:text-[2rem]">
                สร้างรายได้ไปกับที่ดิน
              </div>
            </div>

            {/* 4 ล้านบาท — ref badge */}
            <div className="commission-hero-badge relative mt-2.5 w-[300px] overflow-hidden rounded-[22px] lg:mt-3 lg:w-[390px] lg:rounded-[28px] xl:mt-4 xl:w-[440px]">
              <div
                className="absolute inset-0 rounded-[22px] lg:rounded-[28px]"
                style={{
                  background:
                    "linear-gradient(145deg, #ffd84d 0%, #ffc329 45%, #e6a800 100%)",
                }}
              />
              <div className="relative m-[2px] overflow-hidden rounded-[20px] bg-[#071f58] text-white lg:m-[3px] lg:rounded-[25px]">
                <div
                  className="absolute inset-0 opacity-95"
                  style={{
                    background:
                      "radial-gradient(circle at 18% 22%, rgba(255,211,84,0.35), transparent 34%), linear-gradient(145deg, #0f3478 0%, #071d4a 100%)",
                  }}
                />
                <div className="relative">
                  <div className="grid grid-cols-[82px_1fr] items-stretch lg:grid-cols-[108px_1fr] xl:grid-cols-[124px_1fr]">
                    <div className="flex items-center justify-center border-r border-white/10 bg-[#051a4a]/40 px-2">
                      <span className="commission-digit">4</span>
                    </div>
                    <div className="min-w-0 px-3 py-2.5 lg:px-5 lg:py-3.5 xl:px-6 xl:py-4">
                      <div className="text-2xl font-black leading-none text-gold-400 lg:text-[2rem] xl:text-[2.55rem]">
                        ล้านบาท*
                      </div>
                      <div className="mt-0.5 text-sm font-bold leading-tight text-white lg:mt-1 lg:text-[1.25rem] xl:text-[1.75rem]">
                        ค่าคอมสูงสุด
                      </div>
                      <div className="mt-1.5 flex items-center gap-2 lg:mt-2.5 lg:gap-2.5">
                        <span className="inline-flex rounded-md bg-gold-400 px-2.5 py-0.5 text-xs font-black text-[#001B48] lg:px-4 lg:py-1 lg:text-sm">
                          จบดีล
                        </span>
                        <span className="text-[10px] font-medium text-blue-100/75 lg:text-xs">ต่อดีล</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/10 bg-[#051536]/60 px-3 py-1.5 text-center text-[10px] font-semibold text-blue-100/90 lg:px-4 lg:py-2 lg:text-xs">
                    ตลาดที่ดินไทย.com
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── QR / LINE card — desktop only ── */}
          <div className="absolute right-5 top-5 hidden w-[176px] overflow-hidden rounded-xl bg-[#06235f] p-1.5 text-center text-brand-900 shadow-[0_20px_58px_rgba(4,16,44,0.30)] ring-1 ring-white/80 backdrop-blur-md lg:right-16 lg:top-8 lg:block lg:w-[216px] lg:p-2 xl:right-28 xl:top-10 xl:w-[248px] 2xl:right-32">
            <div className="px-3 pb-2 pt-1.5 text-white lg:px-4 lg:pb-3 lg:pt-2">
              <p className="text-sm font-black leading-tight lg:text-lg xl:text-xl">เริ่มวันนี้!</p>
              <p className="mt-0.5 text-xs font-black text-gold-400 lg:mt-1 lg:text-sm">สร้างรายได้ไม่จำกัด!</p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl bg-white px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] lg:gap-3.5 lg:px-4 lg:py-4 xl:px-5">
              <div>
                <p className="text-xs font-black text-brand-800 lg:text-sm">สแกนเพิ่มเพื่อนใน LINE</p>
                <p className="mt-0.5 hidden text-[11px] font-medium text-slate-500 lg:block">
                  รับข่าวสารและดีลพิเศษก่อนใคร
                </p>
              </div>
              <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-white p-1.5 shadow-[0_10px_26px_rgba(15,52,120,0.12)] ring-1 ring-slate-200 lg:h-32 lg:w-32 lg:p-2 xl:h-36 xl:w-36">
                <img
                  src="/images/line-qr.png"
                  alt="คิวอาร์โค้ด LINE OA"
                  className="h-full w-full rounded-lg object-contain"
                />
              </div>
              <div className="flex w-full flex-col gap-1.5 lg:gap-2">
                <Link
                  href={LINE_OA}
                  target="_blank"
                  rel="noopener"
                  className="btn-line w-full justify-center gap-1.5 py-2 text-xs font-bold tracking-tight active:scale-[0.98] lg:gap-2.5 lg:py-2.5 lg:text-sm"
                >
                  <LineIcon size={18} />
                  @landmarketthai
                </Link>
                <Link
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="เฟซบุ๊ก"
                  className="btn-facebook w-full justify-center py-2 lg:py-2.5"
                >
                  <FacebookIcon size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* ── Mobile conversion copy — headline first, no QR ── */}
          <div className="hero-mobile-scrim" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-5 pt-16 md:hidden">
            <div className="max-w-sm">
              <p className="text-xs font-bold tracking-wide text-gold-400">
                LandmarketThai · เครือข่ายที่ดินอุตสาหกรรม
              </p>
              <h1 className="mt-2 text-[2rem] font-black leading-[1.08] text-white drop-shadow-sm">
                แนะนำที่ดิน
                <br />
                รับค่าแนะนำเมื่อปิดดีล
              </h1>
              <p className="mt-2 max-w-[20rem] text-sm leading-relaxed text-blue-50">
                รวมดีลที่ดินอุตสาหกรรม EEC พร้อมทีมช่วยดูแลลูกค้าและปิดการขาย
              </p>
              <div className="mt-4 flex flex-col gap-2 min-[390px]:flex-row">
                <Link
                  href={LINE_OA}
                  target="_blank"
                  rel="noopener"
                  className="btn-line justify-center px-4 text-sm"
                >
                  <LineIcon size={17} />
                  เริ่มแนะนำที่ดิน
                </Link>
                <Link
                  href="#featured-listings"
                  className="btn-white justify-center px-4 text-sm"
                >
                  ดูที่ดินแนะนำ
                </Link>
              </div>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#071f58]/90 px-3 py-1.5 text-xs font-bold text-white ring-1 ring-white/15">
                <span className="text-gold-400">สูงสุด 4 ล้านบาท*</span>
                <span className="text-blue-100/80">ต่อดีล</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefit strip */}
        <div className="container-xl px-4 sm:px-6 lg:px-8">
          <div className="relative z-30 mt-4 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-[0_8px_32px_rgba(4,16,44,0.14)] sm:-mt-28 md:-mt-36 lg:-mt-16">
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
      <section id="featured-listings" className="bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="container-xl">
          <div className="mb-7 flex flex-col items-center gap-3 text-center sm:relative sm:block">
            <h2 className="text-2xl font-bold text-[#0a2a63] sm:text-[28px]">
              ที่ดินแนะนำ <b className="text-[#2f9e44]">อัปเดตทุกวัน</b>
            </h2>
            <Link
              href="/land"
              className="text-sm font-semibold text-blue-700 hover:underline sm:absolute sm:right-0 sm:bottom-1"
            >
              ดูทั้งหมด ›
            </Link>
          </div>

          {featuredListings.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {featuredListings.map((land) => (
                <ListingCard
                  key={land.id}
                  land={land}
                  imageOverride={getHomepageListingImage(land)}
                  hrefOverride={getHomepageListingHref(land)}
                  soldOut={isHomepageSoldOutListing(land)}
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {sampleListings.map((item) =>
                item.comingSoon ? (
                  <article key={`${item.title}-${item.province}`} className="card-ref flex flex-col">
                    <div className="relative h-44 overflow-hidden sm:h-48">
                      <span className="absolute left-3 top-3 z-10 rounded-md bg-[#00A859] px-3 py-1 text-xs font-bold text-white shadow-sm">
                        {item.province}
                      </span>
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-300">
                          <Ruler size={40} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-slate-950/20" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <span className="rounded-full bg-gold-400 px-5 py-1.5 text-xs font-black text-[#001B48]">
                          เร็วๆ นี้
                        </span>
                        <p className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                          กำลังเตรียมรายละเอียด
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-4 pb-5">
                      <h3 className="mb-2 text-base font-semibold leading-snug text-slate-800">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-4">
                        โปรเจกต์ใหม่ในกบินทร์บุรี กำลังเตรียมรายละเอียด
                        ลงทะเบียนรับข้อมูลก่อนใคร
                      </p>
                      <div className="mt-auto">
                        <Link href={item.href} className="btn-green w-full justify-center text-xs">
                          เรียนรู้เพิ่มเติม
                        </Link>
                      </div>
                    </div>
                  </article>
                ) : (
                  <article key={`${item.title}-${item.size}`} className="card-ref flex flex-col">
                    <div className="relative h-44 overflow-hidden sm:h-48">
                      <span className="absolute left-3 top-3 z-10 rounded-md bg-[#00A859] px-3 py-1 text-xs font-bold text-white shadow-sm">
                        {item.province}
                      </span>
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-300">
                          <Ruler size={40} />
                        </div>
                      )}
                      {"soldOut" in item && item.soldOut && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
                          <span className="rounded-md bg-red-600 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-lg">
                            Sold out
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 z-10 bg-[#001B48]/92 px-4 py-2.5">
                        <div className="text-[11px] font-medium text-white/85">ค่าแนะนำสูงสุด</div>
                        <div className="text-xl font-black leading-tight text-gold-400">{item.reward}</div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-4 pb-5">
                      <h3 className="mb-3 text-base font-semibold leading-snug text-slate-800">{item.title}</h3>
                      <div className="mb-3 flex flex-wrap gap-x-3 gap-y-2 border-y border-slate-100 py-3 text-xs text-slate-500">
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
                      {item.highlights.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1.5">
                          {item.highlights.map((h) => (
                            <span key={h} className="rounded bg-purple-50 px-2 py-0.5 text-[11px] font-medium text-purple-700">
                              {h}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-auto flex flex-col gap-3 min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-between">
                        <div className="min-w-0">
                          <div className="text-xs text-slate-400">ราคา/ไร่</div>
                          <div className="text-sm font-bold text-gold-500">{item.price}</div>
                        </div>
                        <Link href={item.href} className="btn-green w-full shrink-0 px-3 py-2 text-xs min-[360px]:w-auto">
                          ดูรายละเอียด
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── 4. HOW IT WORKS + WHO CAN EARN ───────────────────────────────── */}
      <section className="bg-[#eef2f9] px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-5">

            {/* Steps panel */}
            <div className="rounded-[18px] border border-slate-100 bg-white p-5 shadow-[0_2px_8px_rgba(13,30,70,0.06)] sm:p-7">
              <h3 className="mb-6 text-center text-xl font-bold text-[#0a2a63] sm:text-[22px]">
                3 ขั้นตอนง่ายๆ เริ่มต้นสร้างรายได้
              </h3>
              <div className="flex items-start justify-center gap-1">
                {howToEarnSteps.map((step, i) => (
                  <div key={step.num} className="flex items-start flex-1 min-w-0">
                    <div className="flex min-w-0 flex-1 flex-col items-center">
                      <div className="mb-2.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0f3478] text-lg font-bold text-white shadow-[0_8px_18px_rgba(15,52,120,0.32)] sm:h-11 sm:w-11 sm:text-[19px]">
                        {step.num}
                      </div>
                      <div className="text-center px-1">
                        <div className="whitespace-pre-line text-xs font-semibold leading-snug text-slate-800 sm:text-sm">
                          {step.title}
                        </div>
                      </div>
                    </div>
                    {i < howToEarnSteps.length - 1 && (
                      <div className="flex shrink-0 items-start px-0.5 pt-3 sm:px-1">
                        <ArrowRight size={18} className="mt-1.5 text-[#14409a] sm:size-5" />
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
            <div className="rounded-[18px] border border-slate-100 bg-white p-5 shadow-[0_2px_8px_rgba(13,30,70,0.06)] sm:p-7">
              <h3 className="mb-6 text-center text-xl font-bold text-[#0a2a63] sm:text-[22px]">
                ใครๆ ก็สามารถสร้างรายได้จากที่ดิน
              </h3>
              <div className="grid grid-cols-2 gap-4 min-[390px]:grid-cols-3">
                {earnerPersonas.map((p) => {
                  const Icon = p.Icon;
                  return (
                    <div key={p.label} className="flex flex-col items-center text-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#0f3478]">
                        <Icon size={18} strokeWidth={1.8} />
                      </div>
                      <div className="text-sm font-semibold leading-snug text-slate-700 sm:text-[13.5px]">{p.label}</div>
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
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="container-xl">
          <div className="mb-7 flex flex-col items-center gap-3 text-center sm:relative sm:block">
            <h2 className="text-2xl font-bold text-[#0a2a63] sm:text-[28px]">
              ความต้องการที่ดิน <b className="text-[#2f9e44]">(ผู้ซื้อกำลังหา)</b>
            </h2>
            <Link
              href="/buyer-demand"
              className="text-sm font-semibold text-blue-700 hover:underline sm:absolute sm:right-0 sm:bottom-1"
            >
              ดูทั้งหมด ›
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {demands.length > 0
              ? demands.slice(0, 4).map((d) => (
                  <Link
                    key={d.id}
                    href={`/buyer-demand/${d.slug}`}
                    className="min-h-32 rounded-[18px] p-4 pb-5 transition-shadow hover:shadow-md"
                    style={{ background: "#fdf3e5", border: "1px solid #f1ddbd" }}
                  >
                    <div className="flex min-w-0 items-center gap-1.5 text-[17px] font-bold text-[#0a2a63]">
                      <MapPin size={16} className="text-[#2f9e44]" />
                      <span className="truncate">{d.province?.name_th ?? "ทั่วไทย"}</span>
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
                    className="min-h-32 rounded-[18px] p-4 pb-5"
                    style={{ background: "#fdf3e5", border: "1px solid #f1ddbd" }}
                  >
                    <div className="flex min-w-0 items-center gap-1.5 text-[17px] font-bold text-[#0a2a63]">
                      <MapPin size={16} className="text-[#2f9e44]" />
                      <span className="truncate">{d.province}</span>
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

      {/* ── 6. BOTTOM CTA + TRUST STRIP ─────────────────────────────────── */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="container-xl">
          {/* CTA box — navy 3-col card */}
          <div
            className="relative grid grid-cols-1 items-center gap-7 overflow-hidden rounded-[26px] px-5 py-8 shadow-[0_14px_36px_rgba(13,30,70,0.10)] sm:px-8 sm:py-9 lg:grid-cols-[1fr_auto_auto] lg:px-10"
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
            <div className="relative z-10 text-center text-white lg:text-left">
              <h2 className="text-xl font-bold leading-snug lg:text-[26px]">
                รู้จักที่ดินดี อย่าปล่อยคอนเนกชันให้เสียเปล่า
                <br />
                มาร่วมสร้างรายได้ไปกับ{" "}
                <b className="text-yellow-300">ตลาดที่ดินไทย.com</b>
              </h2>
            </div>

            {/* Button + note */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <Link
                href={LINE_OA}
                target="_blank"
                rel="noopener"
                className="btn-green w-full px-6 py-4 text-base ring-2 ring-[#33c477]/50 sm:w-auto sm:px-8"
              >
                {LINE_ICON}
                เข้าร่วมฟรีทันที
              </Link>
              <small className="text-white/70 text-xs">ไม่มีค่าใช้จ่าย</small>
            </div>

            {/* QR card */}
            <div className="relative z-10 hidden items-center gap-3 sm:flex">
              <div className="flex h-[92px] w-[92px] shrink-0 items-center justify-center rounded-xl bg-white p-2">
                <img
                  src="/images/line-qr.png"
                  alt="คิวอาร์โค้ด LINE OA"
                  className="h-full w-full rounded-lg object-contain"
                />
              </div>
              <div>
                <small className="text-white font-semibold text-sm leading-snug block">
                  สแกนเพิ่มเพื่อน
                  <br />
                  ใน LINE OA
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
                <div key={t.label} className="flex items-center justify-center gap-2.5">
                  <div className="h-[38px] w-[38px] shrink-0 text-[#0f3478]">
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
