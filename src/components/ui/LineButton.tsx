import Link from "next/link";
import { cn } from "@/lib/utils";
import LineIcon from "@/components/ui/LineIcon";
import { LINE_OA } from "@/lib/constants/site";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
}

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function LineButton({ className, size = "md", label = "เพิ่มเป็นเพื่อน LINE OA" }: Props) {
  return (
    <Link
      href={LINE_OA}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("btn-line", sizes[size], className)}
    >
      <LineIcon size={20} className="shrink-0" />
      {label}
    </Link>
  );
}
