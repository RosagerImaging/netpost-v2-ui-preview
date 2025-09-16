"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@repo/lib";

interface ItemImageGalleryProps {
  images: string[];
  title: string;
}

/**
 * A component to display an item's image gallery with a primary image and thumbnails.
 */
export const ItemImageGallery: React.FC<ItemImageGalleryProps> = ({
  images,
  title,
}) => {
  const [primaryImage, setPrimaryImage] = useState(images[0] || "");

  if (!images || images.length === 0) {
    return (
      <div className="bg-sidebar-bg flex aspect-square w-full items-center justify-center rounded-lg">
        <span className="text-secondary-text">No Image</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square w-full overflow-hidden rounded-xl border border-white/10">
        <Image
          src={primaryImage}
          alt={`Primary image for ${title}`}
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setPrimaryImage(image)}
            className={cn(
              "aspect-square w-full overflow-hidden rounded-lg border-2 transition-all",
              primaryImage === image
                ? "border-primary-interactive"
                : "border-transparent hover:border-white/50"
            )}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1} for ${title}`}
              width={150}
              height={150}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
