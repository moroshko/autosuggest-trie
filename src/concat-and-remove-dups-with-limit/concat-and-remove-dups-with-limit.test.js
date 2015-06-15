'use strict';

import { expect } from 'chai';
import concatAndRemoveDupsWithLimit from './concat-and-remove-dups-with-limit';

describe('concatAndRemoveDupsWithLimit()', () => {
  describe('concatenation', () => {
    it('should concatenate arrays', () => {
      expect(concatAndRemoveDupsWithLimit([1, 4], [3, 2, 8]))
        .to.deep.equal([1, 4, 3, 2, 8]);
    });

    it('should handle empty arrays', () => {
      expect(concatAndRemoveDupsWithLimit([], []))
        .to.deep.equal([]);

      expect(concatAndRemoveDupsWithLimit([1, 4], []))
        .to.deep.equal([1, 4]);

      expect(concatAndRemoveDupsWithLimit([], [3, 2, 8]))
        .to.deep.equal([3, 2, 8]);
    });
  });

  describe('dups removal', () => {
    it('should remove one duplicate', () => {
      expect(concatAndRemoveDupsWithLimit([1, 5, 2], [5, 8, 9]))
        .to.deep.equal([1, 5, 2, 8, 9]);
    });

    it('should remove multiple duplicates', () => {
      expect(concatAndRemoveDupsWithLimit([1, 4, 5, 2, 8], [2, 9, 1, 8, 7]))
        .to.deep.equal([1, 4, 5, 2, 8, 9, 7]);
    });
  });

  describe('limit', () => {
    it('should return the first `limit` items in the concatenation', () => {
      expect(concatAndRemoveDupsWithLimit([1, 4, 5, 2, 8], [2, 9, 1, 8, 7], 10))
        .to.deep.equal([1, 4, 5, 2, 8, 9, 7]);

      expect(concatAndRemoveDupsWithLimit([1, 4, 5, 2, 8], [2, 9, 1, 8, 7], 3))
        .to.deep.equal([1, 4, 5]);
    });
  });
});
