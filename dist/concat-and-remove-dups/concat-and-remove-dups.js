"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var unique = function unique(arr) {
  var seen = {};
  var result = [];
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    var item = arr[i];

    if (!seen[item]) {
      seen[item] = true;
      result[result.length] = item;
    }
  }

  return result;
};

exports.default = function (arr1, arr2) {
  return unique(arr1.concat(arr2));
};