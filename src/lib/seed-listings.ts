import type { Land, LandType, Province } from "@/lib/types/database";
import { propertyHref } from "@/lib/property-detail-data";

export const SEED_37_RAI_SLUG = "37-rai-eec-rayong";
export const SEED_109_RAI_SLUG = "109-rai-eec-rayong";

const SEED_TIMESTAMP = "2026-01-01T00:00:00.000Z";

export const SEED_RAYONG_PROVINCE: Province = {
  id: "seed-province-rayong",
  name_th: "ระยอง",
  name_en: "Rayong",
  slug: "rayong",
  region: "EEC",
  lat: null,
  lng: null,
};

const SEED_37_RAI_IMAGE = {
  id: "seed-img-37-rai",
  land_id: "seed-land-37-rai-eec-rayong",
  storage_key: "listings/37-rai-home-thumbnail.png",
  url_or_cdn_path: "/images/listings/37-rai-home-thumbnail.png",
  width: null,
  height: null,
  alt_th: "ภาพโดรนที่ดินอุตสาหกรรม 37 ไร่ ระยอง",
  sort_order: 0,
  is_cover: true,
  created_at: SEED_TIMESTAMP,
};

/** Canonical active 37-rai listing shared by homepage and /land. */
export const SEED_37_RAI_LAND: Land = {
  id: "seed-land-37-rai-eec-rayong",
  public_ref: 0,
  title_th: "ที่ดินอุตสาหกรรม EEC ระยอง",
  slug: SEED_37_RAI_SLUG,
  province_id: SEED_RAYONG_PROVINCE.id,
  district: "นิคมพัฒนา ระยอง",
  land_type: "industrial",
  size_rai: 37,
  zoning: "purple",
  frontage_m: 240,
  price_per_rai: 2_300_000,
  total_price: 85_100_000,
  referral_reward_max: 1_200_000,
  is_eec: true,
  nearby_landmarks: ["ถนนเข้าถึง ปี 2569"],
  description: null,
  lat: null,
  lng: null,
  location_precision: "approx",
  status: "active",
  is_featured: true,
  seo_title: null,
  seo_description: null,
  created_at: SEED_TIMESTAMP,
  updated_at: SEED_TIMESTAMP,
  deleted_at: null,
  province: SEED_RAYONG_PROVINCE,
  images: [SEED_37_RAI_IMAGE],
};

/** Sold 109-rai — homepage deal-history only, excluded from /land active inventory. */
export const SEED_109_RAI_LAND: Land = {
  id: "seed-land-109-rai-eec-rayong",
  public_ref: 0,
  title_th: "ที่ดินอุตสาหกรรม EEC ระยอง",
  slug: SEED_109_RAI_SLUG,
  province_id: SEED_RAYONG_PROVINCE.id,
  district: "นิคมพัฒนา ระยอง",
  land_type: "industrial",
  size_rai: 109,
  zoning: "purple",
  frontage_m: 240,
  price_per_rai: 2_750_000,
  total_price: null,
  referral_reward_max: 4_000_000,
  is_eec: true,
  nearby_landmarks: ["ใกล้ WHA · BYD"],
  description: null,
  lat: null,
  lng: null,
  location_precision: "approx",
  status: "sold",
  is_featured: false,
  seo_title: null,
  seo_description: null,
  created_at: SEED_TIMESTAMP,
  updated_at: SEED_TIMESTAMP,
  deleted_at: null,
  province: SEED_RAYONG_PROVINCE,
  images: [
    {
      id: "seed-img-109-rai",
      land_id: "seed-land-109-rai-eec-rayong",
      storage_key: "listings/109-rai-home-thumbnail.png",
      url_or_cdn_path: "/images/listings/109-rai-home-thumbnail.png",
      width: null,
      height: null,
      alt_th: "ภาพโดรนที่ดินอุตสาหกรรม 109 ไร่ ระยอง",
      sort_order: 0,
      is_cover: true,
      created_at: SEED_TIMESTAMP,
    },
  ],
};

export const SEED_ACTIVE_LISTINGS: Land[] = [SEED_37_RAI_LAND];

export const SEED_SOLD_SLUGS = new Set<string>([SEED_109_RAI_SLUG]);

export const SEED_LISTING_IMAGES = {
  rayong37: {
    src: "/images/listings/37-rai-home-thumbnail.png",
    alt: "ภาพโดรนที่ดินอุตสาหกรรม 37 ไร่ ระยอง",
  },
  rayong109: {
    src: "/images/listings/109-rai-home-thumbnail.png",
    alt: "ภาพโดรนที่ดินอุตสาหกรรม 109 ไร่ ระยอง",
  },
} as const;

export const SEED_37_RAI_META = {
  zoningLabel: "ผังสีม่วงลาย",
  rewardLabel: "ค่าตอบแทนผู้แนะนำสูงสุด",
  rewardSuffix: "*",
} as const;

export interface HomepageComingSoonListing {
  province: string;
  title: string;
  size: string;
  image: string;
  imageAlt: string;
  href: string;
  description: string;
}

export const SEED_KABIN_COMING_SOON: HomepageComingSoonListing = {
  province: "กบินทร์บุรี",
  title: "ที่ดินอุตสาหกรรม 101 ไร่ กบินทร์บุรี",
  size: "101 ไร่",
  image: "/images/listings/kabin-buri-101-rai-home-thumbnail.png",
  imageAlt: "ภาพโดรนที่ดินอุตสาหกรรม 101 ไร่ กบินทร์บุรี",
  href: "/become-partner",
  description:
    "โปรเจกต์ใหม่ในกบินทร์บุรี กำลังเตรียมรายละเอียด ลงทะเบียนรับข้อมูลก่อนใคร",
};

export function matchesSeedListingFilters(
  land: Land,
  opts?: { province_slug?: string; land_type?: LandType },
): boolean {
  if (opts?.province_slug && land.province?.slug !== opts.province_slug) {
    return false;
  }
  if (opts?.land_type) {
    if (land.land_type === opts.land_type) return true;
    if (opts.land_type === "eec" && land.is_eec) return true;
    return false;
  }
  return true;
}

export function filterSeedActiveListings(opts?: {
  province_slug?: string;
  land_type?: LandType;
}): Land[] {
  return SEED_ACTIVE_LISTINGS.filter(
    (land) =>
      land.status === "active" &&
      !SEED_SOLD_SLUGS.has(land.slug) &&
      matchesSeedListingFilters(land, opts),
  );
}

export function mergeWithSeedListings(
  dbListings: Land[],
  opts?: { province_slug?: string; land_type?: LandType },
): Land[] {
  const dbSlugs = new Set(dbListings.map((land) => land.slug));
  const seedListings = filterSeedActiveListings(opts).filter(
    (land) => !dbSlugs.has(land.slug),
  );
  return [...dbListings, ...seedListings];
}

export function getSeedListingImage(land: Land) {
  if (land.slug === SEED_37_RAI_SLUG || (land.size_rai >= 35 && land.size_rai <= 40)) {
    return SEED_LISTING_IMAGES.rayong37;
  }
  if (land.slug === SEED_109_RAI_SLUG || (land.size_rai >= 100 && land.size_rai <= 120)) {
    return SEED_LISTING_IMAGES.rayong109;
  }
  return undefined;
}

export function getSeedListingHref(land: Land): string | undefined {
  if (land.slug === SEED_37_RAI_SLUG || (land.size_rai >= 35 && land.size_rai <= 40)) {
    return propertyHref(SEED_37_RAI_SLUG);
  }
  if (land.slug === SEED_109_RAI_SLUG || (land.size_rai >= 100 && land.size_rai <= 120)) {
    return propertyHref(SEED_109_RAI_SLUG);
  }
  return undefined;
}

export function isSeedSoldOutListing(land: Land) {
  return (
    land.slug === SEED_109_RAI_SLUG ||
    land.status === "sold" ||
    (land.size_rai >= 100 && land.size_rai <= 120)
  );
}

export function isSeedFeaturedListing(land: Land) {
  return (
    land.slug === SEED_37_RAI_SLUG ||
    (land.size_rai >= 35 && land.size_rai <= 40)
  );
}

export function seedListingSortOrder(land: Land) {
  if (isSeedFeaturedListing(land)) return 0;
  if (isSeedSoldOutListing(land)) return 1;
  return 2;
}

export function sortSeedListings(listings: Land[]) {
  return [...listings].sort((a, b) => seedListingSortOrder(a) - seedListingSortOrder(b));
}

export function resolveListingPresentation(land: Land) {
  return {
    imageOverride: getSeedListingImage(land),
    hrefOverride: getSeedListingHref(land),
    soldOut: isSeedSoldOutListing(land),
    dealHistory: isSeedSoldOutListing(land),
    featured: isSeedFeaturedListing(land),
    metaTagLabel: isSeedFeaturedListing(land) ? SEED_37_RAI_META.zoningLabel : undefined,
    rewardLabel: isSeedFeaturedListing(land) ? SEED_37_RAI_META.rewardLabel : undefined,
    rewardSuffix: isSeedFeaturedListing(land) ? SEED_37_RAI_META.rewardSuffix : undefined,
  };
}
