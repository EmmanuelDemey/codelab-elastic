import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../model/product';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Product[] = [], column: string): Product[] {
    return value.sort((p1, p2) => {
      if (p1[column] > p2[column]) {
        return 1;
      } else {
        if (p1[column] < p2[column]) {
          return -1;
        }
      }
      return 0;
    });
  }

}
