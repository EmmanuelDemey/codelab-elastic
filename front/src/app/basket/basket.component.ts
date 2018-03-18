import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Product } from '../model/product';
import { Customer } from '../model/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basket: Product[];
  customer: Customer;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.customerService.getBasket().subscribe(products => this.basket = products);
    this.customer = new Customer();
  }

  checkout() {
    this.customerService.checkout(this.customer).subscribe(() => this.router.navigate(['']));
  }
}
