import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Output()
  addToBasket = new EventEmitter<Product>();

  @Input()
  data: Product;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() {}

  addToBasketClick() {
    this.addToBasket.emit(this.data);
  }

  isTheLast() {
    return this.productService.isTheLast(this.data);
  }

}
