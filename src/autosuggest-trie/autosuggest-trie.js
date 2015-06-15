'use strict';

import intersectionWithLimit
  from '../intersection-with-limit/intersection-with-limit';

import concatAndRemoveDupsWithLimit
  from '../concat-and-remove-dups-with-limit/concat-and-remove-dups-with-limit';

function create(items, textField, itemsComparator) {
  const data = items;
  const trie = {};

  function addWord(word, id, wordIndex) {
    const wordLength = word.length;
    let node = trie;
    let prefix = '';

    for (let i = 0; i < wordLength; i++) {
      const letter = word[i];

      prefix += letter;

      if (!node[letter]) {
        node[letter] = { ids: [] };
      }

      if (!node[letter].ids[wordIndex]) {
        node[letter].ids[wordIndex] = [];
      }

      node[letter].ids[wordIndex].push(id);

      if (itemsComparator) {
        node[letter].ids[wordIndex].sort(function(id1, id2) {
          return itemsComparator(items[id1], items[id2]);
        });
      }

      node = node[letter];
    }
  }

  function addPhrase(phrase, id) {
    const words = phrase.trim().toLowerCase().split(/\s+/);
    const wordsCount = words.length;

    for (let i = 0; i < wordsCount; i++) {
      addWord(words[i], id, i);
    }
  }

  function getWordIndices(word, limit) {
    const wordLength = word.length;
    let node = trie;

    for (let i = 0; i < wordLength; i++) {
      if (node[word[i]]) {
        node = node[word[i]];
      } else {
        return [];
      }
    }

    const ids = node.ids;
    const length = ids.length;
    let result = [];

    for (let i = 0; i < length; i++) {
      if (ids[i]) {
        result = concatAndRemoveDupsWithLimit(result, ids[i], limit);
      }
    }

    return result;
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
      indicesArray[indicesArray.length] = getWordIndices(words[i], limit);
    }

    return intersectionWithLimit(indicesArray, limit);
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
