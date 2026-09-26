import Image from "next/image";
import { cn } from "@/lib/utils";

/** An institutional crest on a white disc, as on the official poster. */
export function CrestPlate({
  src,
  alt,
  size = 48,
  className,
  preload = false,
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  preload?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full bg-white shadow-[0_1px_2px_rgb(0_0_0/0.2),0_0_0_1px_rgb(0_0_0/0.06)]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={384}
        height={384}
        sizes={`${Math.round(size * 0.86)}px`}
        preload={preload}
        className="h-[86%] w-[86%] object-contain"
      />
    </span>
  );
}
