import { notFound } from "next/navigation";
import { CatalogDetailClient } from "@/components/catalog/CatalogDetailClient";
import { findTimelineBySlug } from "@/data/catalog";

export default async function TimelineDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const era = findTimelineBySlug("zh-Hans", slug);

  if (!era) {
    notFound();
  }

  return <CatalogDetailClient kind="timeline" slug={slug} />;
}
