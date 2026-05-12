import { notFound } from "next/navigation";
import { GlossaryPageClient } from "@/components/catalog/GlossaryPageClient";
import { findGlossaryBySlug } from "@/data/catalog";

export default async function GlossaryDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = findGlossaryBySlug("zh-Hans", slug);

  if (!entry) {
    notFound();
  }

  return <GlossaryPageClient slug={slug} />;
}
