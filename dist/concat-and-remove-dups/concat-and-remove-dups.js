'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function unique(array) {
  var seen = {};
  var result = [];
  var length = array.length;

  for (var i = 0; i < length; i++) {
    var item = array[i];

    if (!seen[item]) {
      seen[item] = true;
      result[result.length] = item;
    }
  }

  return result;
}

function clone(array) {
  return array.slice(0);
}

exports['default'] = function (array1, array2) {
  return unique(clone(array1).concat(clone(array2)));
};

module.exports = exports['default'];
