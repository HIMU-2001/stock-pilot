import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChevronsUpDown, Plus } from "lucide-react";
import { Category } from "@/types";

type ProductFiltersProps = {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  categories?: Category[];
  onAddClick: () => void;
};

export const ProductFilters = ({
  searchQuery,
  setSearchQuery,
  category,
  setCategory,
  categories,
  onAddClick,
}: ProductFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-background border rounded-lg shadow-sm p-4">
      <Input
        placeholder="🔍 Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full sm:w-1/3"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto">
            Category: {category === "all" ? "All" : category}
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
            <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
            {categories?.map((cat) => (
              <DropdownMenuRadioItem key={cat.slug} value={cat.slug}>
                {cat.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button onClick={onAddClick} className="w-full sm:w-auto sm:ml-auto">
        <Plus className="mr-2 h-4 w-4" /> Add Product
      </Button>
    </div>
  );
}
