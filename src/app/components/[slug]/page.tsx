"use client";

import { useParams } from "next/navigation";
import SlugPageClient from "./slug-page-client";

export default function ComponentSlugPage() {
  const params = useParams<{ slug: string }>();
  return <SlugPageClient slug={params.slug} />;
}
