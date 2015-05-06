'use strict';

import { intersection } from 'underscore';

let trie = null;
let data = null;

function addWord(word, id) {
  const wordLength = word.length;
  let node = trie;

  for (let i = 0; i < wordLength; i++) {
    const letter = word[i];

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
  const words = phrase.trim().toLowerCase().split(/\s+/);
  const wordsCount = words.length;

  for (let i = 0; i < wordsCount; i++) {
    addWord(words[i], id);
  }
}

function init(items, textField) {
  const itemsCount = items.length;

  data = items;
  trie = {};

  for (let i = 0; i < itemsCount; i++) {
    addPhrase(items[i][textField], i);
  }
}

function getWordIndices(word) {
  const wordLength = word.length;
  let node = trie;

  for (let i = 0; i < wordLength; i++) {
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

  const words = phrase.toLowerCase().split(/\s+/);
  const wordsCount = words.length;
  let indicesArray = [];

  for (let i = 0; i < wordsCount; i++) { // it's faster than .map()
    indicesArray[indicesArray.length] = getWordIndices(words[i]); // it's faster than .push()
  }

  return intersection.apply(null, indicesArray);
}

function getMatches(query) {
  const indices = getPhraseIndices(query);
  const indicesCount = indices.length;
  let result = [];

  for (let i = 0; i < indicesCount; i++) {
    result[result.length] = data[indices[i]]; // it's faster than .push()
  }

  return result;
}

export default {
  init,
  getMatches
};
