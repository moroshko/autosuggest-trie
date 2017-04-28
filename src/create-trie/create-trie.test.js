import { expect } from 'chai';
import createTrie from './create-trie';

const locations = [
  {
    id: 0,
    name: 'East Richmond 1234 VIC',
    population: 10000
  },
  {
    id: 1,
    name: 'East Eagle 1235 VIC',
    population: 5000
  },
  {
    id: 2,
    name: 'Richmond West 5678 VIC',
    population: 4000
  },
  {
    id: 3,
    name: 'Cheltenham 3192 Melbourne VIC',
    population: 7000
  },
  {
    id: 4,
    name: 'Richmond 6776 VIC',
    population: 3000
  },
  {
    id: 5,
    name: 'Auckland CBD Auckland NZ',
    population: 2000
  },
  {
    id: 6,
    name: 'Mountain_View___CA',
    population: 9000
  }
];

const getLocationById = id => {
  const matches = locations.filter(location => location.id === id);

  return matches.length === 0 ? null : matches[0].name;
};

let trie;

const comparator = (location1, location2) =>
  (location1.name < location2.name ? -1 : 1);

/* eslint-disable no-console */
const verifyMatches = (query, expectedLocationIds, options) => {
  const matches = trie.getMatches(query, options);

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
    console.log(
      `
      Expected to get ${expectedLocationIds.length} result(s),
      not ${matches.length}
    `
    );

    expect(true).to.be.false;
  }
};
/* eslint-enable no-console */

describe('createTrie', () => {
  describe('without comparator', () => {
    beforeEach(() => {
      trie = createTrie(locations, 'name');
    });

    describe('single word query', () => {
      it('should find all exact matches', () => {
        verifyMatches('richmond', [2, 4, 0]);
      });

      it('should find all partial matches', () => {
        verifyMatches('v', [4, 0, 1, 2, 3]);
      });

      it('should limit number of matches', () => {
        verifyMatches('v', [4, 0, 1], { limit: 3 });
      });

      it('should ignore case', () => {
        verifyMatches('WE', [2]);
      });

      it('should ignore leading and trailing whitespaces', () => {
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
        verifyMatches('r v', [2, 4, 0]);
      });

      it('should limit number of matches', () => {
        verifyMatches('r v', [2], { limit: 1 });
      });

      it('should find all matches regardless of order', () => {
        verifyMatches('VI r', [4, 0, 2]);
      });

      it('should return no results if not all the words are found', () => {
        verifyMatches('East X', []);
        verifyMatches('r w 5 x', []);
      });

      it('should not return duplicate matches', () => {
        verifyMatches('auckland', [5]);
      });
    });
  });

  describe('with comparator', () => {
    beforeEach(() => {
      trie = createTrie(locations, 'name', { comparator });
    });

    it('should sort the items using the specified comparator', () => {
      verifyMatches('v', [4, 3, 1, 0, 2]);
    });
  });

  describe('with textKey splitRegex', () => {
    beforeEach(() => {
      trie = createTrie(locations, 'name', { splitRegex: /[\s_]+/ });
    });

    it('should split names into words using splitRegex', () => {
      verifyMatches('ca mountain', [6]);
    });

    it('should not find matches without specifying splitRegex', () => {
      verifyMatches('mountain-view', []);
    });

    it('should find matches when query splitRegex is specified', () => {
      verifyMatches('mountain-view', [6], { splitRegex: /[\s-]+/ });
    });
  });
});
