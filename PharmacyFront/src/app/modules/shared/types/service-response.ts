export interface ServiceResponse<T>{
    data: T ,
    message: string, 
    status_code:number,
    success:boolean
}