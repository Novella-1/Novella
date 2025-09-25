export const fetchCategoriesCount = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/count-by-type`,
      {
        cache: 'no-store',
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);

    return {
      counts: [
        { type: 'PAPERBACK', count: 0 },
        { type: 'AUDIOBOOK', count: 0 },
        { type: 'KINDLE', count: 0 },
      ],
    };
  }
};
