export interface AdminProductsPageProps {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>;
}
