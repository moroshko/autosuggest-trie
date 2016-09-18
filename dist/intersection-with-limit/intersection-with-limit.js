"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (arrays, limit) {
  var arraysCount = arrays.length;
  var firstArray = arrays[0];
  var firstArrayCount = firstArray.length;

  limit = limit || firstArrayCount;

  var result = [],
      candidate = void 0,
      found = void 0;

  for (var i = 0; i < firstArrayCount && result.length < limit; i++) {
    candidate = firstArray[i];
    found = true;

    for (var k = 1; k < arraysCount; k++) {
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