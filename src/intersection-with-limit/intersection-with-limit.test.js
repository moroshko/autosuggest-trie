import { expect } from 'chai';
import intersectionWithLimit from './intersection-with-limit';

describe('intersectionWithLimit', () => {
  describe('when limit is not specified', () => {
    it('should return [] if one of the arrays is empty', () => {
      expect(intersectionWithLimit([
        [6, 1, 3, 2, 4],
        [],
        [99, 3, 11]
      ])).to.be.empty;
    });

    it('should return [] if intersection is empty', () => {
      expect(intersectionWithLimit([
        [16, 1, 125, 3, 4],
        [100, 2, 5, 189, 6, 16, 0],
        [189, 0, 3, 125, 4, 6]
      ])).to.be.empty;
    });

    it('should return the array if only one array is given', () => {
      expect(intersectionWithLimit([
        [16, 1, 4, 3, 125]
      ])).to.deep.equal([16, 1, 4, 3, 125]);
    });

    it('should return the intersection', () => {
      expect(intersectionWithLimit([
        [6, 7, 200, 15, 123, 135, 0, 204, 14],
        [124, 0, 200, 1, 4, 5, 6, 123, 14],
        [13, 14, 5, 12, 128, 10, 17, 11, 0, 200, 16, 6, 123, 198, 201, 15, 199],
        [6, 14, 111, 112, 0, 167, 123, 200, 189],
        [123, 908, 6, 900, 200, 15, 129, 1, 14, 903, 0, 7],
        [100, 0, 11, 12, 13, 178, 99, 124, 122, 123, 6, 14, 145, 200]
      ])).to.deep.equal([6, 200, 123, 0, 14]);
    });
  });

  describe('when limit is specified', () => {
    it('should return [] if one of the arrays is empty', () => {
      expect(intersectionWithLimit([
        [4, 1, 3],
        [],
        [0, 11, 3, 4, 7]
      ], 2)).to.be.empty;
    });

    it('should return [] if intersection is empty', () => {
      expect(intersectionWithLimit([
        [125, 1, 3, 4, 16],
        [0, 2, 189, 5, 6, 16, 100],
        [3, 4, 6, 125, 189, 0]
      ], 3)).to.be.empty;
    });

    it('should return the start of the array single array is given', () => {
      expect(intersectionWithLimit([
        [125, 88, 9, 3, 17, 2]
      ], 3)).to.deep.equal([125, 88, 9]);
    });

    it('should return the start of the intersection', () => {
      expect(intersectionWithLimit([
        [6, 7, 200, 15, 123, 135, 0, 204, 14],
        [124, 0, 200, 1, 4, 5, 6, 123, 14],
        [13, 14, 5, 12, 128, 10, 17, 11, 0, 200, 16, 6, 123, 198, 201, 15, 199],
        [6, 14, 111, 112, 0, 167, 123, 200, 189],
        [123, 908, 6, 900, 200, 15, 129, 1, 14, 903, 0, 7],
        [100, 0, 11, 12, 13, 178, 99, 124, 122, 123, 6, 14, 145, 200]
      ], 4)).to.deep.equal([6, 200, 123, 0]);
    });

    it('should return the intersection, if limit is big enough', () => {
      expect(intersectionWithLimit([
        [6, 7, 200, 15, 123, 135, 0, 204, 14],
        [124, 0, 200, 1, 4, 5, 6, 123, 14],
        [13, 14, 5, 12, 128, 10, 17, 11, 0, 200, 16, 6, 123, 198, 201, 15, 199],
        [6, 14, 111, 112, 0, 167, 123, 200, 189],
        [123, 908, 6, 900, 200, 15, 129, 1, 14, 903, 0, 7],
        [100, 0, 11, 12, 13, 178, 99, 124, 122, 123, 6, 14, 145, 200]
      ], 10)).to.deep.equal([6, 200, 123, 0, 14]);
    });
  });
});
