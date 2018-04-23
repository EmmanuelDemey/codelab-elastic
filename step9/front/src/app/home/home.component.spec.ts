import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { HomeComponent } from './home.component';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { CustomerService } from '../services/customer.service';

const testProducts = [
  new Product('', '', '', 0, 0),
  new Product('', '', '', 0, 0)
];
const welcomeMsg = 'test';

class ProductServiceMock {
  getProducts() {
    return Observable.of(testProducts);
  }
  isAvailable() {
    return true;
  }
  decreaseStock() {}
}

class CustomerServiceMock {
  getBasket() {
    return Observable.of();
  }
  getTotal() {
    return 42;
  }
  addProduct() {}
}

@Pipe({name: 'sort'})
class SortPipe implements PipeTransform {
  transform(value) { return value; }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        SortPipe
      ],
      imports: [RouterTestingModule],
      providers: [
        {provide: ProductService, useClass: ProductServiceMock},
        {provide: CustomerService, useClass: CustomerServiceMock},
        {provide: 'welcomeMsg', useValue: welcomeMsg}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title bound in the header',
    inject([CustomerService], (customerService: CustomerService) => {
      const compiled = fixture.debugElement.nativeElement;

      fixture.detectChanges();
      expect(compiled.querySelector('header').textContent).toContain(welcomeMsg);
    })
  );

  it('should have the total bound in the header',
    inject([CustomerService], (customerService: CustomerService) => {
      const app = fixture.debugElement.componentInstance;
      const compiled = fixture.debugElement.nativeElement;

      fixture.detectChanges();
      expect(compiled.querySelector('header').textContent).toContain(customerService.getTotal());
    })
  );

  it('should bind each product component with its product', () => {
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();
    const products = compiled.querySelectorAll('app-product');
    products.forEach((product, i) => {
      expect(product.data).toBe(app.products[i]);
    });
  });

  it('should call addProduct and decreaseStock when updatePrice',
    inject([ProductService, CustomerService], (productService: ProductService, customerService: CustomerService) => {
      const app = fixture.debugElement.componentInstance;
      const product = testProducts[0];

      spyOn(customerService, 'addProduct').and.returnValue(Observable.of(product));
      spyOn(productService, 'decreaseStock');

      app.updatePrice(product);
      expect(customerService.addProduct).toHaveBeenCalledWith(product);
      expect(productService.decreaseStock).toHaveBeenCalledWith(product);
    })
  );

  it('should not display product which is not available',
    inject([ProductService], (productService: ProductService) => {
      const app = fixture.debugElement.componentInstance;
      const compiled = fixture.debugElement.nativeElement;

      spyOn(productService, 'isAvailable').and.callFake(product => {
        if (product === testProducts[0]) {
          return false;
        }
        return true;
      });

      fixture.detectChanges();
      const products = compiled.querySelectorAll('app-product');
      expect(products.length).toBe(1);
      expect(products[0].data).toBe(app.products[1]);
    })
  );
});
