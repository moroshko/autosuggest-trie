'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _underscore = require('underscore');

'use strict';

var trie = null;
var data = null;

function addWord(word, id) {
  var wordLength = word.length;
  var node = trie;

  for (var i = 0; i < wordLength; i++) {
    var letter = word[i];

    if (node[letter]) {
      node[letter].ids[node[letter].ids.length] = id; // it's faster than .push()
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

function init(items, textField) {
  var itemsCount = items.length;

  data = items;
  trie = {};

  for (var i = 0; i < itemsCount; i++) {
    addPhrase(items[i][textField], i);
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

function getPhraseIndices(phrase) {
  phrase = phrase.trim();

  if (phrase === '') {
    return [];
  }

  var words = phrase.toLowerCase().split(/\s+/);
  var wordsCount = words.length;
  var indicesArray = [];

  for (var i = 0; i < wordsCount; i++) {
    // it's faster than .map()
    indicesArray[indicesArray.length] = getWordIndices(words[i]); // it's faster than .push()
  }

  return _underscore.intersection.apply(null, indicesArray);
}

function getMatches(query) {
  var indices = getPhraseIndices(query);
  var indicesCount = indices.length;
  var result = [];

  for (var i = 0; i < indicesCount; i++) {
    result[result.length] = data[indices[i]]; // it's faster than .push()
  }

  return result;
}

exports['default'] = {
  init: init,
  getMatches: getMatches
};
module.exports = exports['default'];
