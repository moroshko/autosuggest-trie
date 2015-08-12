'use strict';

function unique(array) {
  const seen = {};
  const result = [];
  const length = array.length;

  for (let i = 0; i < length; i++) {
    const item = array[i];

    if (!seen[item]) {
      seen[item] = true;
      result[result.length] = item;
    }
  }

  return result;
}

function clone(array) {
  return array.slice(0);
}

export default function(array1, array2) {
  return unique(clone(array1).concat(clone(array2)));
}
