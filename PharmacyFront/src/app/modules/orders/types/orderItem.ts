export interface OrderItem{
    id:number,
    name:string,
    quantity:number,
    product_id:number,
    price:number
}

export interface ChangeOrderItem{
    id:number,
    quantity:number
}