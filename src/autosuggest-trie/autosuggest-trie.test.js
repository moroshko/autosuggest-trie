'use strict';

import { expect } from 'chai';
import autosuggestTrie from './autosuggest-trie';

const locations = [{
  id: 0,
  location: 'East Richmond 1234 VIC',
  population: 10000
}, {
  id: 1,
  location: 'East Eagle 1235 VIC',
  population: 5000
}, {
  id: 2,
  location: 'Richmond West 5678 VIC',
  population: 4000
}, {
  id: 3,
  location: 'Cheltenham 3192 Melbourne VIC',
  population: 7000
}, {
  id: 4,
  location: 'Richmond 6776 VIC',
  population: 3000
}];

function locationsComparator(location1, location2) {
  return location1.location < location2.location ? -1 : 1;
}

const trie = autosuggestTrie.create(locations, 'location', locationsComparator);

console.log(trie.getMatches('ri', 2));

function getLocationById(id) {
  const matches = locations.filter(location => location.id === id);

  return matches.length === 0 ? null : matches[0].location;
}

function verifyMatches(query, expectedLocationIds, limit) {
  const matches =
    limit ? trie.getMatches(query, limit) : trie.getMatches(query);

  matches.forEach((match, index) => {
    if (match.id !== expectedLocationIds[index]) {
      console.log(`\tMatch #${index} should be:`);
      console.log('\t\t' + getLocationById(expectedLocationIds[index]));
      console.log('\tnot:');
      console.log('\t\t' + getLocationById(match.id));

      expect(true).to.be.false;
    }
  });

  if (matches.length !== expectedLocationIds.length) {
    console.log(`
      Expected to get ${expectedLocationIds.length} result(s),
      not ${matches.length}
    `);

    expect(true).to.be.false;
  }
}

describe('trie', () => {
  describe('single word query', () => {
    it('should find all exact matches', () => {
      verifyMatches('richmond', [4, 2, 0]);
    });

    it('should find all partial matches', () => {
      verifyMatches('v', [4, 3, 1, 0, 2]);
    });

    it('should limit number of matches', () => {
      verifyMatches('v', [4, 3, 1], 3);
    });

    it('should ignore case', () => {
      verifyMatches('WE', [2]);
    });

    it('should ignore white spaces in the beginning and end', () => {
      verifyMatches('  5\t ', [2]);
    });

    it('should return no results if query is empty', () => {
      verifyMatches('', []);
    });

    it('should return no results if query is not found', () => {
      verifyMatches('Richmonda', []);
      verifyMatches('elbourne', []);
      verifyMatches('x', []);
      verifyMatches('8', []);
    });
  });

  describe('multiple words query', () => {
    it('should find all exact matches', () => {
      verifyMatches('east richmond', [0]);
    });

    it('should find all partial matches', () => {
      verifyMatches('r v', [4, 2, 0]);
    });

    it('should limit number of matches', () => {
      verifyMatches('r v', [4], 1);
    });

    it('should find all matches regardless of order', () => {
      verifyMatches('VI r', [4, 0, 2]);
    });

    it('should return no results if not all the words are found', () => {
      verifyMatches('East X', []);
      verifyMatches('r w 5 x', []);
    });
  });
});
