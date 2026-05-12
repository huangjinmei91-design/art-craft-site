import { SearchPageClient } from "@/components/catalog/SearchPageClient";

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;

  return <SearchPageClient initialQuery={params.q ?? ""} />;
}
