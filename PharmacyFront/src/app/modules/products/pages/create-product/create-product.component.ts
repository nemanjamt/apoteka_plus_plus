import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private productService: ProductService) { 
    
    this.form = this.fb.group({
      productName:["", [Validators.required, Validators.minLength(2)] ],
      price:["", [Validators.required,Validators.min(1) ,Validators.minLength(2)] ],
      description:["", [ ] ],
      
    });
  }
  selectedImage: File | undefined; // Selektovana slika
  base64Image: string | undefined = ""
  ngOnInit(): void {
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

  onCreateProduct(){
    let product = {
      name: this.form.value.productName,
      price: this.form.value.price,
      description: this.form.value.description,
      image: this.base64Image
    };
    this.productService.createProduct(product).subscribe({
      next:(res)=>{ console.log(res.data);
        const succesfullyAdded = document.querySelector("#succesfully-added") as Element;         
          succesfullyAdded.classList.remove("invisible");
          succesfullyAdded.classList.add("visible");
          setTimeout(() => {
            succesfullyAdded.classList.remove("visible");
            succesfullyAdded.classList.add("invisible");
          }, 2000);
      
      },
      error:(err)=>{}
    })
  }

}
