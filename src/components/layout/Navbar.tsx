"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import LineIcon from "@/components/ui/LineIcon";
import { LINE_OA } from "@/lib/constants/site";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "หน้าแรก",           href: "/" },
  { label: "ที่ดินทั้งหมด",     href: "/land" },
  { label: "ส่งที่ดิน",         href: "/submit-land" },
  { label: "วิธีรับค่าตอบแทน", href: "/how-it-works" },
  { label: "ข่าวสาร",           href: "/blog" },
  { label: "เกี่ยวกับเรา",     href: "/about" },
];

function UserMenu({ onClose }: { onClose?: () => void }) {
  const { user } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setMenuOpen(false);
    onClose?.();
    router.push("/");
    router.refresh();
  }

  if (!user) return null;

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const displayName = (user.user_metadata?.full_name as string | undefined)
    ?? user.email?.split("@")[0]
    ?? "ผู้ใช้";

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
        aria-label="เมนูผู้ใช้"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="h-7 w-7 rounded-full object-cover ring-1 ring-slate-200"
          />
        ) : (
          <div className="h-7 w-7 rounded-full bg-brand-100 flex items-center justify-center">
            <User size={14} className="text-brand-600" />
          </div>
        )}
        <span className="hidden sm:inline max-w-[120px] truncate">{displayName}</span>
      </button>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 w-48 rounded-xl border border-slate-100 bg-white py-1 shadow-lg">
            <Link
              href="/profile"
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
              onClick={() => { setMenuOpen(false); onClose?.(); }}
            >
              <User size={15} />
              โปรไฟล์ของฉัน
            </Link>
            <hr className="my-1 border-slate-100" />
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut size={15} />
              ออกจากระบบ
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  async function handleMobileLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 border-b border-slate-100 shadow-[0_1px_8px_rgba(4,16,44,0.07)] backdrop-blur-md">
      <div className="container-xl flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/images/site-logo.jpg"
            alt="ตลาดที่ดินไทย.com"
            className="h-11 w-11 rounded-full object-cover ring-1 ring-slate-200"
          />
          <span className="hidden sm:inline text-lg font-bold tracking-tight">
            <span className="text-brand-600">ตลาดที่ดินไทย</span><span className="text-slate-800">.com</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {!loading && (
            user ? (
              <UserMenu />
            ) : (
              <Link href="/login" className="btn-ghost">
                เข้าสู่ระบบ
              </Link>
            )
          )}
          <Link
            href={LINE_OA}
            target="_blank"
            rel="noopener"
            className="btn-line text-sm px-4 py-2"
          >
            <LineIcon size={16} />
            LINE Official
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          onClick={() => setOpen(!open)}
          aria-label="เมนู"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-slate-100 bg-white pb-4 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-sm font-medium text-slate-700 border-b border-slate-50"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-4">
            {!loading && (
              user ? (
                <button
                  onClick={handleMobileLogout}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-red-600 border border-red-200 rounded-xl hover:bg-red-50"
                >
                  <LogOut size={14} />
                  ออกจากระบบ
                </button>
              ) : (
                <Link
                  href="/login"
                  className="flex-1 py-2.5 text-sm font-medium text-center text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  เข้าสู่ระบบ
                </Link>
              )
            )}
            <Link
              href={LINE_OA}
              target="_blank"
              rel="noopener"
              className="flex-1 btn-line text-sm py-2.5"
              onClick={() => setOpen(false)}
            >
              LINE Official
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
