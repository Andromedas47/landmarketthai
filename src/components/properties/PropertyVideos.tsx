import type { PropertyDetailVideo } from "@/lib/property-detail-data";

interface Props {
  videos: PropertyDetailVideo[];
}

export default function PropertyVideos({ videos }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {videos.map((video) => (
        <div
          key={video.src}
          className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_2px_8px_rgba(13,30,70,0.06)]"
        >
          <video
            src={video.src}
            controls
            playsInline
            preload="metadata"
            className="aspect-video w-full bg-slate-950"
          >
            {video.title}
          </video>
          <p className="px-4 py-3 text-sm font-medium text-slate-700">{video.title}</p>
        </div>
      ))}
    </div>
  );
}
