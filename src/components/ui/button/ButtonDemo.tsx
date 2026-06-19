"use client";

import React from "react";
import { NeoGlassButton } from "./button";
import { Download, ArrowRight } from "lucide-react";

export function ButtonDemo() {
  return (
    <div className="flex space-x-4">
      <NeoGlassButton variant="primary" size="md" leftIcon={<Download />}>
        Download
      </NeoGlassButton>

      <NeoGlassButton variant="secondary" size="lg" rightIcon={<ArrowRight />}>
        Continue
      </NeoGlassButton>

      <NeoGlassButton variant="danger" size="sm" loading>
        Deleting...
      </NeoGlassButton>
    </div>
  );
}
