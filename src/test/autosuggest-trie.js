'use strict';

import { expect } from 'chai';
import trie from '../autosuggest-trie';

const locations = [{
  location: 'East Richmond 1234 VIC'
}, {
  location: 'East Eagle 1235 VIC'
}, {
  location: 'Richmond West 5678 VIC'
}, {
  location: 'Cheltenham 3192 Melbourne VIC'
}];

describe('trie', function() {
  beforeEach(function() {
    trie.init(locations, 'location');
  });

  describe('single word query', function() {
    it('should find all exact matches', function() {
      expect(trie.getMatches('Richmond')).to.deep.equal([
        { location: 'East Richmond 1234 VIC' },
        { location: 'Richmond West 5678 VIC' }
      ]);
    });

    it('should find all partial matches', function() {
      expect(trie.getMatches('V')).to.deep.equal([
        { location: 'East Richmond 1234 VIC' },
        { location: 'East Eagle 1235 VIC' },
        { location: 'Richmond West 5678 VIC' },
        { location: 'Cheltenham 3192 Melbourne VIC' }
      ]);
    });

    it('should ignore case', function() {
      expect(trie.getMatches('we')).to.deep.equal([
        { location: 'Richmond West 5678 VIC' }
      ]);
    });

    it('should ignore white spaces in the beginning and end', function() {
      expect(trie.getMatches('  5\t ')).to.deep.equal([
        { location: 'Richmond West 5678 VIC' }
      ]);
    });

    it('should return no results if query is empty', function() {
      expect(trie.getMatches('')).to.deep.equal([]);
    });

    it('should return no results if query is not found', function() {
      expect(trie.getMatches('Richmonda')).to.deep.equal([]);
      expect(trie.getMatches('x')).to.deep.equal([]);
      expect(trie.getMatches('8')).to.deep.equal([]);
    });
  });

  describe('multiple words query', function() {
    it('should find all exact matches', function() {
      expect(trie.getMatches('east richmond')).to.deep.equal([
        { location: 'East Richmond 1234 VIC' }
      ]);
    });

    it('should find all partial matches', function() {
      expect(trie.getMatches('r v')).to.deep.equal([
        { location: 'East Richmond 1234 VIC' },
        { location: 'Richmond West 5678 VIC' }
      ]);
    });

    it('should find all matches regardless of order', function() {
      expect(trie.getMatches('VI r')).to.deep.equal([
        { location: 'East Richmond 1234 VIC' },
        { location: 'Richmond West 5678 VIC' }
      ]);
    });

    // (Misha) Ideally, this test should pass!
    //
    // it('should work with duplicate words in the query', function() {
    //   expect(trie.getMatches('e e')).to.deep.equal([
    //     { location: 'East Eagle 1235 VIC' }
    //   ]);
    // });

    it('should return no results if not all the words are found', function() {
      expect(trie.getMatches('East X')).to.deep.equal([]);
      expect(trie.getMatches('r w 5 x')).to.deep.equal([]);
    });
  });
});
