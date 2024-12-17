export interface IProductDto {
  id?: number;
  foodId?: number;
  name: string;
  categoryId?: number;
  description: string;
  photoUrl: string;
  count: number;
  reserved: number;
  newLabel: boolean;
  realPhoto: boolean;
  mainCategory?: boolean;
}
