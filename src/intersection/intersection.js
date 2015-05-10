'use strict';

// Returns the first `limit` items in the intersection of `sortedArrays`.
export default function(sortedArrays, limit) {
  limit = limit || Infinity;

  const arraysCount = sortedArrays.length;
  let result = [], indices = [], largest = -Infinity, count = 0;
  let i, current, array, arrayLength;
  
  for (i = 0; i < arraysCount; i++) {
    indices[i] = 0;
  }
  
  while (result.length < limit) {
    for (i = 0; i < arraysCount; i++) {
      array = sortedArrays[i];
      arrayLength = array.length;

      // Skip past elements less than `largest`.
      while (indices[i] < arrayLength && array[indices[i]] < largest) {
        indices[i]++;
      }
      
      // If we ran out of elements, we're done.
      if (indices[i] === arrayLength) {
        return result;
      }
              
      current = array[indices[i]];
      
      if (current === largest) {
        count++;
      } else {
        count = 1;
        largest = current;
      }
      
      // Once we see it enough times, we can be sure it's in the intersection!
      if (count === arraysCount) {
        result[result.length] = largest;
      }

      indices[i]++;
    }
  }
  
  return result;
}
