import { notFound } from "next/navigation";
import { CatalogDetailClient } from "@/components/catalog/CatalogDetailClient";
import { findConceptBySlug } from "@/data/catalog";

export default async function ConceptDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = findConceptBySlug("zh-Hans", slug);

  if (!concept) {
    notFound();
  }

  return <CatalogDetailClient kind="concepts" slug={slug} />;
}
