import { OrderItem } from "./orderItem";

export interface Order{
    id:number,
    delivery:boolean,
    deliverer_id:number | null,
    order_status: string,
    created_at:string,
    finished_at: String | null,
    note: string,
    address: string | null,
    items: OrderItem[]

};