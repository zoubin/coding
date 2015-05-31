# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    # @return a ListNode
    def addTwoNumbers(self, l1, l2):
        p1, p2 = l1, l2
        p = self.make(p1.val + p2.val)
        ret = p
        while p1.next != None and p2.next != None:
            p1, p2 = p1.next, p2.next
            p.next = self.make(p1.val + p2.val)
            p = p.next
        while p1.next != None:
            p1= p1.next
            p.next = self.make(p1.val)
            p = p.next
        while p2.next != None:
            p2= p2.next
            p.next = self.make(p2.val)
            p = p.next
        if self.carry == 1:
            p.next = ListNode(1)
        return ret
    def make(self, n):
        n = n + self.carry
        if n > 9:
            n = n - 10
            self.carry = 1
        else:
            self.carry = 0
        return ListNode(n)
    def __init__(self):
        self.carry = 0
