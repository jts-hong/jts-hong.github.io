---
title: "Algorithms"
description: ""
date: 2024-12-24T17:06:45-05:00
lastmod: 2024-12-24T17:06:45-05:00
categories:
tags:
draft: false
cover:
    image: "algorithms.jpg"
    alt: "algorithms"
    hidden: false
    hiddenInList: false
    hiddenInSingle: false
---


## Easy

### Linear Search

This is the simplest searching algorithm. It sequentially checks each element of the list until a match is found or the whole list has been searched.

```Python
def linear_search(arr, x):
   for i in range(len(arr)):
      if arr[i] == x:
         return i
   return -1

```

### Binary Search

A more efficient searching algorithm than linear search, but it requires the list to be sorted. It starts by checking the middle element of a list and divides the search space in half at each step until it finds the target element or exhausts the search space.

```Python
def binary_search(arr, low, high, x):
   if high >= low:
      mid = (high + low) // 2
      if arr[mid] == x:
         return mid
      elif arr[mid] > x:
         return binary_search(arr, low, mid - 1, x)
      else:
         return binary_search(arr, mid + 1, high, x)
   else:
      return -1
```

### Bubble Sort

A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.

```Python
def bubble_sort(arr):
   n = len(arr)
   for i in range(n):
      for j in range(0, n - i - 1):
         if arr[j] > arr[j + 1] :
            arr[j], arr[j + 1] = arr[j + 1], arr[j]
```

### Selection Sort

This sorting algorithm divides the list into a sorted and an unsorted region. It repeatedly selects the smallest (or largest, depending on the ordering) element from the unsorted region and moves it to the sorted region.

```Python
def selection_sort(arr):
   for i in range(len(arr)):
      min_idx = i
      for j in range(i+1, len(arr)):
         if arr[min_idx] > arr[j]:
            min_idx = j
      arr[i], arr[min_idx] = arr[min_idx], arr[i]
```

## Medium

### Insertion Sort

This sorting algorithm builds a sorted list one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.

```Python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i-1
        while j >=0 and key < arr[j] :
                arr[j+1] = arr[j]
                j -= 1
        arr[j+1] = key
```

### Quick Sort

This is a divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.

```Python
def partition(arr, low, high):
    i = (low-1)
    pivot = arr[high]
    for j in range(low, high):
        if arr[j] <= pivot:
            i = i+1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return (i+1)

def quick_sort(arr, low, high):
    if len(arr) == 1:
        return arr
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi-1)
        quick_sort(arr, pi+1, high)
```

### Merge Sort

Another divide-and-conquer sorting algorithm that involves splitting the array into two halves, sorting them, and then merging them.

```Python
def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr)//2
        L = arr[:mid]
        R = arr[mid:]
        merge_sort(L)
        merge_sort(R)
        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
```

### Depth-First Search (DFS)

A common graph traversal algorithm. It explores as far as possible along each branch before backtracking.

```Python
def DFS(graph, v, visited):
    visited[v] = True
    print(v, end = ' ')
    for i in graph[v]:
        if visited[i] == False:
            DFS(graph, i, visited)
```

### Breadth-First Search (BFS)

Another common graph traversal algorithm. It visits all the vertices of a graph at the same "level" before going to the next level.

```Python
from collections import deque

def BFS(graph, root):
    visited = set()
    queue = deque([root])
    visited.add(root)

    while queue:
        vertex = queue.popleft()
        print(str(vertex) + " ", end="")
        for neighbour in graph[vertex]:
            if neighbour not in visited:
                queue.append(neighbour)
                visited.add(neighbour)
```

## Hard

### Heap Sort

This comparison-based sorting algorithm transforms the input data structure into a binary heap data structure. It then uses the heap pop operation to obtain the elements in sorted order.

```Python
def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[i] < arr[l]:
        largest = l
    if r < n and arr[largest] < arr[r]:
        largest = r
    if largest != i:
        arr[i],arr[largest] = arr[largest],arr[i]
        heapify(arr, n, largest)

def heapSort(arr):
    n = len(arr)
    for i in range(n//2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n-1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
```

### Dijkstra's Algorithm

This algorithm is used to find the shortest path between nodes in a graph. It works for both directed and undirected graphs.

```Python
import heapq

def dijkstra(graph, start_vertex):
    D = {v: float('inf') for v in graph}
    D[start_vertex] = 0

    queue = [(0, start_vertex)]
    while queue:
        d, v = heapq.heappop(queue)
        if d != D[v]:
            continue
        for neighbour, length in graph[v].items():
            old_distance = D[neighbour]
            new_distance = D[v] + length
            if new_distance < old_distance:
                D[neighbour] = new_distance
                heapq.heappush(queue, (new_distance, neighbour))
    return D
```

### Bellman-Ford Algorithm

This algorithm computes shortest paths in a weighted graph where some of the edge weights may be negative.

```Python
def bellman_ford(graph, start_vertex):
    distance, predecessor = dict(), dict()
    for node in graph:
        distance[node], predecessor[node] = float('inf'), None
    distance[start_vertex] = 0

    for _ in range(len(graph) - 1):
        for node in graph:
            for neighbour in graph[node]:
                if distance[neighbour] > distance[node] + graph[node][neighbour]:
                    distance[neighbour], predecessor[neighbour] = distance[node] + graph[node][neighbour], node
    return distance, predecessor

```

### Floyd-Warshall Algorithm

This is an algorithm for finding shortest paths in a weighted graph with positive or negative edge weights.

```Python
def floyd_warshall(graph):
    distance = dict()
    for node in graph:
        distance[node] = dict()
        for neighbour in graph:
            distance[node][neighbour] = graph[node][neighbour]

    for intermediate_node in graph:
        for start_node in graph:
            for end_node in graph:
                direct = distance[start_node][end_node]
                via_i = distance[start_node][intermediate_node] + distance[intermediate_node][end_node]
                if direct > via_i:
                    distance[start_node][end_node] = via_i
    return distance

```

### Binary Search Tree

A Binary Search Tree (BST) is a tree in which all the nodes follow the below property: the left sub-tree of a node has a key less than its parent node's key, while the right sub-tree of a node has a key greater than to its parent node's key.

```Python
class Node:
    def __init__(self, key):
        self.left = None
        self.right = None
        self.val = key

def insert(root, key):
    if root is None:
        return Node(key)
    else:
        if root.val < key:
            root.right = insert(root.right, key)
        else:
            root.left = insert(root.left, key)
    return root

def inorder(root):
    if root:
        inorder(root.left)
        print(root.val),
        inorder(root.right)
```

### Knapsack Problem Algorithms

The knapsack problem is an optimization problem used to illustrate both problem-solving and computational complexity. There are various algorithms to solve it, including brute force, greedy, and dynamic programming.

```Python
def knapSack(W, wt, val, n):
    K = [[0 for w in range(W+1)] for i in range(n+1)]
 
    for i in range(n+1):
        for w in range(W+1):
            if i == 0 or w == 0:
                K[i][w] = 0
            elif wt[i-1] <= w:
                K[i][w] = max(val[i-1] + K[i-1][w-wt[i-1]], K[i-1][w])
            else:
                K[i][w] = K[i-1][w]
 
    return K[n][W]

# Test the function with a problem instance
val = [60, 100, 120]
wt = [10, 20, 30]
W = 50
n = len(val)
print(knapSack(W, wt, val, n))  # Outputs 220
```

In this example, W is the maximum weight the knapsack can hold, wt is the list of weights of the items, val is the list of values of the items, and n is the number of items.

This function works by building up a 2D array K[][] where each element K[i][w] stores the maximum value that can be achieved with i items and a maximum weight of w. For each item, it considers if it's optimal to include the item or not by comparing the maximum value achieved by including the item (val[i-1] + K[i-1][w-wt[i-1]]) and the maximum value achieved by excluding the item (K[i-1][w]), and takes the maximum of these two values.

### Travelling Salesman Problem Algorithms

The travelling salesman problem is a classic algorithmic problem focused on optimization. It focuses on optimization. In this problem, a salesman is given a list of cities, and must determine the shortest route that allows him to visit each city once and return to his original location.

```Python
from sys import maxsize
from itertools import permutations
V = 4

def travellingSalesmanProblem(graph, s):
 
    vertex = []
    for i in range(V):
        if i != s:
            vertex.append(i)
 
    min_path = maxsize
    next_permutation=permutations(vertex)
    for i in next_permutation:
 
        current_pathweight = 0
 
        k = s
        for j in i:
            current_pathweight += graph[k][j]
            k = j
        current_pathweight += graph[k][s]
 
        min_path = min(min_path, current_pathweight)
         
    return min_path
 
 
if __name__ == "__main__":
 
    graph = [[0, 10, 15, 20], [10, 0, 35, 25],
            [15, 35, 0, 30], [20, 25, 30, 0]]
    s = 0
    print(travellingSalesmanProblem(graph, s))
```

In this code, s is the starting point, and graph[i][j] is the length of the path from i to j. This code iterates over all permutations of the vertices (excluding the starting vertex s) to find the minimum weight cycle.

Please note that this code has a time complexity of O(n!), where n is the number of vertices, because it tries all possible permutations. Therefore, it can be very slow for larger graphs. There are more efficient algorithms to solve the TSP for special cases (like when the graph satisfies the triangle inequality), and there are also approximation algorithms for the general case.

## Dynamic Programing

Dynamic programming (DP) is a method for solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions - ideally, using a memory-based data structure.

The idea is to save computation time by avoiding needless recomputation of identical subproblems - this is also known as "memoization". The technique was developed by Richard Bellman in the 1950s and has found applications in numerous fields, from aerospace engineering to economics.

The key concept here is the "principle of optimality," which is the idea that the optimal solution to a problem can be constructed from the optimal solutions of its subproblems.

Dynamic programming is typically used for optimization problems. A classic example is the "coin change problem," which goes as follows:

"Given a target amount n and a list (array) of distinct coin values, what's the fewest coins needed to make the change amount?"

Here is a basic solution in Python:

```Python
def dpMakeChange(coinValueList, change, minCoins):
    for cents in range(change + 1):
        coinCount = cents
        for j in [c for c in coinValueList if c <= cents]:
            if minCoins[cents - j] + 1 < coinCount:
                coinCount = minCoins[cents - j] + 1
        minCoins[cents] = coinCount
    return minCoins[change]

print(dpMakeChange([1, 5, 10, 25], 63, [0]*64))
```

In this code, coinValueList is a list of denominations of coins, change is the amount we want to make change for, and minCoins is a list of the minimum number of coins needed to make change for each value from 0 to change.

The function dpMakeChange computes the minimum number of coins needed to make change for all values from 0 to change, and stores these results in minCoins. It then returns the minimum number of coins needed to make change for change.

When dpMakeChange is called with coinValueList = [1, 5, 10, 25], change = 63, and minCoins = [0]*64 (a list of 64 zeroes), it returns 6 because the fewest coins we need to make change for 63 cents with coins of those denominations is 6 (two 25-cent coins, one 10-cent coin, and three 1-cent coins).
