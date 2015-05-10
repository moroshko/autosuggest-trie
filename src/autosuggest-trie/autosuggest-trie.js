'use strict';

import intersection from '../intersection/intersection';

function create(items, textField) {
  const data = items;
  const trie = {};

  function addWord(word, id) {
    const wordLength = word.length;
    let node = trie;

    for (let i = 0; i < wordLength; i++) {
      const letter = word[i];

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
    const words = phrase.trim().toLowerCase().split(/\s+/);
    const wordsCount = words.length;

    for (let i = 0; i < wordsCount; i++) {
      addWord(words[i], id);
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

  function getPhraseIndices(phrase, limit) {
    phrase = phrase.trim();

    if (phrase === '') {
      return [];
    }

    const words = phrase.toLowerCase().split(/\s+/);
    const wordsCount = words.length;
    let indicesArray = [];

    for (let i = 0; i < wordsCount; i++) {
      indicesArray[indicesArray.length] = getWordIndices(words[i]);
    }

    return intersection(indicesArray, limit);
  }

  function getMatches(query, limit) {
    const indices = getPhraseIndices(query, limit);
    const indicesCount = indices.length;
    let result = [];

    for (let i = 0; i < indicesCount; i++) {
      result[result.length] = data[indices[i]];
    }

    return result;
  }

  const itemsCount = items.length;

  for (let i = 0; i < itemsCount; i++) {
    addPhrase(items[i][textField], i);
  }

  return {
    getMatches
  };
}

export default {
  create
}
