import type { CategoryEntity } from "@/dtos/category.dto";

export interface CreateCategoryResponse {
  ok: boolean;
  message: string;
  category: CategoryEntity;
}
