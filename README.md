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
  id: 1,
  location: 'East Richmond 1234 VIC'
}, {
  id: 2,
  location: 'Richmond East 4321 NSW'
}, {
  id: 3,
  location: 'Richmond West 5678 VIC'
}, {
  id: 4,
  location: 'Cheltenham 3192 Melbourne VIC'
}];

const trie = autosuggestTrie.create(locations, 'location');

console.log(trie.getMatches('richmond e'));
// [ { id: 1, location: 'East Richmond 1234 VIC' },
//   { id: 2, location: 'Richmond East 4321 NSW' } ]
```

### API

* [`create(items, itemKey)`](#createOption)
* [`getMatches(query)`](#getMatchesOption)

<a name="createOption"></a>
#### create(items, itemKey)

Creates a trie containing the given items.

* `items ` - array of objects
* `itemKey` - key name that every `obj` in `items` must have. `obj[keyName]` must be a string. `obj` will be inserted to trie based on `obj[keyName]`.

<a name="getMatchesOption"></a>
#### getMatches(query)

Returns all the `items` that match the given `query`.

* `query` - an arbitrary string

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
