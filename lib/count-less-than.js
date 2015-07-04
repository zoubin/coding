var op = 0
module.exports = function (p, a, l, h) {
  var argc = arguments.length
  if (argc < 4) {
    h = a.length
  }
  if (argc < 3) {
    l = 0
  }
  return lt(p, a, l, h)
}


function lt(p, a, l, h) {
  var argc = arguments.length
  if (argc < 4) {
    h = a.length
  }
  if (argc < 3) {
    l = 0
  }
  var r = 0
  while (l < h) {
    i = (l + h) >> 1
    op++
    if (a[i] < p) {
      r += i - l + 1
      l = i + 1
    }
    else {
      h = i
    }
  }
  return r
}

module.exports.op = function () {
  var r = op
  op = 0
  return r
}
