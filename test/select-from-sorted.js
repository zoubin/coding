var test = require('tap').test
var select = require('../lib/select-from-sorted')
var rand = require('../lib/random-sorted')
var range = require('array-permutation').range

test('select', function(t) {
  t.equal(
    select(range(3), range(3, 6), 4),
    3
  )
  t.equal(
    select(range(3), range(3), 4),
    1
  )
  t.equal(
    select('3'.repeat(3).split(''), '3'.repeat(3).split(''), 4),
    '3'
  )
  var m = 10 
  var max = 1 << m
  range(max).forEach(function (n, i, arr) {
    var a = rand(n, max)
    var b = rand(n, max)
    range(m)
    .concat(max >> 1)
    .concat(range(max - m, max))
    .filter(Boolean)
    .forEach(function (k) {
      t.equal(
        select(a, b, k),
        selectExpect(a, b, k),
        'select:' + k
      )
    })
  })
  t.end()

})

function selectExpect(a, b, k) {
  var i = 0
  var j = 0
  var v
  while (i < a.length || j < b.length) {
    if (i < a.length && (j >= b.length || a[i] < b[j])) {
      v = a[i++]
    }
    else {
      v = b[j++]
    }
    if (--k === 0) {
      return v
    }
  }
  return
}

