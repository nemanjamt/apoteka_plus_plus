import { LoadedOrderItem } from "./loaded-order-item"


export interface OrderWithLoadedItems{
    id:number,
    delivery:boolean,
    deliverer_id:number | null,
    order_status: string,
    created_at:string,
    finished_at: String | null,
    note: string,
    address: string | null,
    user_id:number,
    items: LoadedOrderItem[]

};