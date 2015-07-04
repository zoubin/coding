var test = require('tap').test
var eq = require('../lib/count-equal')
var rand = require('../lib/random-sorted')

var perm = require('array-permutation')
var range = perm.range

test('eq', function(t) {
  t.equal(
    eq(2, [3,3,3]),
    0
  )
  t.equal(
    eq(3, [3,3,3]),
    3
  )
  var m = 10 
  var max = 1 << m
  eq.op()
  range(max).forEach(function (n) {
    var a = rand(n, max)
    var k = Math.floor(Math.random() * max)
    k = a[k]
    t.equal(
      eq(k, a),
      eqExpect(k, a),
      'eq:' + k + JSON.stringify(a)
    )
    var ops = eq.op()
    t.equal(
      ops < 2 * m,
      true,
      'eq ops:' + k + ',' + ops
    )
  })
  t.end()

})

function eqExpect(k, a) {
  var r = 0
  for (var i = 0; i < a.length && a[i] <= k; i++) {
    if (a[i] === k) {
      r++
    }
  }
  return r
}


