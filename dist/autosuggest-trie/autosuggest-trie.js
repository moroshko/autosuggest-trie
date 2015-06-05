'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _intersectionWithLimitIntersectionWithLimit = require('../intersection-with-limit/intersection-with-limit');

var _intersectionWithLimitIntersectionWithLimit2 = _interopRequireDefault(_intersectionWithLimitIntersectionWithLimit);

function create(items, textField, itemsComparator) {
  var data = items;
  var trie = {};

  function addWord(word, id, wordIndex) {
    var wordLength = word.length;
    var node = trie;
    var prefix = '';

    for (var i = 0; i < wordLength; i++) {
      var letter = word[i];

      prefix += letter;

      if (!node[letter]) {
        node[letter] = { ids: [] };
      }

      if (!node[letter].ids[wordIndex]) {
        node[letter].ids[wordIndex] = [];
      }

      node[letter].ids[wordIndex].push(id);

      if (itemsComparator) {
        node[letter].ids[wordIndex].sort(function (id1, id2) {
          return itemsComparator(items[id1], items[id2]);
        });
      }

      node = node[letter];
    }
  }

  function addPhrase(phrase, id) {
    var words = phrase.trim().toLowerCase().split(/\s+/);
    var wordsCount = words.length;

    for (var i = 0; i < wordsCount; i++) {
      addWord(words[i], id, i);
    }
  }

  function getWordIndices(word) {
    var wordLength = word.length;
    var node = trie;

    for (var i = 0; i < wordLength; i++) {
      if (node[word[i]]) {
        node = node[word[i]];
      } else {
        return [];
      }
    }

    var ids = node.ids;
    var length = ids.length;
    var result = [];

    for (var i = 0; i < length; i++) {
      if (ids[i]) {
        result = result.concat(ids[i]);
      }
    }

    return result;
  }

  function getPhraseIndices(phrase, limit) {
    phrase = phrase.trim();

    if (phrase === '') {
      return [];
    }

    var words = phrase.toLowerCase().split(/\s+/);
    var wordsCount = words.length;
    var indicesArray = [];

    for (var i = 0; i < wordsCount; i++) {
      indicesArray[indicesArray.length] = getWordIndices(words[i]);
    }

    return (0, _intersectionWithLimitIntersectionWithLimit2['default'])(indicesArray, limit);
  }

  function getMatches(query, limit) {
    var indices = getPhraseIndices(query, limit);
    var indicesCount = indices.length;
    var result = [];

    for (var i = 0; i < indicesCount; i++) {
      result[result.length] = data[indices[i]];
    }

    return result;
  }

  var itemsCount = items.length;

  for (var i = 0; i < itemsCount; i++) {
    addPhrase(items[i][textField], i);
  }

  return {
    getMatches: getMatches
  };
}

exports['default'] = {
  create: create
};
module.exports = exports['default'];
