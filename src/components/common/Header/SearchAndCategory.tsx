import { FC } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

const SearchAndCategory: FC = () => (
  <div className="hidden xl:flex items-center space-x-4 ml-auto">
    <Input
      placeholder="Find a book or author"
      className="w-72"
    />
    <Select>
      <SelectTrigger className="w-48">
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

export default SearchAndCategory;
