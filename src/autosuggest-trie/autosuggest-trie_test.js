'use strict';

import { expect } from 'chai';
import autosuggestTrie from './autosuggest-trie';

const locations = [{
  location: 'East Richmond 1234 VIC'
}, {
  location: 'East Eagle 1235 VIC'
}, {
  location: 'Richmond West 5678 VIC'
}, {
  location: 'Cheltenham 3192 Melbourne VIC'
}];
const trie = autosuggestTrie.create(locations, 'location');

describe('trie', () => {
  describe('single word query', () => {
    it('should find all exact matches', () => {
      expect(trie.getMatches('Richmond')).to.deep.equal([
        { location: 'East Richmond 1234 VIC' },
        { location: 'Richmond West 5678 VIC' }
      ]);
    });

    it('should find all partial matches', () => {
      expect(trie.getMatches('V')).to.deep.equal([
        { location: 'East Richmond 1234 VIC' },
        { location: 'East Eagle 1235 VIC' },
        { location: 'Richmond West 5678 VIC' },
        { location: 'Cheltenham 3192 Melbourne VIC' }
      ]);
    });

    it('should limit number of matches', () => {
      expect(trie.getMatches('V', 3)).to.deep.equal([
        { location: 'East Richmond 1234 VIC' },
        { location: 'East Eagle 1235 VIC' },
        { location: 'Richmond West 5678 VIC' }
      ]);
    });

    it('should ignore case', () => {
      expect(trie.getMatches('we')).to.deep.equal([
        { location: 'Richmond West 5678 VIC' }
      ]);
    });

    it('should ignore white spaces in the beginning and end', () => {
      expect(trie.getMatches('  5\t ')).to.deep.equal([
        { location: 'Richmond West 5678 VIC' }
      ]);
    });

    it('should return no results if query is empty', () => {
      expect(trie.getMatches('')).to.deep.equal([]);
    });

    it('should return no results if query is not found', () => {
      expect(trie.getMatches('Richmonda')).to.deep.equal([]);
      expect(trie.getMatches('x')).to.deep.equal([]);
      expect(trie.getMatches('8')).to.deep.equal([]);
    });
  });

  describe('multiple words query', () => {
    it('should find all exact matches', () => {
      expect(trie.getMatches('east richmond')).to.deep.equal([
        { location: 'East Richmond 1234 VIC' }
      ]);
    });

    it('should find all partial matches', () => {
      expect(trie.getMatches('r v')).to.deep.equal([
        { location: 'East Richmond 1234 VIC' },
        { location: 'Richmond West 5678 VIC' }
      ]);
    });

    it('should limit number of matches', () => {
      expect(trie.getMatches('r v', 1)).to.deep.equal([
        { location: 'East Richmond 1234 VIC' }
      ]);
    });

    it('should find all matches regardless of order', () => {
      expect(trie.getMatches('VI r')).to.deep.equal([
        { location: 'East Richmond 1234 VIC' },
        { location: 'Richmond West 5678 VIC' }
      ]);
    });

    it('should return no results if not all the words are found', () => {
      expect(trie.getMatches('East X')).to.deep.equal([]);
      expect(trie.getMatches('r w 5 x')).to.deep.equal([]);
    });
  });
});
