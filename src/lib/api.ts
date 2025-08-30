import axios from "axios";
import { Category, Product, ProductsResponse } from "@/types";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch products with pagination, search, and category filter
export async function fetchProducts(
  skip: number,
  limit: number,
  query: string,
  category: string
): Promise<ProductsResponse> {
  const endpoint =
    category && category !== "all"
      ? `/products/category/${category}?limit=${limit}&skip=${skip}`
      : `/products/search?limit=${limit}&skip=${skip}&q=${query}`;

  const { data } = await api.get<ProductsResponse>(`${endpoint}&delay=500`);
  return data;
}

// Fetch available product categories
export async function fetchCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>("/products/categories");
  return data;
}

// Create a new product
export async function createProduct(
  product: Omit<Product, "id">
): Promise<Product> {
  const { data } = await api.post<Product>("/products/add", product);
  return data;
}

// Update an existing product
export async function editProduct(
  id: number,
  product: Partial<Product>
): Promise<Product> {
  const { data } = await api.put<Product>(`/products/${id}`, product);
  return data;
}

// Remove a product
export async function removeProduct(id: number): Promise<Product> {
  const { data } = await api.delete<Product>(`/products/${id}`);
  return data;
}
