import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-full-view-product',
  templateUrl: './full-view-product.component.html',
  styleUrls: ['./full-view-product.component.scss']
})
export class FullViewProductComponent implements OnInit {

  productId !:number;
  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.productId = params['id']; // Zamenite 'paramName' sa stvarnim imenom parametra
      // console.log(paramName); // Ovde možete raditi sa vrednošću parametra
    });
  }

}
