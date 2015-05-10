'use strict';

import { expect } from 'chai';
import intersection from './intersection';

describe('intersection', () => {
  describe('without limit', () => {
    it('should return [] if one of the arrays is empty', () => {
      expect(intersection([
        [1, 3, 4],
        [],
        [0, 3, 4, 7, 11]
      ])).to.be.empty;
    });

    it('should return [] if intersection is empty', () => {
      expect(intersection([
        [1, 3, 4, 16, 125],
        [0, 2, 5, 6, 16, 100, 189],
        [0, 3, 4, 6, 125, 189]
      ])).to.be.empty;
    });

    it('should return the array if only one array is given', () => {
      expect(intersection([
        [1, 3, 4, 16, 125]
      ])).to.deep.equal([1, 3, 4, 16, 125]);
    });

    it('should return the intersection', () => {
      expect(intersection([
        [0, 6, 7, 14, 15, 123, 135, 200, 204],
        [0, 1, 4, 5, 6, 14, 123, 124, 200],
        [0, 5, 6, 10, 11, 12, 13, 14, 15, 16, 17, 123, 128, 198, 199, 200, 201],
        [0, 6, 14, 111, 112, 123, 167, 189, 200],
        [0, 1, 6, 7, 14, 15, 123, 129, 200, 900, 903, 908],
        [0, 6, 11, 12, 13, 14, 99, 100, 122, 123, 124, 145, 178, 200]
      ])).to.deep.equal([0, 6, 14, 123, 200]);
    });
  });

  describe('with limit', () => {
    it('should return [] if one of the arrays is empty', () => {
      expect(intersection([
        [1, 3, 4],
        [],
        [0, 3, 4, 7, 11]
      ], 2)).to.be.empty;
    });

    it('should return [] if intersection is empty', () => {
      expect(intersection([
        [1, 3, 4, 16, 125],
        [0, 2, 5, 6, 16, 100, 189],
        [0, 3, 4, 6, 125, 189]
      ], 3)).to.be.empty;
    });

    it('should return the start of the array single array is given', () => {
      expect(intersection([
        [1, 3, 4, 16, 125]
      ], 3)).to.deep.equal([1, 3, 4]);
    });

    it('should return the start of the intersection', () => {
      expect(intersection([
        [0, 6, 7, 14, 15, 123, 135, 200, 204],
        [0, 1, 4, 5, 6, 14, 123, 124, 200],
        [0, 5, 6, 10, 11, 12, 13, 14, 15, 16, 17, 123, 128, 198, 199, 200, 201],
        [0, 6, 14, 111, 112, 123, 167, 189, 200],
        [0, 1, 6, 7, 14, 15, 123, 129, 200, 900, 903, 908],
        [0, 6, 11, 12, 13, 14, 99, 100, 122, 123, 124, 145, 178, 200]
      ], 4)).to.deep.equal([0, 6, 14, 123]);
    });

    it('should return the intersection, if limit is big enough', () => {
      expect(intersection([
        [0, 6, 7, 14, 15, 123, 135, 200, 204],
        [0, 1, 4, 5, 6, 14, 123, 124, 200],
        [0, 5, 6, 10, 11, 12, 13, 14, 15, 16, 17, 123, 128, 198, 199, 200, 201],
        [0, 6, 14, 111, 112, 123, 167, 189, 200],
        [0, 1, 6, 7, 14, 15, 123, 129, 200, 900, 903, 908],
        [0, 6, 11, 12, 13, 14, 99, 100, 122, 123, 124, 145, 178, 200]
      ], 10)).to.deep.equal([0, 6, 14, 123, 200]);
    });
  });
});
