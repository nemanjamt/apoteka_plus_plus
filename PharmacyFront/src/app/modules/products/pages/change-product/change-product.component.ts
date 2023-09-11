import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-product',
  templateUrl: './change-product.component.html',
  styleUrls: ['./change-product.component.scss']
})
export class ChangeProductComponent implements OnInit {

  selectedImage: File | undefined; // Selektovana slika
  base64Image: string | undefined = ""
  form: FormGroup;
  productId!:number;
  currentImage:string = '';
  constructor(private fb: FormBuilder, private productService: ProductService, private router: ActivatedRoute, private r: Router) { 
    
    this.form = this.fb.group({
      productName:["", [Validators.required, Validators.minLength(2)] ],
      price:["", [Validators.required,Validators.min(1) ,Validators.max(1000000),Validators.minLength(2)] ],
      description:["", [ ] ],
      available:[true,[Validators.required]]
      
    });
  }
  
  
  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.productId = params['id']; // Zamenite 'paramName' sa stvarnim imenom parametra
      this.productService.findProductById(this.productId).subscribe({
        next: (res)=>{this.form.setValue({
          productName: res.data.name,
          price: res.data.price,
          description: res.data.description,
          available: res.data.available
        });
        this.currentImage = res.data.image;
      },
        error: (err)=>{}
      });
    });
  }
  

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.base64Image = event.target.result.split(',')[1];
        console.log('Base64 Image:', this.base64Image);
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onChangeProduct(){
    let product = {
      name: this.form.value.productName,
      price: this.form.value.price,
      description: this.form.value.description,
      available: this.form.value.available,
      image: this.base64Image
    };
    this.productService.changeProduct(this.productId, product).subscribe({
      next:(res)=>{ this.r.navigate(['/full-view-product'], { queryParams: { id: res.data.id } });},
      error:(err)=>{}
    })
  }

}
