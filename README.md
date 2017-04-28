[![Build Status](https://img.shields.io/codeship/a3eddcc0-d548-0132-ef15-420032d7f4bd/master.svg?style=flat-square)](https://codeship.com/projects/77991)
[![Coverage Status](https://img.shields.io/codecov/c/github/moroshko/autosuggest-trie/master.svg?style=flat-square)](https://codecov.io/gh/moroshko/autosuggest-trie)
[![npm Version](https://img.shields.io/npm/v/autosuggest-trie.svg?style=flat-square)](https://npmjs.org/package/autosuggest-trie)
![gzip size](http://img.badgesize.io/https://unpkg.com/autosuggest-trie/dist/index.js?compression=gzip&style=flat-square)

# Autosuggest Trie

Minimalistic trie implementation for autosuggest and autocomplete components.

## Installation

```shell
npm install autosuggest-trie --save
```

## Basic Usage

```js
import createTrie from 'autosuggest-trie';

const locations = [
  {
    id: 1,
    name: 'East Richmond 1234 VIC',
    population: 10000
  },
  {
    id: 2,
    name: 'East Eagle 1235 VIC',
    population: 5000
  },
  {
    id: 3,
    name: 'Richmond West 5678 VIC',
    population: 4000
  },
  {
    id: 4,
    name: 'Cheltenham 3192 Melbourne VIC',
    population: 7000
  },
  {
    id: 5,
    name: 'Richmond 6776 VIC',
    population: 3000
  }
];

const trie = createTrie(locations, 'name');

console.log(trie.getMatches('richmond e'));
/*
  [ { id: 1, name: 'East Richmond 1234 VIC', population: 10000 } ]
*/

console.log(trie.getMatches('ri', { limit: 2 }));
/*
  [ { id: 3, name: 'Richmond West 5678 VIC', population: 4000 },
    { id: 5, name: 'Richmond 6776 VIC', population: 3000 } ]
*/
```

## API

| Function | Description |
| :--- | :--- |
| [`createTrie(items, textKey, options)`](#createTrieFunction) | Creates a trie containing the given items. |
| [`getMatches(query, options)`](#getMatchesFunction) | Returns items that match the given query. |

<a name="createTrieFunction"></a>
### createTrie(items, textKey, options)

Creates a trie containing the given items.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `items` | Array | ✓ | Array of items. Every item must be an object. |
| `textKey` | String | ✓ | Key that every `item` in `items` must have.<br />`item` will be inserted to the trie based on `item[textKey]`. |
| `options` | Object | | Additional options |

Possible options:

| Option | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `comparator` | Function | none | Items comparator, similar to [`Array#sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)'s `compareFunction`.<br />It gets two items, and should return a number.<br /><br />**Note:** Matches in the first word (let's call it "group 1") are prioritized over matches in the second word ("group 2"), which are prioritized over matches in the third word ("group 3"), and so on.<br />`comparator` will only sort the matches **within each group**.<br /><br />When `comparator` is not specified, items within each group will preserve their order in `items`. |
| `splitRegex` | RegExp | `/\s+/` | Used to split items' `textKey` into words. |

<a name="getMatchesFunction"></a>
### getMatches(query, options)

Returns items that match the given query.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `query` | String | ✓ | Non-blank `query` string.<br /><br />If `query` is blank, `[]` is returned. |
| `options` | Object | | Additional `query` options. |

Possible `options`:

| Option | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `limit` | Number | `Infinity` | Integer >= 1<br /><br />**For example:** `getMatches('me', { limit: 3 })` will return no more than 3 items that match `'me'`. |
| `splitRegex` | RegExp | `/\s+/` | Used to split the `query` into words. |

## Running Tests

```shell
npm test
```

## License

[MIT](http://moroshko.mit-license.org)

