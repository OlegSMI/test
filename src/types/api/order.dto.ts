import type { IProductDto } from "./product.dto";

export type TOrderSeatingType = "pickup" | "free_table" | "reserved_table";

export interface IOrderDto {
  orderId: number;
  userId: number;
  userNumber: number;
  bookedData: string;
  finished: boolean;
  canceled: boolean;
  booked: boolean;
  tableId: number;
  chairId: number;
  seatingType: TOrderSeatingType;
  foods: IProductDto[];
}
