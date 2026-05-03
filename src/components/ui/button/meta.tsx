import React from "react";
import { NeoGlassButton } from "./button";
import { neoglassButtonCode } from "./button-code";
import { buttonUsage } from "./usage";
import { neoGlassButtonInstall } from "./install";
import { Download, ArrowRight, Trash2 } from "lucide-react";

export const meta = {
  id: "button",
  name: "Button",
  element: (
    <div className="flex space-x-4">
      <NeoGlassButton 
        variant="primary" 
        size="md" 
        leftIcon={<Download />}
      >
        Download
      </NeoGlassButton>

      <NeoGlassButton 
        variant="secondary" 
        size="lg" 
        rightIcon={<ArrowRight />}
      >
        Continue
      </NeoGlassButton>

      <NeoGlassButton 
        variant="danger" 
        size="sm" 
        loading
      >
        Deleting...
      </NeoGlassButton>
    </div>
  ),
  code: neoglassButtonCode,
  usage: buttonUsage,
  install: neoGlassButtonInstall,
};
