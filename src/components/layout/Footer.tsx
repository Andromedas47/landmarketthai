import Link from "next/link";
import LineIcon from "@/components/ui/LineIcon";
import { LINE_OA } from "@/lib/constants/site";

const topProvinces = [
  { name: "ระยอง",         slug: "rayong" },
  { name: "ชลบุรี",        slug: "chonburi" },
  { name: "ฉะเชิงเทรา",  slug: "chachoengsao" },
  { name: "สมุทรปราการ",  slug: "samut-prakan" },
  { name: "อยุธยา",        slug: "ayutthaya" },
];

const topTypes = [
  { name: "ที่ดินอุตสาหกรรม", slug: "industrial" },
  { name: "EEC",               slug: "eec" },
  { name: "โรงงาน",            slug: "factory" },
  { name: "คลังสินค้า",        slug: "warehouse" },
  { name: "Data Center",        slug: "data-center" },
];

const policyLinks = [
  { label: "เกี่ยวกับเรา",             href: "/about" },
  { label: "ติดต่อเรา",               href: "/contact" },
  { label: "นโยบายความเป็นส่วนตัว",  href: "/privacy" },
  { label: "เงื่อนไขการใช้งาน",        href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="container-xl section">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 text-xl font-bold text-white">
              <img
                src="/images/site-logo.jpg"
                alt="ตลาดที่ดินไทย.com"
                className="h-12 w-12 rounded-full object-cover ring-1 ring-white/15"
              />
              <span>ตลาดที่ดินไทย<span className="text-gold-400">.com</span></span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              เครือข่ายที่ดินอุตสาหกรรม EEC ที่ใหญ่ที่สุดในไทย
              ตรวจสอบข้อมูลก่อนทุกครั้ง
            </p>
            <Link
              href={LINE_OA}
              target="_blank"
              rel="noopener"
              className="mt-4 btn-line text-sm inline-flex"
            >
              เพิ่มเป็นเพื่อน LINE OA
            </Link>
          </div>

          {/* Top provinces */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              จังหวัด
            </h3>
            <ul className="space-y-2 text-sm">
              {topProvinces.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/land/${p.slug}`}
                    className="hover:text-brand-400 transition-colors"
                  >
                    ที่ดิน{p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top types */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              ประเภทที่ดิน
            </h3>
            <ul className="space-y-2 text-sm">
              {topTypes.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/land?type=${t.slug}`}
                    className="hover:text-brand-400 transition-colors"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              เกี่ยวกับ
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/become-partner" className="hover:text-brand-400 transition-colors">สมัครพาร์ทเนอร์</Link></li>
              <li><Link href="/how-it-works"   className="hover:text-brand-400 transition-colors">วิธีรับค่าแนะนำ</Link></li>
              <li><Link href="/buyer-demand"    className="hover:text-brand-400 transition-colors">Buyer กำลังหา</Link></li>
              <li><Link href="/blog"            className="hover:text-brand-400 transition-colors">บทความ</Link></li>
              {policyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} LandmarketThai. สงวนสิทธิ์ทุกประการ</p>

          {/* Policy links (sm+) */}
          <div className="hidden sm:flex items-center gap-4 flex-wrap justify-center">
            {policyLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-slate-300 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href={process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://facebook.com/landmarketthai"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <a
              href={process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "https://youtube.com/@landmarketthai"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            <a
              href={process.env.NEXT_PUBLIC_TIKTOK_URL ?? "https://tiktok.com/@landmarketthai"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>

            <a
              href={LINE_OA}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LINE"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <LineIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
