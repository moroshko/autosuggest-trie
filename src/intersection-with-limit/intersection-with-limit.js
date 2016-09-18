export default (arrays, limit) => {
  const arraysCount = arrays.length;
  const firstArray = arrays[0];
  const firstArrayCount = firstArray.length;

  limit = limit || firstArrayCount;

  let result = [], candidate, found;

  for (let i = 0; i < firstArrayCount && result.length < limit; i++) {
    candidate = firstArray[i];
    found = true;

    for (let k = 1; k < arraysCount; k++) {
      if (arrays[k].indexOf(candidate) === -1) {
        found = false;
        break;
      }
    }

    if (found) {
      result[result.length] = candidate;
    }
  }

  return result;
};
