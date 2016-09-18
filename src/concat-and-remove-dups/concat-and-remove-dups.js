const unique = arr => {
  const seen = {};
  const result = [];
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    const item = arr[i];

    if (!seen[item]) {
      seen[item] = true;
      result[result.length] = item;
    }
  }

  return result;
};

export default (arr1, arr2) => unique(arr1.concat(arr2));
