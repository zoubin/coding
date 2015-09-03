# median-of-sorted

给定两个有序数组`A`, `B`，令`AB=A.concat(B)`，要求实现函数`median(A, B)`，返回`AB`的中位数。

## median(A, B)

可先实现`kth(A, B, k)`，返回`AB`的第k大数。
基于`kth`去实现`median`是很简单的事情。

```javascript
function median(A, B) {
  var len = A.length + B.length;
  if (!len) {
    return null;
  }
  if (len % 2) {
    return kth(A, B, len >> 1);
  }
  return (kth(A, B, len - 1 >> 1) + kth(A, B, len >> 1)) / 2;
}
```

## kth(A, B, k)

进一步，实现`kth`时，可先实现`_kth(A, k, B)`。
`_kth`是在`A`中去找`AB`的第k大数。
同样，基于`_kth`去实现`kth`也是简单的事。

```javascript
function kth(A, B, k) {
  var ret = _kth(A, k, B);
  if (ret != null) {
    return ret;
  }
  ret = _kth(B, k, A);
  return ret == null ? null : ret;
}
```

## _kth(A, k, B)

可在`A`中用二分的方式去查找。

### 简单的情况

如果`A`，`B`都是非降序的`Number`类型数组，则比较简单：

```javascript
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
```

### 复杂的情况

这里将条件放宽一点：

1. 可提供自定义的`cmp`函数，支持非数字类型的数组处理
1. 只要求`A`和`B`有序，两者的排序方式可不一样，升降随意

单独实现第一点是比较容易的，与第二点结合后麻烦就较多。

可先用伪码倾向较重的写法去实现：

```javascript
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

```

可以看出，基本结构是一样的。

