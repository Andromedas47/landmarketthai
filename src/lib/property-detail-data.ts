export interface PropertyDetailImage {
  src: string;
  alt: string;
}

export interface PropertyDetail {
  slug: string;
  title: string;
  shortTitle: string;
  location: string;
  size: string;
  zoning: string;
  pricePerRai: string;
  referralReward: string;
  frontage: string;
  access: string;
  status: string;
  nearby: string[];
  heroImage: PropertyDetailImage;
  keyHighlights: string[];
  facts: Array<{
    label: string;
    value: string;
  }>;
  highlightCards: Array<{
    title: string;
    description: string;
  }>;
  gallery: PropertyDetailImage[];
}

export const propertyDetails: PropertyDetail[] = [
  {
    slug: "109-rai-eec-rayong",
    title: "ที่ดินอุตสาหกรรม EEC ระยอง 109 ไร่ ใกล้ WHA และ BYD",
    shortTitle: "109 ไร่ EEC ระยอง",
    location: "นิคมพัฒนา, ระยอง",
    size: "109 ไร่ 2 งาน 52 ตร.ว.",
    zoning: "ผังสีม่วง",
    pricePerRai: "2.75 ล้านบาท/ไร่",
    referralReward: "ค่าแนะนำสูงสุด 4,000,000 บาท",
    frontage: "ประมาณ 240 เมตร",
    access: "เข้าออกได้ 2 ทาง",
    status: "เปิดรับสอบถาม",
    nearby: ["WHA", "BYD"],
    heroImage: {
      src: "/images/listings/109-rai-home-thumbnail.png",
      alt: "ภาพโดรนที่ดินอุตสาหกรรม 109 ไร่ EEC ระยอง",
    },
    keyHighlights: [
      "พื้นที่ 109 ไร่ 2 งาน 52 ตร.ว.",
      "ผังสีม่วง เหมาะสำหรับโรงงานและคลังสินค้า",
      "หน้ากว้างประมาณ 240 เมตร",
      "ใกล้ WHA และ BYD ในโซน EEC ระยอง",
    ],
    facts: [
      { label: "ขนาดที่ดิน", value: "109 ไร่ 2 งาน 52 ตร.ว." },
      { label: "ทำเล", value: "นิคมพัฒนา, ระยอง" },
      { label: "ผังเมือง", value: "ผังสีม่วง" },
      { label: "หน้ากว้าง", value: "ประมาณ 240 เมตร" },
      { label: "ทางเข้าออก", value: "เข้าออกได้ 2 ทาง" },
      { label: "สถานะ", value: "เปิดรับสอบถาม" },
    ],
    highlightCards: [
      {
        title: "เหมาะสำหรับอุตสาหกรรม",
        description:
          "ที่ดินผังสีม่วงในพื้นที่ EEC เหมาะสำหรับโรงงาน คลังสินค้า และการลงทุนระยะยาว",
      },
      {
        title: "การเดินทางและโลจิสติกส์",
        description:
          "เข้าออกได้ 2 ทาง หน้ากว้างประมาณ 240 เมตร รองรับการขนส่งและรถบรรทุก",
      },
      {
        title: "ศักยภาพทำเล",
        description: "อยู่ใกล้ WHA และ BYD เหมาะกับผู้ซื้อที่ต้องการทำเลอุตสาหกรรมในระยอง",
      },
    ],
    gallery: [
      {
        src: "/images/listings/109-rai-gallery/01-drone-aerial.png",
        alt: "ภาพโดรนมุมสูงที่ดิน 109 ไร่ EEC ระยอง",
      },
      {
        src: "/images/listings/109-rai-gallery/02-drone-boundary.png",
        alt: "ภาพโดรนแสดงขอบเขตแปลงที่ดิน 109 ไร่",
      },
      {
        src: "/images/listings/109-rai-gallery/03-roadside-view.png",
        alt: "ภาพถนนหน้าแปลงที่ดิน 109 ไร่ EEC ระยอง",
      },
      {
        src: "/images/listings/109-rai-gallery/04-boundary-map.png",
        alt: "แผนที่ขอบเขตและขนาดพื้นที่ 109 ไร่ 2 งาน 52 ตร.ว.",
      },
      {
        src: "/images/listings/109-rai-gallery/05-zoning-map.png",
        alt: "แผนที่ผังสีม่วงและระยะขอบเขตแปลง 109 ไร่",
      },
      {
        src: "/images/listings/109-rai-gallery/06-overview.png",
        alt: "ภาพรวมที่ดิน 109 ไร่ ผังสีม่วง EEC ระยอง ราคา 2.75 ล้าน/ไร่",
      },
      {
        src: "/images/listings/109-rai-gallery/07-access-highlights.png",
        alt: "จุดเด่นแปลง 109 ไร่ หน้ากว้าง 240 เมตร เข้าออก 2 ทาง ใกล้ BYD",
      },
      {
        src: "/images/listings/109-rai-gallery/08-for-sale-sign.png",
        alt: "ป้ายขายที่ดิน EEC 109 ไร่ ระยอง หน้ากว้าง 240 เมตร",
      },
    ],
  },
  {
    slug: "37-rai-eec-rayong",
    title: "ที่ดินอุตสาหกรรม EEC ระยอง 37 ไร่ ติดถนน 2026",
    shortTitle: "37 ไร่ EEC ระยอง",
    location: "ระยอง",
    size: "37 ไร่",
    zoning: "ผังสีม่วง",
    pricePerRai: "2.3 ล้านบาท/ไร่",
    referralReward: "ค่าแนะนำสูงสุด 1,200,000 บาท",
    frontage: "ประมาณ 240 เมตร",
    access: "ติดถนน 2026",
    status: "เปิดรับสอบถาม",
    nearby: ["ด้านหลังติดแหล่งน้ำ"],
    heroImage: {
      src: "/images/listings/37-rai-home-thumbnail.png",
      alt: "ภาพโดรนที่ดินอุตสาหกรรม 37 ไร่ EEC ระยอง",
    },
    keyHighlights: [
      "พื้นที่ 37 ไร่",
      "ผังสีม่วง เหมาะสำหรับอุตสาหกรรม",
      "หน้ากว้างประมาณ 240 เมตร",
      "ติดถนน 2026 เข้าออกสะดวก",
      "ด้านหลังติดแหล่งน้ำ",
    ],
    facts: [
      { label: "ขนาดที่ดิน", value: "37 ไร่" },
      { label: "ทำเล", value: "ระยอง" },
      { label: "ผังเมือง", value: "ผังสีม่วง" },
      { label: "หน้ากว้าง", value: "ประมาณ 240 เมตร" },
      { label: "ทางเข้าออก", value: "ติดถนน 2026" },
      { label: "สถานะ", value: "เปิดรับสอบถาม" },
    ],
    highlightCards: [
      {
        title: "เหมาะสำหรับอุตสาหกรรม",
        description:
          "ที่ดินผังสีม่วงในระยอง EEC เหมาะสำหรับโรงงาน คลังสินค้า และธุรกิจที่ต้องการพื้นที่อุตสาหกรรม",
      },
      {
        title: "เดินทางสะดวก",
        description: "ติดถนน 2026 พร้อมหน้ากว้างประมาณ 240 เมตร",
      },
      {
        title: "จุดเด่นของแปลง",
        description:
          "พื้นที่ขนาดเหมาะสมสำหรับผู้ซื้อที่ต้องการเริ่มโครงการอุตสาหกรรมในพื้นที่ EEC ระยอง",
      },
    ],
    gallery: [
      {
        src: "/images/listings/37-rai-gallery/01-roadside-view.png",
        alt: "ภาพถนนหน้าแปลงที่ดิน 37 ไร่ ติดถนน 2026",
      },
      {
        src: "/images/listings/37-rai-gallery/02-roadside-trench.png",
        alt: "ภาพหน้าแปลงที่ดิน 37 ไร่ ระยะริมถนน",
      },
      {
        src: "/images/listings/37-rai-gallery/03-site-prep.png",
        alt: "ภาพพื้นที่เตรียมแปลงที่ดิน 37 ไร่ EEC ระยอง",
      },
      {
        src: "/images/listings/37-rai-gallery/04-location-map.png",
        alt: "แผนที่ตำแหน่งแปลงที่ดิน 37 ไร่ ติดถนน 2026",
      },
      {
        src: "/images/listings/37-rai-gallery/05-boundary-map.png",
        alt: "แผนที่ขอบเขตและระยะรอบแปลงที่ดิน 37 ไร่",
      },
      {
        src: "/images/listings/37-rai-gallery/06-boundary-outline.png",
        alt: "แผนที่แสดงขอบเขตแปลง 37 ไร่ พร้อมระยะทางรอบแปลง",
      },
    ],
  },
];

export function getPropertyDetail(slug: string): PropertyDetail | undefined {
  return propertyDetails.find((property) => property.slug === slug);
}

export function propertyHref(slug: string): string {
  return `/property/${slug}`;
}
