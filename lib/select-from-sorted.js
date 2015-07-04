'use strict';

var lt = require('./count-less-than')
var eq = require('./count-equal')

module.exports = function () {
  return obj.apply(null, arguments).value
}

module.exports.obj = obj

function obj(A, al, ah, B, bl, bh, i) {
  var args = [].slice.call(arguments, 1)
  al = args.shift()
  if (typeof al !== 'number') {
    args.unshift(al)
    ah = A.length
    al = 0
  }
  else {
    ah = args.shift()
    if (typeof ah !== 'number') {
      args.unshift(ah)
      ah = A.length
    }
  }
  B = args.shift()
  i = args.pop() || (A.length + B.length + 1) >> 1
  bl = args.length ? args.shift() : 0
  bh = args.length ? args.shift() : B.length
  return select(A, al, ah, B, bl, bh, i)
}

function select(A, al, ah, B, bl, bh, i) {
  // we want to look for the `i`th least number among `A U B`
  if (al >= ah) {
    return {
      source: 1,
      index: bl + i - 1,
      value: B[bl + i - 1]
    }
  }

  if (bl >= bh) {
    return {
      source: 0,
      index: al + i - 1,
      value: A[al + i - 1]
    }
  }

  if (ah - al > i) {
    ah = al + i
  }

  // now numbers in [al, ah) may be the `i`th least
  // try the number A[ai]
  var ai = (ah + al) >> 1

  var nlt = lt(A[ai], B, bl, bh)
  var neq = eq(A[ai], B, bl + nlt, bh)

  var n = nlt + neq + ai + 1 - al
  if (n < i)
    return select(A, ai + 1, ah, B, bl + nlt + neq, bh, i - n)

  n = nlt + ai + 1 - al
  if (n > i)
    return select(A, al, ai, B, bl, bl + nlt, i)

  return {
    source: 0,
    index: ai,
    value: A[ai]
  }
}

