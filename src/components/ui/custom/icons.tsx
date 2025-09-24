import {
  Truck,
  Search,
  Heart,
  ShoppingBag,
  Headphones,
  Menu,
  House,
  Plus,
  Minus,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  LogOut,
  UserRound,
  User,
} from 'lucide-react';
import * as React from 'react';

export function TruckIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Truck {...props} />;
}

export function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Search {...props} />;
}

export function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Heart {...props} />;
}

export function CartIcon({
  // size = 16,
  ...props
}: { size?: number } & React.SVGProps<SVGSVGElement>) {
  return (
    <ShoppingBag
      // size={size}
      {...props}
    />
  );
}

export function HeadphonesIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Headphones {...props} />;
}

export function BurgerMenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Menu {...props} />;
}

export function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return <House {...props} />;
}

export function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Plus {...props} />;
}

export function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Minus {...props} />;
}

export function CLoseIcon(props: React.SVGProps<SVGSVGElement>) {
  return <X {...props} />;
}

export function ArrowUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return <ChevronUp {...props} />;
}

export function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return <ChevronDown {...props} />;
}

export function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return <ChevronLeft {...props} />;
}

export function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return <ChevronRight {...props} />;
}

export function ExitIcon(props: React.SVGProps<SVGSVGElement>) {
  return <LogOut {...props} />;
}

export function ProfileIcon(props: React.SVGProps<SVGSVGElement>) {
  return <UserRound {...props} />;
}

export function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return <User {...props} />;
}
