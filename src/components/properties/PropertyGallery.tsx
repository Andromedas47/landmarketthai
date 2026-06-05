import Image from "next/image";
import type { PropertyDetailImage } from "@/lib/property-detail-data";

interface Props {
  images: PropertyDetailImage[];
  title: string;
}

export default function PropertyGallery({ images, title }: Props) {
  const [primaryImage, ...secondaryImages] = images;

  return (
    <section className="min-w-0 rounded-2xl border border-slate-100 bg-white p-2.5 shadow-[0_2px_8px_rgba(13,30,70,0.06)] sm:p-4">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-100">
        {primaryImage ? (
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
            {title}
          </div>
        )}
      </div>

      <div className="mt-3 grid grid-cols-4 gap-1.5 sm:gap-2">
        {[primaryImage, ...secondaryImages]
          .filter((image): image is PropertyDetailImage => Boolean(image))
          .slice(0, 4)
          .map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="relative aspect-4/3 overflow-hidden rounded-lg bg-slate-100"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 25vw, 12vw"
                className="object-cover"
              />
            </div>
          ))}
      </div>
    </section>
  );
}
