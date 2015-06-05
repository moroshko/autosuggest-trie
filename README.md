[![Build Status][status-image]][status-url]
[![NPM Version][npm-image]][npm-url]

# Autosuggest Trie

Trie implementation for autosuggest components.

## Installation

```shell
npm install autosuggest-trie --save
```

## Basic Usage

```js
import autosuggestTrie from 'autosuggest-trie';

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

console.log(trie.getMatches('richmond e'));
// [ { id: 0, location: 'East Richmond 1234 VIC', population: 10000 } ]

console.log(trie.getMatches('ri', 2));
// [ { id: 4, location: 'Richmond 6776 VIC', population: 3000 },
//   { id: 2, location: 'Richmond West 5678 VIC', population: 4000 } ]
```

### API

* [`create(items, itemKey, itemsComparator)`](#createOption)
* [`getMatches(query, limit)`](#getMatchesOption)

<a name="createOption"></a>
#### create(items, itemKey, itemsComparator)

Creates a trie containing the given items.

* `items ` - (required) Array of objects
* `itemKey` - (required) Key name that every `obj` in `items` must have. `obj[keyName]` Must be a string. `obj` will be inserted to trie based on `obj[keyName]`.
* `itemsComparator` - (optional) function to compare two items. See [`.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description) for reference.

```js
    function(item1, item2) {
      // should return:
      //   negative number - if item1 should appear BEFORE item2
      //   positive number - if item1 should appear AFTER item2
      //                 0 - if the order of item1 and item2 should be preserved
    }
```

**Note:** Matches in the first word (group 1) are prioritized over matches in the second word (group 2), which are prioritized over matches in the third word (group 3), and so on. `itemsComparator` will only sort the matches **within each group**.

<a name="getMatchesOption"></a>
#### getMatches(query, limit)

If `limit` is specified, returns the first `limit` `items` that match `query`.

Otherwise, returns all the `items` that match `query`.

* `query` - (required) string
* `limit` - (optional) integer >= 1

## Running Tests

```shell
npm test
```

## License

[MIT](http://moroshko.mit-license.org)

[status-image]: https://img.shields.io/codeship/a3eddcc0-d548-0132-ef15-420032d7f4bd/master.svg
[status-url]: https://codeship.com/projects/77991
[npm-image]: https://img.shields.io/npm/v/autosuggest-trie.svg
[npm-url]: https://npmjs.org/package/autosuggest-trie
