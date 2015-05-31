var inherits = require('util').inherits;
var EventEmitter = require('events');

inherits(Heap, EventEmitter);

module.exports = buildHeap;
module.exports.heapify = heapify;
module.exports.sort = sort;
module.exports.left = left;
module.exports.right = right;
module.exports.parent = parent;

function Heap(cmp) {
    this.cmp = typeof cmp === 'functionn' ? cmp : defaultCmp;
    this.records = [];
}

Heap.prototype.push = function(rec) {
    this.records.push(rec);
    heapify(
        this.records,
        0,
        this.cmp,
        this.records.length,
        this.emit.bind(this, 'exchange')
    );
    return rec;
};

function left(i) {
    return (i << 1) + 1;
}

function right(i) {
    return (i + 1) << 1;
}

function parent(i) {
    return i <= 0 ? null : ((i - 1) >> 1);
}

function sort(A, cmp) {
    if (typeof cmp !== 'function') {
        cmp = cmpFromMinHeap(!!cmp);
    }
    var size = A.length;
    buildHeap(A, cmp);
    cmp = wrapHeapCompare(cmp);
    for (var i = A.length - 1; i > 0; i--) {
        exchange(A, 0, i);
        heapify(A, 0, cmp, --size);
    }
    return A;
}

function buildHeap(A, minHeap, cb) {
    var cmp = minHeap;
    if (typeof cmp !== 'function') {
        cmp = wrapHeapCompare(defaultCmp, minHeap);
    } else {
        cmp = wrapHeapCompare(cmp);
    }
    var size = A.length;
    for (var i = parent(size - 1); i >= 0; i--) {
        heapify(A, i, cmp, size, cb);
    }
    return A;
}

function heapify(A, i, cmp, size, cb) {
    if (!cmp) {
        cmp = wrapHeapCompare(defaultCmp);
    }
    if (size == null) {
        size = A.length;
    }
    var l = left(i);
    var r = right(i);
    var next = i;
    if (l < size && cmp(A[next], A[l])) {
        next = l;
    }
    if (r < size && cmp(A[next], A[r])) {
        next = r;
    }
    if (next !== i) {
        exchange(A, i, next);
        if (cb) {
            cb(i, next, A);
        }
        heapify(A, next, cmp, size, cb);
    }
    return A;
}

function defaultCmp(a, b) {
    return a - b;
}

function exchange(A, i, j) {
    var t = A[i];
    A[i] = A[j];
    A[j] = t;
}

function cmpFromMinHeap(minHeap) {
    if (minHeap) {
        return function (a, b) {
            return b - a;
        }
    }
    return defaultCmp;
}

function wrapHeapCompare(cmp, minHeap) {
    return function (a, b) {
        var d = cmp(a, b);
        if (minHeap) {
            return d > 0;
        }
        return d < 0;
    };
}
