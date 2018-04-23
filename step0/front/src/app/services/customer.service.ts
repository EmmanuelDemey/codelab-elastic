import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import { Product } from "../model/product";
import { Customer } from "../model/customer";

@Injectable()
export class CustomerService {
  private API_URL = "http://localhost:8080/rest/";

  products: Product[] = new Array<Product>();

  constructor(private http: HttpClient) {}

  getBasket(): Observable<Product[]> {
    return this.http
      .get(this.API_URL + "basket")
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
      .do(products => (this.products = products));
  }

  addProduct(product: Product): Observable<any> {
    return this.http
      .post(this.API_URL + "basket", product)
      .do(() => this.products.push(product));
  }

  getTotal(): number {
    return this.products.reduce((previous, next) => previous + next.price, 0);
  }

  checkout(customer: Customer): Observable<any> {
    return this.http.post(this.API_URL + "basket/confirm", customer);
  }
}
