var test = require('tap').test;
var median = require('../lib/median-of-sorted');
var kth = median.kth;

test('kth', function(t) {
  t.equal(
    kth([], [], 0),
    null
  );
  t.equal(
    kth([1], [], 0),
    1
  );
  t.equal(
    kth([], [1], 0),
    1
  );
  t.equal(
    kth([1, 1, 1], [2, 2, 2], 2),
    1
  );
  t.equal(
    kth([1, 1, 1], [2, 2, 2], 3),
    2
  );
  t.equal(
    kth([1, 3, 5, 7, 9], [0, 2, 4, 6, 8], 3),
    3
  );
  t.equal(
    kth([9, 7, 5, 3, 1], [0, 2, 4, 6, 8], 3),
    3
  );
  t.equal(
    kth([9, 7, 5, 3, 1], [8, 6, 4, 2, 0], 3),
    3
  );
  t.equal(
    kth([1, 3, 5, 7, 9], [0, 2, 4, 6, 8], 4),
    4
  );
  t.same(
    kth(
      [{ x: 1 }, { x: 3 }],
      [{ x: 2 }, { x: 4 }],
      1,
      function (a, b) {
        return a.x - b.x;
      }
    ),
    { x: 2 }
  );
  t.end();
});

test('median', function(t) {
  t.equal(
    median(
      [0, 2, 4, 6, 8],
      [1, 3, 5, 7, 9]
    ),
    4.5
  );
  t.equal(
    median(
      [0, 2, 4, 6, 8],
      [1, 3, 5, 7]
    ),
    4
  );
  t.end();
});

