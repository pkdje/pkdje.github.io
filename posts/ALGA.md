---
title: "알고리즘 정리"
date: "2025-01-27"
tags: ["알고리즘"]
category: "dm"
---

25-2에 알고리즘을 수강하며 시험 준비를 위해 개인적으로 작성한 알고리즘 정리본을 공유하려고 한다. 해당 정리본을 바탕으로 개인적으로 만족하는 성적도 받았기에 복습하 듯 업로드 하면 한학기를 정리하는데 많은 도움이 될 것 같다.
해당 게시글에 한 학기 내용을 전부 담을 예정이며 차근차근 복습 겸 읽어본 만큼만 추가할 예정이다.

Lec 1 ~ 5
```text
- Integer Multi(Grade school mult) 
>> n^2mult + n^2+2n add.	

- Divide and conquer(=Break problem up into smaller sub-problems)

- Multiply(x,y): 
If n=1: Return xy, 
x= a{10}^{n/2}+b, 
y= c{10}^{n/2}+d, 
Recursively compute ac, ad, bc, bd: 
ac = Multiply(a,c), etc... 
Add them up to get xy:
xy= ac{10}^n+(ad+bc){10}^{n/2}+bd. 
we cut n in half log2n times, so at level log2n, 
we got n^2 problems of size 1. (4 p in one cut).

- Karatsuba find 
(a+b)(c+d) = ac + bd + bc + ad. 
So compute only 3. ac, bd and (a+b)(c+d). 
ad+bc can compute by sub. 3^{log2n}=n^{1.6}

- Multi(x,y): If n=1: return xy, 
x= a{10}^{n/2}+b, y= {10}^{n/2}+d. 
ac= Multi(a,c), bd= Milti(b,d),
z= Multi(a+b,c+d), xy= ac{10}^n+(z-ac-bd){10}^{n/2}+bd. Return xy

- Insertion Sort 
Using linear search, 
find the location in the sorted portion. 
Move all the elements after the insertion location up one 
position to make space. O(n2)

- Proof by induction: Hypothesis, Base, Inductivestep

- def InsertionSort(A): 
for i in range(1,len(A)): 
current = A[i], j=i-1, 
# j=i-1 시작. j가 0보다크고 A[j]가 A[i]보다 크면 A[j]를 오른쪽 이동
while j>=0 and A[j]>current: 
A[j+1]=A[j], j-=1 ; A[j+1]=current.

- variable assignments = {2n}^2-n-1
increments/decrements={2n}^2-n-1
comparisons = {2n}^2-4n+1

- Asymptotic Analysis: 
Pros: away from hardware and language specific issues. 
much more tractable. allow meaningfully compare how alg 
will perform on large input. 
Cons: Only makes sense if n is large(compared to the 
constant factors) prove not by contradiction

- BigO mean T(n)=O(g(n)) = (T(n) <= c*g(n)),
omega=revers, theta=both

- Are there func f,g neither f=O(g) nor f=Ω(g)
>> Yes. give condition.

- InsertonSort running time>> n-1 iterations 
and n interations in worst case in while. >> O(n^2)

- MergeSort: a divide and conquer approch. merge need O(k)

- MergeSort(A):n=length(A)
if n<=1: returnA, 
L= Mergesort(A[-:n/2], R=Mergesrot(A[n/2:n])), 
return Merge(L,R). 

- Runningtime Recursion tree: 
level 0 > problem 1 > size n > O(n) works.
level logn > n > 1 > O(n). 
Thus, O(n) steps per level, logn+1 levels, O(nlogn) total.
Also, T(n) = 2*T(2/n) + O(n).

- Master: 
O(n^dlogn) if a = b^d, 
O(n^d) if a < b^d 
O(n^(log_b(a))) if a > b^d

- The eternal struggle, Branching cause the # of p to
explode. The most work is at the bottom. P lower are smaller, the most is at the bottom.

- The substitution Method, more general. 
1. Generate a guess at the correct answer. 
2. Try to prove that your guess. 
3. Profit.

- T(n) = T(n/2) + n >> O(n), 
- T(n) = 4T(n/2)+n >> O(n^2)
- T(n) = 2T(n/2) + n >> T(k) = 2T(k/2) + k 
= 2(k/2log(k/2)+1)+k = k(logk+1)
- T(n) = 2T(n/2)+32n, T(k) = 2T(k/2)+32k <= 2c(k/2)log(k/2)+32k = 
k(clogk+32-c) <= kclogk as long as C>=32 O(nlogn)
- T(n)<=T(n/5)+T(7n/10)+n. k>10 >> T(n) <= 10n=O(n)

- K-select problem: Return the k-th smallest element of A. 

- O(nlogn) time: 
Select(A, k): A=MergeSort(A), return A[k-1]

- k-select solution: 
Idea: divide and conquer.
Say we want to kind SELECT(A, k). 
First, pick a privot. 
Next, partition the array into bigger than 6 or less than 6
(Partition step take time O(n)). 

- Psuedocode: Select(A,k): 
If len(A) <= 50: 
A = Merge Sort(A), 
Return A[k-1] || p = getPivot(A), 
L, pivotVal, R = Partition(A,p), 
if len(L) == k-1: 
return privotVal, 
Else if len(L) > k-1: 
return Select(L,k), 
Else if len(L) < k-1: 
return Select(R, k-len(L)-1). 

-bSelect running time: T(n) = T(len(L)) + O(n) or T(len(R)) + O(n) or O(n). 
Len(L) and Len(R) depends on how we pick the pivot.

-nThe ideal pivot: Split the input exactly in half. 
Then, T(n)<= T(n/2) + O(n). 
By Master Theorem, T(n) <= O(n^d) = O(n).

- The worst pivot: the first elements or last elements >> O(n^2)

- How do we pick a good pivot? 
If there's no bad guy, works well. But if there is a bad guy,,,,. 
(Although in practice, there is often no bad guy. in this case, just pick a random pivot.) 
>> We'd like to Approximate the ideal world. 
Pick the pivot to divide the input about in half.

- A good enough pivot: 3n/10 < len(L and R) < 7n/10. 
T(n) <= T(7n/10) + O(n), a= 1, n= 10/7, d = 1 >> O(n).

- Pseudocode Choospivot(A) 
= Median of Medians and divide and conquer: 
Split A into m=n/5(A=13>>m=3) groups, of size <=5 each.
For i=1,..., m: Find the median within the i'th group, call it pi. 
|| p = SELECT([p1,...pm], m/2). 
return the index of p in A. 
Find median takes O(1) for each group, 
since it has size 5, so O(m)=O(n) total in the for loop. 
>> len(L and. ) <= 7n/10 + 5

- Runnnig time: T(n) <= T(n/5) + T(7n/10) + O(n) = O(n) 
>> prove by Substitution Method. 
```