import Link from "next/link";
import Image from "next/image";
import { MapPin, Ruler, Tag, Award } from "lucide-react";
import type { Land } from "@/lib/types/database";
import {
  LAND_TYPE_LABELS,
  ZONING_LABELS,
  formatRai,
  formatMoney,
  listingHref,
} from "@/lib/utils";

interface Props {
  land: Land;
}

export default function ListingCard({ land }: Props) {
  const coverImage = land.images?.find((img) => img.is_cover) ?? land.images?.[0];
  const href = listingHref(land.public_ref, land.slug);

  return (
    <Link href={href} className="card group flex flex-col hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage.url_or_cdn_path}
            alt={coverImage.alt_th ?? land.title_th}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300">
            <Ruler size={40} />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="badge bg-white/90 text-slate-700">
            {LAND_TYPE_LABELS[land.land_type]}
          </span>
          {land.is_eec && (
            <span className="badge bg-brand-500 text-white">EEC</span>
          )}
        </div>

        {land.status === "reserved" && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-semibold text-sm bg-black/60 px-3 py-1 rounded-full">
              จองแล้ว
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2 mb-2">
          {land.title_th}
        </h3>

        <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
          <MapPin size={12} />
          <span>{land.province?.name_th ?? ""}</span>
          {land.district && <span>· {land.district}</span>}
        </div>

        {/* Key facts */}
        <div className="grid grid-cols-2 gap-y-1.5 text-xs text-slate-600 mb-3">
          <div className="flex items-center gap-1">
            <Ruler size={11} className="text-slate-400" />
            <span>{formatRai(land.size_rai)}</span>
          </div>
          {land.zoning && (
            <div className="flex items-center gap-1">
              <Tag size={11} className="text-slate-400" />
              <span>{ZONING_LABELS[land.zoning]}</span>
            </div>
          )}
          {land.frontage_m && (
            <div className="col-span-2 text-slate-500">
              หน้ากว้าง {land.frontage_m.toLocaleString()} ม.
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs text-slate-400">ราคา/ไร่</div>
              <div className="font-bold text-brand-600">
                {formatMoney(land.price_per_rai)} ฿
              </div>
            </div>
            {land.referral_reward_max && (
              <div className="text-right">
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <Award size={10} />
                  ค่าแนะนำสูงสุด
                </div>
                <div className="text-xs font-semibold text-green-600">
                  {formatMoney(land.referral_reward_max)} ฿
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
