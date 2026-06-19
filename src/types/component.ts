import { ReactNode } from "react";

/** Single component entry for the showcase registry */
export type ComponentItem = {
  /** Unique URL-safe identifier (used in [slug] routing) */
  id: string;
  /** Display name shown in sidebar and page heading */
  name: string;
  /** Live preview element rendered in the showcase */
  element: ReactNode;
  /** npm install command string */
  install?: string;
  /** Usage code snippet */
  usage?: string;
  /** Full source code of the component */
  code: string;
};
