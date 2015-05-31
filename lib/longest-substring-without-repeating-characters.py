class Solution:
    # @return an integer
    def lengthOfLongestSubstring(self, s):
        ret = r = start = 0
        cache = {}
        i = 0
        l = len(s)
        while i < l:
            c = s[i]
            ci = cache.get(c)
            cache[c] = i
            if ci == None or ci < start:
                r = r + 1
            else:
                ret = r if r > ret else ret
                start = ci + 1
                r = i - ci
            i = i + 1
        ret = r if r > ret else ret
        return ret

sol = Solution()
cases = ['c', 'aab', 'abc', 'abcabcab', 'abcabcdabceabb']
for c in cases:
    print(c, sol.lengthOfLongestSubstring(c))
