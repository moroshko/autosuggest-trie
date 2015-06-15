'use strict';

export default function(array1, array2, limit) {
  const array1Count = array1.length;
  const array2Count = array2.length;

  limit = limit || (array1Count + array2Count);

  let result = [];

  for (let i = 0; i < array1Count && result.length < limit; i++) {
    result[result.length] = array1[i];
  }

  if (result.length === limit) {
    return result;
  }

  for (let i = 0; i < array2Count && result.length < limit; i++) {
    if (result.indexOf(array2[i]) === -1) {
      result[result.length] = array2[i];
    }
  }

  return result;
}
