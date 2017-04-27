import intersectionWithLimit from '../intersection-with-limit/intersection-with-limit';
import concatAndRemoveDups from '../concat-and-remove-dups/concat-and-remove-dups';

export default (items, textKey, { comparator, whitespaceRegex } = {}) => {
  const data = items;
  const trie = {};

  const compareFunction = comparator ?
    (id1, id2) => comparator(items[id1], items[id2]) :
    null;
  const splitRegex = whitespaceRegex ? whitespaceRegex : /\s+/;

  const addWord = (word, id, wordIndex) => {
    const wordLength = word.length;
    let node = trie;

    for (let i = 0; i < wordLength; i++) {
      const letter = word[i];

      if (!node[letter]) {
        node[letter] = {
          ids: []
        };
      }

      if (!node[letter].ids[wordIndex]) {
        node[letter].ids[wordIndex] = [];
      }

      node[letter].ids[wordIndex].push(id);

      if (compareFunction) {
        node[letter].ids[wordIndex].sort(compareFunction);
      }

      node = node[letter];
    }
  };

  const addPhrase = (phrase, id) => {
    const words = phrase.trim().toLowerCase().split(splitRegex);
    const wordsCount = words.length;

    for (let i = 0; i < wordsCount; i++) {
      addWord(words[i], id, i);
    }
  };

  const getWordIndices = word => {
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
        result = concatAndRemoveDups(result, ids[i]);
      }
    }

    return result;
  };

  const getPhraseIndices = (phrase, { limit }) => {
    phrase = phrase.trim();

    if (phrase === '') {
      return [];
    }

    const words = phrase.toLowerCase().split(splitRegex);
    const wordsCount = words.length;
    let indicesArray = [];

    for (let i = 0; i < wordsCount; i++) {
      indicesArray[indicesArray.length] = getWordIndices(words[i]);
    }

    return intersectionWithLimit(indicesArray, limit);
  };

  const getMatches = (query, options = {}) => {
    const indices = getPhraseIndices(query, options);
    const indicesCount = indices.length;
    let result = [];

    for (let i = 0; i < indicesCount; i++) {
      result[result.length] = data[indices[i]];
    }

    return result;
  };

  const itemsCount = items.length;

  for (let i = 0; i < itemsCount; i++) {
    addPhrase(items[i][textKey], i);
  }

  return {
    getMatches
  };
};
