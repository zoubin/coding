
module.exports =
  
function rand(n, len) {
  var o = {}
  var m
  while (len-- > 0) {
    m = Math.floor(Math.random() * n)
    o[m] = (o[m] || 0) + 1
  }
  return Object.keys(o)
  .sort(function (a, b) {
    return a - b
  })
  .reduce(function (r, a) {
    for (var i = 0; i < o[a]; i++) r.push(+a)

    return r
  }, [])
}
