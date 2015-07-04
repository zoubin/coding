'use strict';

var lt = require('./count-less-than')
var eq = require('./count-equal')
var select = require('./select-from-sorted')

module.exports = function (A, B) {
  var n = A.length + B.length
  var sm = (n + 1) >> 1
  if (n % 2) {
    return select(A, B, sm)
  }
  var smaller = select.obj(A, B, sm)
  if (smaller.source === 0) {
    var ia = smaller.index + 1
    var ib = sm - ia
  }
  else {
    var ib = smaller.index + 1
    var ia = sm - ib
  }
  if (ia === A.length) {
    return (B[ib] + smaller.value) / 2
  }
  if (ib === B.length) {
    return (A[ia] + smaller.value) / 2
  }
  return (Math.min(A[ia], B[ib]) + smaller.value) / 2
}

