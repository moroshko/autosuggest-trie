'use strict';

import { expect } from 'chai';
import concatAndRemoveDups from './concat-and-remove-dups';

describe('concatAndRemoveDups()', () => {
  describe('concatenation', () => {
    it('should concatenate arrays', () => {
      expect(concatAndRemoveDups([1, 4], [3, 2, 8]))
        .to.deep.equal([1, 4, 3, 2, 8]);
    });

    it('should handle empty arrays', () => {
      expect(concatAndRemoveDups([], []))
        .to.deep.equal([]);

      expect(concatAndRemoveDups([1, 4], []))
        .to.deep.equal([1, 4]);

      expect(concatAndRemoveDups([], [3, 2, 8]))
        .to.deep.equal([3, 2, 8]);
    });
  });

  describe('dups removal', () => {
    it('should remove one duplicate', () => {
      expect(concatAndRemoveDups([1, 5, 2], [5, 8, 9]))
        .to.deep.equal([1, 5, 2, 8, 9]);
    });

    it('should remove multiple duplicates', () => {
      expect(concatAndRemoveDups([1, 4, 5, 2, 8], [2, 9, 1, 8, 7]))
        .to.deep.equal([1, 4, 5, 2, 8, 9, 7]);
    });
  });
});
