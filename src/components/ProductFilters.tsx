import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area"
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
        <DropdownMenuContent
         align="end"
        className="w-[220px] bg-popover shadow-lg rounded-lg z-50 border border-border p-2 mt-1"
        >
  <DropdownMenuLabel className="text-sm font-medium text-muted-foreground px-2 pb-1">
    Filter by category
  </DropdownMenuLabel>
  <DropdownMenuSeparator />

  {/* Make category list scrollable */}
  <ScrollArea className="h-48"> {/* adjust height as needed */}
    <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
      <DropdownMenuRadioItem
        value="all"
        className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer transition-colors 
                   hover:bg-muted focus:bg-muted data-[state=checked]:bg-muted/50"
      >
        🌐 <span className="text-sm">All Categories</span>
      </DropdownMenuRadioItem>

      {categories?.map((cat) => (
        <DropdownMenuRadioItem
          key={cat.slug}
          value={cat.slug}
          className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer transition-colors 
                     hover:bg-muted focus:bg-muted data-[state=checked]:bg-muted/50"
        >
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-foreground/80">
            {cat.name}
          </span>
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
            </ScrollArea>
            </DropdownMenuContent>

      </DropdownMenu>

      <Button onClick={onAddClick} className="w-full sm:w-auto sm:ml-auto">
        <Plus className="mr-2 h-4 w-4" /> Add Product
      </Button>
    </div>
  );
}
