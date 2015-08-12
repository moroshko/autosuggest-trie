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

export default function(array1, array2) {
  return unique(array1.concat(array2));
}
