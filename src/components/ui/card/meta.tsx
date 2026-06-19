import React from "react";
import { ImageCardDemo } from "./ImageCardDemo";
import { ImageCardCode } from "./imageCardCode";
import { cardUsage } from "./usage";
import { cardInstall } from "./install";

export const meta = {
  id: "card",
  name: "Image Card",
  element: <ImageCardDemo />,
  code: ImageCardCode,
  usage: cardUsage,
  install: cardInstall,
};
