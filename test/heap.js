var test = require('tape');
var Heap = require('../lib/heap.js');

test('Heap', function (t) {
    t.same(Heap([1]), [1], 'one');
    t.same(Heap([1, 2]), [2, 1], 'two');
    t.same(Heap([1, 2, 3]), [3, 2, 1], 'three');
    t.same(Heap([1, 2, 3, 0]), [3, 2, 1, 0], 'four');
    t.same(Heap([1, 2, 3, 0, -1]), [3, 2, 1, 0, -1], 'five');
    t.same(Heap([1, 2, 3, 0, 4]), [4, 2, 3, 0, 1], 'five');
    t.end();
});


var test = require('tape');
var Heap = require('..');
var left = Heap.left;
var right = Heap.right;
var parent = Heap.parent;

test('left', function (t) {
    t.equal(left(0), 1);
    t.equal(left(1), 3);
    t.equal(left(2), 5);
    t.end();
});

test('right', function (t) {
    t.equal(right(0), 2);
    t.equal(right(1), 4);
    t.equal(right(2), 6);
    t.end();
});

test('parent', function (t) {
    t.equal(parent(0), null);
    t.equal(parent(1), 0);
    t.equal(parent(2), 0);
    t.equal(parent(3), 1);
    t.equal(parent(4), 1);
    t.equal(parent(5), 2);
    t.equal(parent(6), 2);
    t.end();
});

var test = require('tape');
var heapify = require('..').heapify;

test('heapify', function (t) {
    t.same(heapify([1], 0), [1], 'one');
    t.same(heapify([1, 2], 0), [2, 1], 'two');
    t.same(heapify([1, 2], 1), [1, 2], 'two');
    t.same(heapify([1, 2, 3], 0), [3, 2, 1], 'three');
    t.same(heapify([1, 2, 3], 1), [1, 2, 3], 'three');
    t.same(heapify([1, 2, 3], 2), [1, 2, 3], 'three');
    t.same(heapify([1, 2, 3, 0], 0), [3, 2, 1, 0], 'four');
    t.end();
});

var test = require('tape');
var sort = require('..').sort;
var perm = require('array-permutation');

test('sort, ascending', function (t) {
    var input = perm.range(4);
    var iter = perm(input);
    for(var p of iter) {
        t.same(sort(p), input);
    }
    t.end();
});

test('sort, descending', function (t) {
    var input = perm.range(4, 0, -1);
    var iter = perm(input);
    for(var p of iter) {
        t.same(sort(p, true), input);
    }
    t.end();
});

