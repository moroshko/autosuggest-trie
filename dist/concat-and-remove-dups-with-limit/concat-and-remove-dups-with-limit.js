'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (array1, array2, limit) {
  var array1Count = array1.length;
  var array2Count = array2.length;

  limit = limit || array1Count + array2Count;

  var result = [];

  for (var i = 0; i < array1Count && result.length < limit; i++) {
    result[result.length] = array1[i];
  }

  if (result.length === limit) {
    return result;
  }

  for (var i = 0; i < array2Count && result.length < limit; i++) {
    if (result.indexOf(array2[i]) === -1) {
      result[result.length] = array2[i];
    }
  }

  return result;
};

module.exports = exports['default'];
