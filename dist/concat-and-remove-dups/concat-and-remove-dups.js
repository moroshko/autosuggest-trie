'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (array1, array2) {
  var array1Count = array1.length;
  var array2Count = array2.length;

  var result = [];

  for (var i = 0; i < array1Count; i++) {
    result[result.length] = array1[i];
  }

  for (var i = 0; i < array2Count; i++) {
    if (result.indexOf(array2[i]) === -1) {
      result[result.length] = array2[i];
    }
  }

  return result;
};

module.exports = exports['default'];
