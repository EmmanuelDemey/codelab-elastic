import { Injectable } from "@angular/core";
import { UpperCasePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import { Product } from "../model/product";

@Injectable()
export class ProductService {
  private API_URL = "http://localhost:8080/rest/";

  private products: Product[];

  constructor(private uppercase: UpperCasePipe, private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get(this.API_URL + "products")
      .map((products: any[]) => {
        return products.map(product => {
          return new Product(
            product.title,
            product.description,
            product.photo,
            product.price,
            product.stock
          );
        });
      })
      .map(products => {
        return products.map(product => {
          product.title = this.uppercase.transform(product.title);
          return product;
        });
      });
  }

  isTheLast(product: Product): boolean {
    return product.stock === 1;
  }

  isAvailable(product: Product): boolean {
    return product.stock !== 0;
  }

  decreaseStock(product: Product) {
    product.stock -= 1;
  }
}
