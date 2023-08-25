import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../types/cartItem';
import { ProductService } from 'src/app/modules/products/services/product.service';
import { Product } from 'src/app/modules/products/types/product';
import { OrdersService } from 'src/app/modules/orders/services/orders.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-cart-full-view',
  templateUrl: './cart-full-view.component.html',
  styleUrls: ['./cart-full-view.component.scss']
})
export class CartFullViewComponent implements OnInit {

  cartItems :CartItem[] = [];
  isValid: boolean = false;
  note :string = "";
  delivery:boolean = false;
  address:string = "";
  isDeliveringValid = true;
  constructor(private productService: ProductService, private orderService: OrdersService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadCartItem();
  }

  onQuantityChange(value:any, cartItem: CartItem){
    if(value >= 1){
      cartItem.quantity = value;
      this.productService.setInCart(cartItem.product.id, value);
      this.isValid = this.cartItems.every(item => item.quantity > 0);
    }else{
      this.isValid = false;
    }
  }
  preventNegativeInput(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'e') {
      event.preventDefault();
    }
  }
  getTotalPrice(){
    let total = 0;
    for(let cartItem of this.cartItems){
      total += (cartItem.product.price*cartItem.quantity);
    }
    return total;
  }
  deleteCartItem(cartItemProductId:number){
    this.cartItems = this.cartItems.filter(item => item.product.id !== cartItemProductId );
    this.productService.removeFromCart(cartItemProductId);
    this.isValid = this.cartItems.every(item => item.quantity > 0);

  }
  loadCartItem(){
    let productIds = JSON.parse(sessionStorage.getItem("productIds") as string);
    if(!productIds){
      return;
    }
    const frequencyMap = new Map<string, number>();

    for (const num  of productIds) {
      if (frequencyMap.has(num)) {
        frequencyMap.set(num, frequencyMap.get(num)! + 1);
      } else {
        frequencyMap.set(num, 1);
      }
    }

    frequencyMap.forEach((value, key)=>{
      console.log(value, key);
      this.productService.findProductById(key).subscribe({
        next: (res)=>{
          let product:Product = res.data;
          let cartItem:CartItem = {
            product:product,
            quantity:value
          };
          this.cartItems.push(cartItem);
          this.isValid = this.cartItems.every(item => item.quantity > 0);
        },
        error: (err)=>{

        }
      });
    });
  }

  onDeliveryChange(){
    if(this.delivery && this.address.length < 3 ){
      this.isDeliveringValid = false;
    }else{
      this.isDeliveringValid = true;
    }
  }
  
  createOrder(){
    let orderItems = [];
    for (let cartItem of this.cartItems){
      orderItems.push({
        quantity: cartItem.quantity,
        product_id: cartItem.product.id,
        price:cartItem.product.price
      });
    }
    let requestObject = {
      user_id:this.authService.getCurrentlyLoggedId(),
      deliverer_id:null,
      delivery:this.delivery,
      address:this.address,
      note:this.note,
      items: orderItems
    };
    this.orderService.createOrder(requestObject).subscribe({
      next: (res)=>{},
      error: (err)=>{}
    });
  }
}
