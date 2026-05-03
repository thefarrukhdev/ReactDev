// cardMeta.tsx
import React from "react";
import { ImageCard } from "./ImageCard";
import { ImageCardCode } from "./imageCardCode";
import { cardUsage } from "./usage";
import { cardInstall } from "./install";

export const meta = {
  id: "card",
  name: "Image Card",
  // Demo element: constant orqali parametrik
  element: (
    <ImageCard
      data={{
        id: 1,
        title: "React Dev",
        description: "This is a card content.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
        category: "Demo",
        author: "Jumayev Farrukh",
        readTime: "31 min read",
        date: "February  11, 2006",
      }}
      onLike={() => console.log("Liked!")}
      onShare={() => console.log("Shared!")}
      onReadMore={() => console.log("Read more!")}
    />
  ),
  code: ImageCardCode,
  usage: cardUsage,
  install: cardInstall,
};
