class Solution:
    # @return a tuple, (index1, index2)
    def twoSum(self, num, target):
        d = {}
        i = 0
        n = len(num)
        while i < n:
            v = num[i]
            j = d.get(target - v)
            if j != None:
                if i < j:
                    return i + 1, j + 1
                return j + 1, i + 1
            d[v] = i
            i = i + 1
        return 0, 0
