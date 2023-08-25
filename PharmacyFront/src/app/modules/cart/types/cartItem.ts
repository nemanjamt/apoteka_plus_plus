import { Product } from "../../products/types/product";

export interface CartItem{
    product:Product,
    quantity:number
}