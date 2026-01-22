---
title: "백준 28782 Stack"
date: "2025-01-22"
tags: ["Python"]
category: "baek"
---

## 간단한 스택 구현하기

![문제사진](/images/baek28278.png)

## 스택(Stack)이란? 

1. LIFO (Last in First Out)
마지막에 넣은 것이 가장 먼저 나오는 자료구조이다.

기본 연산은 아래와 같으며 모든 연산이 O(1)의 시간 복잡도를 가진다.
```text
push(x)   : 스택에 x 추가
pop()     : 맨 위 원소 제거하고 반환
peek()/top(): 맨 위 원소 확인 (제거 안 함)
is_empty(): 비어있는지 확인
size()    : 스택 크기
```

하지만 특정 값을 찾고 싶을 때(Search)는 O(n)의 시간 복잡도를 가진다.

파이썬의 경우 list를 스택과 동일하게 사용할 수 있다.

## 제출 답안

```python
import sys

class Stack:
    def __init__(self):
        self.item_list=[]
    
    def push(self, item):
        self.item_list.append(item)
        
    def valuepop(self):
        if self.empty()==1:
            return -1
        else: return(self.item_list.pop())
        
    def item_len(self):
        return(len(self.item_list))
    
    def empty(self):
        if len(self.item_list)==0:
            return 1
        else:
            return 0
    
    def not_empty(self):
        if len(self.item_list)==0:
            return(-1)
        else: return(self.item_list[-1])

N = int(sys.stdin.readline().rstrip())
stack = Stack()

for i in range(N):
    instruction = sys.stdin.readline().rstrip().split()
    if instruction[0] == '1':
        stack.push(int(instruction[1]))
    elif instruction[0] == '2':
        print(stack.valuepop())
    elif instruction[0] == '3':
        print(stack.item_len())
    elif instruction[0] == '4':
        print(stack.empty())
    elif instruction[0] == '5':
        print(stack.not_empty())
```