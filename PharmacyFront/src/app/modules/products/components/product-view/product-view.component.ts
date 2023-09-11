import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { ProductService } from '../../services/product.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {



  @Input()
  productId!: number;
  product!:Product;
  form:FormGroup;
  productAdded ?: boolean;
  modalRef!:NgbModalRef;
  constructor(private productService: ProductService, public authService:AuthService, private router: Router,
    private modalService:NgbModal, private fb: FormBuilder) { 
    this.form = fb.group({
      quantity : [1, [Validators.required, Validators.min(1), Validators.max(10000)]]
    });
  }

  
  ngOnInit(): void {
    this.get_product();
  }

  get_product(){
    if(!this.productId){
      return;
    }
    this.productService.findProductById(this.productId).subscribe({
      next: (res) =>{
        this.product = res.data;
      },
      error: (err) =>{

      }
    })
  }

  openModal(targetModal:any) {
    this.modalRef = this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    });  
}

  onEdit(){
    this.router.navigate(['/edit-product'], { queryParams: { id: this.productId } });
  }
  onRemove(){
    this.productService.deleteProduct(this.productId).subscribe({
      next: (res)=>{this.router.navigate(['']); this.modalRef.close();},
      error: (err)=>{}
    })
  }

  addInCart(){
    this.productService.addInCartWithQuantity(this.productId, this.form.value.quantity);
    
    this.productAdded = true;
    setTimeout(() => {
      this.productAdded = undefined;
    }, 1200);
  }

}
