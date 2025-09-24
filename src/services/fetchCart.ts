interface CreateOrderData {
  userId?: string;
  items: {
    bookId: string;
    quantity: number;
    price: number;
  }[];
}

export const addToCart = async (
  userId: string,
  bookId: string,
  quantity: number = 1,
) => {
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, bookId, quantity }),
  });

  console.log(userId, bookId, quantity);

  if (!res.ok) throw new Error('Failed to add item to Cart');
  return res.json();
};

export const removeFromCart = async (userId: string, bookId: string) => {
  const res = await fetch('/api/cart', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, bookId }),
  });

  if (!res.ok) throw new Error('Failed to remove item from Cart');
  return res.json();
};

export const fetchCartIds = async (userId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/${userId}/ids`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) throw new Error('Failed to fetch items from cart');
  return res.json() as Promise<{ data: string[]; totalCount: number }>;
};

export async function fetchCart(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/${userId}`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
}

export const createOrder = async (data: CreateOrderData) => {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to create order');
  }

  return res.json();
};
