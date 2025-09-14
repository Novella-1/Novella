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
      placeholder="Find a book or author"
      className="w-full"
    />
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="categories">Categories</SelectItem>
        <SelectItem value="paper">Paper</SelectItem>
        <SelectItem value="audio">Audio</SelectItem>
        <SelectItem value="kindle">Kindle</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default MobileSearch;
