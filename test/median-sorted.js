var test = require('tap').test
var median = require('../lib/median-sorted')

test('median sorted', function(t) {
  t.equal(
    median([0,1,2],[4,5,6]),
    3
  )
  t.equal(
    median([0,1,2],[0,1,2]),
    1
  )
  t.equal(
    median([0,1,2,3],[0,1,2]),
    1
  )
  t.equal(
    median([0,1,2,3,4,5],[0,1,2]),
    2
  )
  t.end()

})

