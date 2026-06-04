import Link from "next/link";
import ListingCard from "./ListingCard";
import LineButton from "@/components/ui/LineButton";
import { getActiveListings } from "@/lib/supabase/queries";
import { slugToLandType } from "@/lib/utils";

const PAGE_SIZE = 12;

interface Props {
  provinceSlug?: string;
  landType?: string;
  page?: number;
}

export default async function ListingGrid({ provinceSlug, landType, page = 1 }: Props) {
  const offset = (page - 1) * PAGE_SIZE;
  const type = landType ? slugToLandType(landType) : undefined;

  const listings = await getActiveListings({
    province_slug: provinceSlug,
    land_type: type ?? undefined,
    limit: PAGE_SIZE,
    offset,
  }).catch(() => []);

  if (listings.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-50 rounded-2xl">
        <div className="text-4xl mb-4">🔍</div>
        <h2 className="text-lg font-semibold text-slate-700 mb-2">ยังไม่มีที่ดินในเงื่อนไขนี้</h2>
        <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
          ทีมเราอาจมีที่ดินที่ยังไม่ได้ลงประกาศ ติดต่อผ่าน LINE เพื่อรับข้อมูลก่อนใคร
          หรือลงทะเบียนเพื่อรับแจ้งเตือนเมื่อมีที่ดินใหม่
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <LineButton label="สอบถามที่ดินผ่าน LINE" />
          <Link href="/submit-land" className="btn-outline">
            ส่งที่ดินของคุณ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-sm text-slate-500 mb-4">{listings.length} แปลง</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((land) => (
          <ListingCard key={land.id} land={land} />
        ))}
      </div>

      {/* Pagination */}
      {(listings.length === PAGE_SIZE || page > 1) && (
        <div className="mt-10 flex justify-center gap-2">
          {page > 1 && (
            <Link
              href={`/land?page=${page - 1}`}
              className="btn-outline px-4 py-2 text-sm"
            >
              ← ก่อนหน้า
            </Link>
          )}
          {listings.length === PAGE_SIZE && (
            <Link
              href={`/land?page=${page + 1}`}
              className="btn-primary px-4 py-2 text-sm"
            >
              ถัดไป →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
