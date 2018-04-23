import { SortPipe } from './sort.pipe';

import { Product } from '../model/product';

describe('SortPipe', () => {
  it('create an instance', () => {
    const pipe = new SortPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if the value is not defined', () => {
    const pipe = new SortPipe();
    expect(pipe.transform(undefined, 'title')).toEqual([]);
  });

  it('should sort objects by property in argument', () => {
    const pipe = new SortPipe();
    const data = [
      new Product('zyxw', '', '', 0, 0),
      new Product('1234', '', '', 0, 0),
      new Product('abcd', '', '', 0, 0)
    ];
    const expected = [
      new Product('1234', '', '', 0, 0),
      new Product('abcd', '', '', 0, 0),
      new Product('zyxw', '', '', 0, 0)
    ];
    expect(pipe.transform(data, 'title')).toEqual(expected);
  });
});
