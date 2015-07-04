var op = 0

module.exports = function (p, a, l, h) {
  var argc = arguments.length
  if (argc < 4) {
    h = a.length
  }
  if (argc < 3) {
    l = 0
  }
  return eq(p, a, l, h)
}
function eq(p, a, l, h) {
  var argc = arguments.length
  if (argc < 4) {
    h = a.length
  }
  if (argc < 3) {
    l = 0
  }
  var i
  while (l < h) {
    i = (l + h) >> 1
    op++
    if (a[i] === p) {
      var r = 1
      r += a[l] === p ? i - l : eq(p, a, l, i)
      r += a[h - 1] === p ? h - i - 1 : eq(p, a, i + 1, h)
      return r
    }
    if (a[i] < p) {
      l = i + 1
    }
    else {
      h = i
    }
  }
  return 0
}
module.exports.op = function () {
  var r = op
  op = 0
  return r
}
