"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchCategories,
  createProduct,
  editProduct,
  removeProduct,
} from "@/lib/api";
import { Category, Product } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { ProductDialog } from "@/components/ProductDialog";
import { Header } from "@/components/Header";
import { ProductFilters } from "@/components/ProductFilters";
import { ProductTable } from "@/components/ProductTable";
import { Pagination } from "@/components/Pagination";
import { useDebounce } from "@/hooks/useDebounce";

const PRODUCTS_PER_PAGE = 10;

export default function Home() {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // 🔹 Queries
  const {
    data: productsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", page, debouncedSearchQuery, category],
    queryFn: () =>
      fetchProducts(
        page * PRODUCTS_PER_PAGE,
        PRODUCTS_PER_PAGE,
        debouncedSearchQuery,
        category
      ),
    placeholderData: (previousData) => previousData,
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // 🔹 Mutations
  const addMutation = useMutation<Product, Error, Omit<Product, "id">>({
    mutationFn: createProduct,
    onSuccess: () => handleMutationSuccess("added"),
    onError: () => handleMutationError("add"),
  });

  const updateMutation = useMutation<
    Product,
    Error,
    { id: number; product: Partial<Product> }
  >({
    mutationFn: ({ id, product }) => editProduct(id, product),
    onSuccess: () => handleMutationSuccess("updated"),
    onError: () => handleMutationError("update"),
  });

  const deleteMutation = useMutation<Product, Error, number>({
    mutationFn: removeProduct,
    onSuccess: () => handleMutationSuccess("deleted"),
    onError: () => handleMutationError("delete"),
  });

  // 🔹 Helpers
  const handleMutationSuccess = (action: string) => {
    toast({
      title: "Success",
      description: `Product ${action} successfully.`,
    });
    queryClient.invalidateQueries({ queryKey: ["products"] });
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  const handleMutationError = (action: string) => {
    toast({
      variant: "destructive",
      title: "Error",
      description: `Failed to ${action} product.`,
    });
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleDialogSubmit = (productData: Omit<Product, "id" | "thumbnail">) => {
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, product: productData });
    } else {
      addMutation.mutate({
        ...productData,
        thumbnail: "https://via.placeholder.com/150",
      });
    }
  };

  const totalPages = productsData
    ? Math.ceil(productsData.total / PRODUCTS_PER_PAGE)
    : 0;

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      {/* Header */}
      <Header />

      <main className="flex-1 p-6 space-y-6">
        {/* Filters */}
        <ProductFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          category={category}
          setCategory={setCategory}
          categories={categories}
          onAddClick={handleAddClick}
        />

        {/* Table */}
        <ProductTable
          products={productsData?.products || []}
          isLoading={isLoading}
          isError={isError}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />

        {/* Pagination */}
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          hasNext={productsData?.products.length === PRODUCTS_PER_PAGE}
        />
      </main>

      {/* Dialog */}
      {isDialogOpen && (
        <ProductDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleDialogSubmit}
          product={editingProduct}
        />
      )}
    </div>
  );
}
