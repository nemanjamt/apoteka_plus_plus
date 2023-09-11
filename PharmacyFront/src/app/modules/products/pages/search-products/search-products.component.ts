import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss'],
})
export class SearchProductsComponent implements OnInit {
  products : Product[] = [];
  form: FormGroup;
  isExpanded = false;
  isSortExpanded = false;
  minPrice!: number;
  maxPrice!: number;
  showJustAvailable: boolean = false;
  sortBy: string = '';
  orderBy: string = '';
  selectedValue : string = "";
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.form = this.fb.group({
      searchValue: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // this.addFilter();
  }

  onSelectChange(){
    if(this.selectedValue === "1"){
      this.sortBy="price";
      this.orderBy = "asc";
    }else if(this.selectedValue === "2"){
      this.sortBy="price";
      this.orderBy = "desc";
    }else if(this.selectedValue === "3"){
      this.sortBy="name";
      this.orderBy = "asc";
    }else{
      this.sortBy="name";
      this.orderBy = "desc";
    }
    this.doFilterAndSort();
  }
  
  onSearchChange(){
    this.products = [];
  }

  toggleFilter() {
    this.isExpanded = !this.isExpanded;
  }
  toggleSort(){
    this.isSortExpanded = !this.isSortExpanded;
  }

  clickOnSearch() {
    let params = new HttpParams().set("product_name",this.form.value.searchValue );
    this.productService.search(params).subscribe({
      next: (res) => {
        // this.products = res.body["data"] as Product[];
        console.log(res.body?.data);
        this.products = res.body?.data as Product[];
        // this.products = res.data;
        // this.addFilter();
        // this.products = res ;
      },
      error: (err) => {
        console.log(err);
        console.log('Neuspjesno');
      },
    });
  }

  doFilterAndSort(){
    let params = new HttpParams().set("product_name", this.form.value.searchValue);
    if(this.sortBy !== ''){
      params = params.set("sort_by", this.sortBy);
    }
    if(this.orderBy !== ''){
      params = params.set("order", this.orderBy);
    }
    if(this.minPrice){
      params = params.set("min_price", this.minPrice)
    }
    if(this.maxPrice){
      params = params.set("max_price", this.maxPrice);
    }
    if(this.showJustAvailable){
      params = params.set("is_available", this.showJustAvailable);
    }
    this.productService.search(params).subscribe({
      next: (res) =>{this.products = res.body?.data as Product[];},
      error: (err) =>{}
    })
  }
}
