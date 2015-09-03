
module.exports = function (A, B) {
  var len = A.length + B.length;
  if (!len) {
    return null;
  }
  if (len % 2) {
    return kth(A, B, len >> 1);
  }
  return (kth(A, B, len - 1 >> 1) + kth(A, B, len >> 1)) / 2;
};
module.exports.kth = kth;

function kth(A, B, k, cmp) {
  var ret = _kth(A, k, B, cmp);
  if (ret != null) {
    return ret;
  }
  ret = _kth(B, k, A, cmp);
  return ret == null ? null : ret;
}

function _kth(A, k, B, cmp) {
  k = ~~k;
  if (!B.length) {
    return A[k];
  }

  cmp = cmp || function (a, b) {
    return a - b;
  };
  var descA = descending(A, cmp);
  var descB = descending(B, cmp);

  var i;
  var j;
  var range = [
    Math.max(k - B.length, 0),
    Math.min(k + 1, A.length),
  ];
  while (range[0] < range[1]) {
    i = range[0] + range[1] >> 1;
    j = k - countSmallerNumbers(i, A, descA);
    if (notEnoughSmallerNumbers(A[i], j, B, cmp, descB)) {
      range = considerBiggerNumbers(i, range, descA);
    } else if (tooManySmallerNumbers(A[i], j, B, cmp, descB)) {
      range = considerSmallerNumbers(i, range, descA);
    } else {
      return A[i];
    }
  }

  return null;
}

function descending(arr, cmp) {
  var len = arr.length;
  return len > 1 && cmp(arr[len - 1], arr[0]) < 0;
}

function countSmallerNumbers(i, arr, desc) {
  return desc ? arr.length - 1 - i : i;
}

function kthLargestIndex(arr, k, desc) {
  return desc ? arr.length - 1 - k : k;
}

function notEnoughSmallerNumbers(val, num, arr, cmp, desc) {
  var i = kthLargestIndex(arr, num - 1, desc);
  return arr[i] != null && cmp(arr[i], val) > 0;
}

function tooManySmallerNumbers(val, num, arr, cmp, desc) {
  var i = kthLargestIndex(arr, num, desc);
  return arr[i] != null && cmp(arr[i], val) < 0;
}

function considerBiggerNumbers(mid, range, desc) {
  return desc ? [range[0], mid] : [mid + 1, range[1]];
}

function considerSmallerNumbers(mid, range, desc) {
  return desc ? [mid + 1, range[1]] : [range[0], mid];
}

