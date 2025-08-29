import { useRouter } from 'next/router';

export default function CategoryListings() {
  const router = useRouter();
  const { category } = router.query as { category: string };

  return (
    <div className="container py-4">
      <h1>{category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category'} Cars</h1>
      <p>Showing car listings for {category}...</p>
      {/* Add your car listings logic here */}
    </div>
  );
}