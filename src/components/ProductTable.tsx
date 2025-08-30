"use client";

import { Product } from "@/types";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FilePenLine, Trash2, PackageX } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

type ProductTableProps = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
};

export const ProductTable = ({
  products,
  isLoading,
  isError,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  if (isError) {
    return (
      <div className="border rounded-lg p-6 text-center text-red-600">
        Something went wrong while fetching products.
      </div>
    );
  }

  return (
    <div className="border shadow-md rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="w-[30%]">Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-8 w-20 ml-auto" />
                </TableCell>
              </TableRow>
            ))
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                <div className="flex flex-col items-center text-muted-foreground">
                  <PackageX className="h-6 w-6 mb-2" />
                  <p>No products found.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product, idx) => (
              <TableRow
                key={product.id}
                className="hover:bg-muted/30 border-b last:border-0"
              >
                <TableCell className="font-medium">
                  {product.title}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {product.category}
                </TableCell>
                <TableCell className="font-semibold">
                  ${product.price}
                </TableCell>
                <TableCell>
                  {product.stock > 20 ? (
                    <Badge variant="secondary">In Stock ({product.stock})</Badge>
                  ) : product.stock > 0 ? (
                    <Badge variant="outline" className="text-amber-600 border-amber-400">
                      Low ({product.stock})
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(product)}
                        >
                          <FilePenLine className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit product</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:bg-red-50"
                          onClick={() => onDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete product</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
