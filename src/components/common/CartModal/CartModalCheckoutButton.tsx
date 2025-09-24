import { Button } from '@/components/ui/button';

const CartModalCheckoutButton = ({
  itemsLength,
  isPending,
  handleCheckout,
}: {
  itemsLength: number;
  isPending: boolean;
  handleCheckout: () => void;
}) => {
  return (
    <Button
      type="button"
      className="px-4 py-6 bg-[#5A4632] text-white rounded-md font-bold hover:bg-[#4a3826] hover:cursor-pointer w-full transition disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={itemsLength === 0 || isPending}
      onClick={handleCheckout}
    >
      {isPending ? 'Processing...' : 'Make an order 🔖'}
    </Button>
  );
};

export default CartModalCheckoutButton;
