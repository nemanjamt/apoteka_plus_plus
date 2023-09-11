export interface ReviewProduct{
    id:number,
    user_id:number,
    comment:string,
    mark:number,
    reported:boolean,
    first_name: string,
    last_name:string,
    product_id:number
}

export interface BasicReviewProduct{
    id:number,
    user_id:number,
    comment:string,
    mark:number,
    reported:boolean,
    deleted:boolean
}

export interface BasicReviewDeliverer{
    id:number,
    user_id:number,
    comment:string,
    deliverer_id:number,
    order_id:number,
    mark:number,
    reported:boolean,
    deleted:boolean
}

export interface ReviewDeliverer{
    id:number,
    user_id:number,
    deliverer_id:number,
    comment:string,
    order_id:number,
    mark:number,
    reported:boolean,
    deleted:boolean,
    first_name:string,
    last_name:string
}