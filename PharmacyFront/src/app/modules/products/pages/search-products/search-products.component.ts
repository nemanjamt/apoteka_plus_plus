import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss'],
})
export class SearchProductsComponent implements OnInit {
  products: Product[] = [];
  form: FormGroup;
  isExpanded = false;
  minPrice!: number;
  maxPrice!: number;
  showAvailable: boolean = false;
  sortBy: string = '';
  orderBy: string = '';
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.form = this.fb.group({
      searchValue: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    // this.addFilter();
  }

  sortAndOrder(sort: string, order: string) {
    this.sortBy = sort;
    this.orderBy = order;
  }

  toggleFilter() {
    this.isExpanded = !this.isExpanded;
  }

  clickOnSearch() {
    this.productService.search(this.form.value.searchValue).subscribe({
      next: (res) => {
        // this.products = res.body["data"] as Product[];

        this.products = res.data;
        // this.addFilter();
        // this.products = res ;
      },
      error: (err) => {
        console.log(err);
        console.log('Neuspjesno');
      },
    });
  }
}
