"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LineIcon from "@/components/ui/LineIcon";
import { LINE_OA } from "@/lib/constants/site";

const navLinks = [
  { label: "หน้าแรก",           href: "/" },
  { label: "ที่ดินทั้งหมด",     href: "/land" },
  { label: "ส่งที่ดิน",         href: "/submit-land" },
  { label: "วิธีรับค่าตอบแทน", href: "/how-it-works" },
  { label: "ข่าวสาร",           href: "/blog" },
  { label: "เกี่ยวกับเรา",     href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

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

        {/* Desktop CTA buttons */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Link href="/login" className="btn-ghost">
            เข้าสู่ระบบ
          </Link>
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
            <Link
              href="/login"
              className="flex-1 py-2.5 text-sm font-medium text-center text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              เข้าสู่ระบบ
            </Link>
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
