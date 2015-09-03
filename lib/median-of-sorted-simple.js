
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

function kth(A, B, k) {
  var ret = _kth(A, k, B);
  if (ret != null) {
    return ret;
  }
  ret = _kth(B, k, A);
  return ret == null ? null : ret;
}

function _kth(A, k, B) {
  k = ~~k;
  var lenB = B.length;
  if (!lenB) {
    return A[k];
  }

  var i;
  var j;
  var low = Math.max(k - lenB, 0);
  var high = Math.min(k + 1, A.length);
  while (low < high) {
    i = low + high >> 1;
    j = k - i;
    if (j >= 1 && B[j - 1] > A[i]) {
      low = i + 1;
    } else if (j < lenB && B[j] < A[i]) {
      high = i;
    } else {
      return A[i];
    }
  }

  return null;
}

