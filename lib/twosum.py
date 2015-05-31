# https://leetcode.com/problems/two-sum/

class Solution:
    # @return a tuple, (index1, index2)
    def twoSum(self, num, target):
        sortedNum = sorted(enumerate(num), key=lambda item: item[1])
        i = 0
        j = len(num) - 1
        while i < j:
            index1, num1 = sortedNum[i]
            index2, num2 = sortedNum[j]
            if index1 > index2:
                index1, index2 = index2, index1
            sum = num1 + num2
            if sum == target:
                return index1 + 1, index2 + 1
            if sum < target:
                i = i + 1
            else:
                j = j - 1
        return 0, 0
