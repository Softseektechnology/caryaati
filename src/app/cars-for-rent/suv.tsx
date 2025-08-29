'use client'; // Mark as client component since we use useRouter

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CategoryListings() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = router.query?.category as string[] | string | undefined; // Handle query from router

  // State to manage category loading
  const [categoryName, setCategoryName] = useState<string | null>(null);

  useEffect(() => {
    // Ensure category is available after route change
    if (category) {
      const name = Array.isArray(category) ? category.join('/') : category;
      setCategoryName(name);
    }
  }, [category]);

  // Handle loading state
  if (!categoryName) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-4">
      <h1>
        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Cars
      </h1>
      <p>Showing car listings for {categoryName}...</p>
      {/* Add your car listings logic here */}
    </div>
  );
}