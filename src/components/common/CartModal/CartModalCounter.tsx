'use client';

import { useQuery } from '@tanstack/react-query';
import { getLocalCart } from '@/lib/localStorage';
import { fetchCartIds } from '@/services/fetchCart';

type Props = {
  totalCount?: number;
  userId?: string;
};

export const CartModalCounter = ({ userId, totalCount = 0 }: Props) => {
  const { data: count } = useQuery({
    queryKey: userId ? ['CART_COUNT', userId] : ['LOCAL_CART_COUNT'],
    queryFn: async () => {
      if (userId) {
        const { data } = await fetchCartIds(userId);
        return data.length;
      } else {
        return getLocalCart().length;
      }
    },
    initialData: totalCount,
    enabled: userId ? !!userId : true,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  return <span>You have ${count} items in your cart.</span>;
};
