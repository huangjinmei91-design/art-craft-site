import { notFound } from "next/navigation";
import { CatalogDetailClient } from "@/components/catalog/CatalogDetailClient";
import { findObjectBySlug } from "@/data/catalog";

export default async function ObjectDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const object = findObjectBySlug("zh-Hans", slug);

  if (!object) {
    notFound();
  }

  return <CatalogDetailClient kind="objects" slug={slug} />;
}
