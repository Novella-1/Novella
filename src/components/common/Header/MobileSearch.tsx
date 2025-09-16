import { FC } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

const MobileSearch: FC = () => (
  <div className="w-full max-w-xs space-y-4">
    <Input
      placeholder="Find a book or author..."
      className="w-full border-[#BAA48C] bg-[#F4E2CD] text-[#331F06] placeholder:text-[#331F06] font-bold"
    />
    <Select>
      <SelectTrigger className="w-full border-[#BAA48C] bg-[#F4E2CD] text-[#331F06] font-bold">
        <SelectValue placeholder="Categories" />
      </SelectTrigger>
      <SelectContent className="text-[#331F06] border border-[#BAA48C] selection:text-[#F4E2CD] font-bold">
        <SelectItem value="paper">Paper</SelectItem>
        <SelectItem value="audio">Audio</SelectItem>
        <SelectItem value="kindle">Kindle</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default MobileSearch;
