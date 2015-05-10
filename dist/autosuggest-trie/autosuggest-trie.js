'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _intersectionIntersection = require('../intersection/intersection');

var _intersectionIntersection2 = _interopRequireDefault(_intersectionIntersection);

'use strict';

function create(items, textField) {
  var data = items;
  var trie = {};

  function addWord(word, id) {
    var wordLength = word.length;
    var node = trie;

    for (var i = 0; i < wordLength; i++) {
      var letter = word[i];

      if (node[letter]) {
        node[letter].ids[node[letter].ids.length] = id;
      } else {
        node[letter] = {
          ids: [id]
        };
      }

      node = node[letter];
    }
  }

  function addPhrase(phrase, id) {
    var words = phrase.trim().toLowerCase().split(/\s+/);
    var wordsCount = words.length;

    for (var i = 0; i < wordsCount; i++) {
      addWord(words[i], id);
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

    return node.ids;
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

    return _intersectionIntersection2['default'](indicesArray, limit);
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
