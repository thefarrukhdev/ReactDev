import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export type SectionId = "install" | "usage" | "code";

export type Section = {
  id: SectionId;
  label: string;
  icon: LucideIcon;
  content: string;
};

export type ComponentPreviewProps = {
  name: string;
  element: ReactNode;
  install?: string;
  usage?: string;
  code: string;
  showPreview?: boolean;
};
