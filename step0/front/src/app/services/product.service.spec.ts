import { TestBed, inject } from '@angular/core/testing';
import { UpperCasePipe } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { Product } from '../model/product';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        UpperCasePipe,
      ]
    });
  });

  it('should be created with 4 products',
    inject([ProductService, HttpTestingController], (service: ProductService, http: HttpTestingController) => {
      const mockedResponse = [
        new Product('abc', '', '', 0, 0),
        new Product('def', '', '', 0, 0)
      ];
      service.getProducts().subscribe(products => {
        expect(products.length).toBe(2);
        products.forEach(product => {
          expect(product.title).toBe(product.title.toUpperCase());
        });
      });
      http.expectOne('http://localhost:8080/rest/products').flush(mockedResponse);
    })
  );

  it('should isTheLast return true only if stock is 1',
    inject([ProductService], (service: ProductService) => {
      const product = new Product('', '', '', 0, 0);
      expect(service.isTheLast(product)).toBe(false);
      product.stock = 1;
      expect(service.isTheLast(product)).toBe(true);
      product.stock = 2;
      expect(service.isTheLast(product)).toBe(false);
      product.stock = 100;
      expect(service.isTheLast(product)).toBe(false);
    })
  );

  it('should isAvailable return false only if stock is 0',
    inject([ProductService], (service: ProductService) => {
      const product = new Product('', '', '', 0, 0);
      expect(service.isAvailable(product)).toBe(false);
      product.stock = 1;
      expect(service.isAvailable(product)).toBe(true);
      product.stock = 2;
      expect(service.isAvailable(product)).toBe(true);
      product.stock = 100;
      expect(service.isAvailable(product)).toBe(true);
    })
  );

  it('should decreaseStock decrease product stock of 1',
    inject([ProductService], (service: ProductService) => {
      const product = new Product('', '', '', 0, 42);
      service.decreaseStock(product);
      expect(product.stock).toBe(42 - 1);
    })
  );
});
