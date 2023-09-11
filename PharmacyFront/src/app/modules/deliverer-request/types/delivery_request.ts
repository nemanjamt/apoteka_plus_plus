export interface DeliveryRequest{
    id:number,
    deliverer_id:number,
    order_id:number
}

export interface DeliveryRequestInfo{
    id:number,
    deliverer_id:number,
    order_id:number,
    address:String
}