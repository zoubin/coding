class Solution:
    # @return a float
    def findMedianSortedArrays(self, A, B):
        len_a, len_b = len(A), len(B)
        if len_a == 0 and len_b == 0:
            return None
        if len_a == 0:
            return self.median(B)
        if len_b == 0:
            return self.median(A)
        ret = self.findMedianInOneArray(A, B)
        return ret if ret != None else self.findMedianInOneArray(B, A)
    def findMedianInOneArray(self, C, D):
        len_c, len_d = len(C), len(D)
        max_index_c, max_index_d = len_c - 1, len_d - 1
        median_index = (len_c + len_d - 1) // 2
        is_c_not_desc = len_c == 1 or C[0] <= C[max_index_c]
        is_d_not_desc = len_d == 1 or D[0] <= D[max_index_d]
        def getActualIndexOfC(index_not_desc):
            return index_not_desc if is_c_not_desc else max_index_c - index_not_desc
        def getActualIndexOfD(index_not_desc):
            return index_not_desc if is_d_not_desc else max_index_d - index_not_desc
        def isValidIndexOfC(index):
            return index >= 0 and index <= max_index_c
        def isValidIndexOfD(index):
            return index >= 0 and index <= max_index_d
        def calcMedian(index_not_desc):
            c = C[getActualIndexOfC(index_not_desc)]
            if (len_c + len_d) % 2:
                return c
            # even, have to check the next number
            next_in_c = getActualIndexOfC(index_not_desc + 1)
            next_in_d = getActualIndexOfD(median_index - index_not_desc)
            if isValidIndexOfC(next_in_c) and isValidIndexOfD(next_in_d):
                return (C[next_in_c] + c) / 2.0 if C[next_in_c] <= D[next_in_d] else (D[next_in_d] + c) / 2.0
            if isValidIndexOfC(next_in_c):
                return (c + C[next_in_c]) / 2.0
            if isValidIndexOfD(next_in_d):
                return (c + D[next_in_d]) / 2.0
            print('oops! Both index ecllipsed max: ', next_in_c, C, next_in_d, D)
            return None
        min_search_range = max(0, median_index - len_d)
        max_search_range = min(median_index, max_index_c)
        low_search_range, high_search_range = min_search_range, max_search_range
        while low_search_range <= high_search_range:
            # count of numbers already ecllipsed in C
            target_index_not_desc = (low_search_range + high_search_range) // 2
            # count of numbers expected to be ecllipsed in D
            # if number in C at target_index_not_desc can be positioned at test_index_not_desc in D, we find it
            test_index_not_desc = median_index - target_index_not_desc
            target_index = getActualIndexOfC(target_index_not_desc)
            test_index = getActualIndexOfD(test_index_not_desc)
            if test_index_not_desc == len_d:
                if D[getActualIndexOfD(test_index_not_desc - 1)] <= C[target_index]:
                    return calcMedian(target_index_not_desc)
                low_search_range = target_index_not_desc + 1
            elif test_index_not_desc == 0:
                if D[getActualIndexOfD(0)] >= C[target_index]:
                    return calcMedian(target_index_not_desc)
                high_search_range = target_index_not_desc - 1
            else:
                if D[getActualIndexOfD(test_index_not_desc - 1)] <= C[target_index] and D[test_index] >= C[target_index]:
                    return calcMedian(target_index_not_desc)
                if D[getActualIndexOfD(test_index_not_desc - 1)] > C[target_index]:
                    low_search_range = target_index_not_desc + 1
                else:
                    high_search_range = target_index_not_desc - 1
        return None
    def median(self, E):
        len_e = len(E)
        index = (len_e - 1) // 2
        return E[index] if len_e % 2 else (E[index] + E[index + 1]) / 2.0

sol = Solution()
cases = [
    ([6, 4, -2], [1, 5, 7]),
    ([6, 4], [1, 5, 7]),
    ([1, 5, 7], [6, 4]),
    ([1, 2], [1, 2]),
    ([1, 2], [1]),
    ([], [2, 3]),
    ([], [1]),
    ([1], []),
    ([1], [1])
]
for A, B in cases:
    print('#####')
    print('A: ', A)
    print('B: ', B)
    print(sol.findMedianSortedArrays(A, B))
