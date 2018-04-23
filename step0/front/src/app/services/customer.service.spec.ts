import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';
import { Product } from '../model/product';

const product1 = new Product('', '', '', 42, 0);
const product2 = new Product('', '', '', 666, 0);

describe('CustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CustomerService,
      ]
    });
  });

  it('should be created with no product',
    inject([CustomerService], (service: CustomerService) => {
      expect(service).toBeTruthy();
      expect(service.products.length).toBe(0);
    })
  );

  it('should load the basket from the server on getBasket',
    inject([CustomerService, HttpTestingController], (service: CustomerService, http: HttpTestingController) => {
      const mockedResponse = [
        new Product('abc', '', '', 0, 0),
        new Product('def', '', '', 0, 0)
      ];
      service.getBasket().subscribe(() => {
        expect(service.products.length).toBe(2);
      });
      http.expectOne('http://localhost:8080/rest/basket').flush(mockedResponse);
    })
  );

  it('should add products to the list when using addProduct',
    inject([CustomerService, HttpTestingController], (service: CustomerService, http: HttpTestingController) => {
      service.addProduct(product1).subscribe(() => {
        expect(service.products).toEqual([product1]);
      });
      http.expectOne('http://localhost:8080/rest/basket').flush({});
    })
  );

  it('should calculate the total price when using getTotal',
    inject([CustomerService], (service: CustomerService) => {
      service.products = [product1, product2];
      expect(service.getTotal()).toBe(product1.price + product2.price);
    })
  );

});
