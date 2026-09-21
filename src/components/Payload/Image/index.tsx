import { Media } from "@/payload-types";
import { isMediaObject } from "@/utilities/payload/is-media-object";
import Image from "next/image";

type PayloadImageProps = {
  className?: string;
  image: Media;
  alt?: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
};

export function PayloadImage({ image, className, alt, width, height, loading = "lazy" }: PayloadImageProps) {
  if (!isMediaObject(image)) {
    return null;
  }

  return <Image key={image.id} className={className} src={image.url!} width={width ? width : image.width!} height={height ? height : image.height!} alt={alt ? alt : image.alt || ""} loading={loading} placeholder={image.blurhash ? "blur" : "empty"} blurDataURL={image.blurhash || undefined} />;
}
