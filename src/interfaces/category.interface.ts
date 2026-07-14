import type { CategoryEntity } from "@/dtos/category.dto";

export interface CreateCategoryResponse {
  ok: boolean;
  message: string;
  category: CategoryEntity;
}
export interface GetCategoriesResponse {
  ok: boolean;
  message: string;
  categories: CategoryEntity[];
  meta: {
    total: number;
  };
}
