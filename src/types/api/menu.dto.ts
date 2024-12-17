import type { IProductDto } from "./product.dto";

export interface IMenuFoodCategory {
  id: number;
  name: string;
  foods: IProductDto[];
}
export interface IMenuDto {
  id: number;
  date: string;
  foodCategories: IMenuFoodCategory[];
}
