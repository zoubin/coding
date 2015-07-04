var test = require('tap').test
var lt = require('../lib/count-less-than')
var rand = require('../lib/random-sorted')

var perm = require('array-permutation')
var range = perm.range

test('lt', function(t) {
  t.equal(
    lt(2, '3'.repeat(100).split('')),
    0
  )
  t.equal(
    lt(4, '3'.repeat(100).split('')),
    100 
  )
  t.equal(
    lt(3, '3'.repeat(100).split('')),
    0
  )
  var m = 10 
  var max = 1 << m
  lt.op()
  range(max).forEach(function (n) {
    var a = rand(n, max)
    var k = Math.floor(Math.random() * max)
    k = a[k]
    t.equal(
      lt(k, a),
      ltExpect(k, a),
      'search:' + k
    )
    t.equal(
      lt.op() <= m + 1,
      true,
      'search ops:' + k
    )
  })
  t.end()

})

function ltExpect(k, a) {
  var r = 0
  for (var i = 0; i < a.length && a[i] < k; i++) {
    r++
    
  }
  return r
}


