'use strict';

export default function(array1, array2) {
  const array1Count = array1.length;
  const array2Count = array2.length;

  let result = [];

  for (let i = 0; i < array1Count; i++) {
    result[result.length] = array1[i];
  }

  for (let i = 0; i < array2Count; i++) {
    if (result.indexOf(array2[i]) === -1) {
      result[result.length] = array2[i];
    }
  }

  return result;
}
