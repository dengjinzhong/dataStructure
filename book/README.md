# 学习 JavaScript 数据结构与算法(第三版)

## 栈(Stack)
栈是一种遵从后进先出（LIFO）原则的有序集合。

例如: 一摞书或者餐厅里叠放的盘子

#### 模拟栈数据结构

我们将创建一个类来表示栈。并为栈声明以下方法:

 push(element(s))：添加一个（或几个）新元素到栈顶。

 pop()：移除栈顶的元素，同时返回被移除的元素。

 peek()：返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）。 

 isEmpty()：如果栈里没有任何元素就返回 true，否则返回 false。

 clear()：移除栈里的所有元素。

 size()：返回栈里的元素个数。该方法和数组的 length 属性很类似。

 toString()：将栈作为字符串返回。

#### 基于数组的栈

```javascript
class StackArray {
  constructor() {
    this.items = []
  }
  push(element) {
    this.items.push(element)
  }
  pop() {
    return this.items.pop()
  }
  peek() {
    return this.items[this.items.length - 1]
  }
  isEmpty() {
    return this.items.length === 0
  }
  size() {
    return this.items.length
  }
  clear() {
    this.items = []
  }
}
```

#### 基于对象的栈

```javascript
class StackObject {
  constructor() {
    this.count = 0
    this.items = {}
  }
  push(element) {
    this.items[this.count] = element
    this.count++
  }
  size() {
    return this.count
  }
  isEmpty() {
    return this.count === 0
  }
  pop() {
    if (this.isEmpty()) return undefined
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }
  peek() {
    if (this.isEmpty()) return undefined
    return this.items[this.count - 1]
  }
  clear() {
    this.items = []
    this.count = 0
  }
  toString() {
    if (this.isEmpty()) return ''
    let objString = `${this.items[0]}`
    for (let i = 0; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }
}
```

#### 用栈解决问题
栈的实际应用非常广泛。在回溯问题中，它可以存储访问过的任务或路径、撤销的操作（后
面的章节讨论图和回溯问题时，我们会学习如何应用这个例子）。Java 和 C#用栈来存储变量和方
法调用，特别是处理递归算法时，有可能抛出一个栈溢出异常（后面的章节也会介绍）。

本节，我们将介绍如何解决十进制转二进制问题，以及任意进制转换的算法。

#### 从十进制到二进制
要把十进制转化成二进制，我们可以将该十进制数除以 2（二进制是满二进一）并对商取整，
直到结果是 0 为止。简单来说就是除 2 取余，逆序排列

我们可以利用栈来实现算法, 如下:
```javascript
function decimalToBinary(decNumber) {
  const remStack = new Stack()

  let number = decNumber
  let rem
  let binaryString = ''

  while (number > 0) {
    rem = Math.floor(number % 2)
    remStack.push(rem)
    number= Math.floor(number / 2)
  }
  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString()
  }

  return binaryString
}
```

改良一下使之能把十进制转换成基数为 2～36 的任意进制。

```javascript
function baseConverter(decNumber, base) {
  const remStack = new Stack()
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let number = decNumber
  let rem
  let baseString = ''
  if (!(base >= 2 && base <= 36)) {
    return ''
  }

  while (number > 0) {
    rem = Math.floor(number % base)
    remStack.push(rem)
    number = Math.floor(number/ base)
  }

  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()]
  }

  return baseString
}
```


## 队列(Queue)

队列是遵循先进先出（FIFO，也称为先来先服务）原则的一组有序的项。

最常见的队列的例子就是排队

#### 模拟队列数据结构

 enqueue(element(s))：向队列尾部添加一个（或多个）新的项。

 dequeue()：移除队列的第一项（即排在队列最前面的项）并返回被移除的元素。

 peek()：返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做
任何变动（不移除元素，只返回元素信息——与 Stack 类的 peek 方法非常类似）。该方
法在其他语言中也可以叫作 front 方法。

 isEmpty()：如果队列中不包含任何元素，返回 true，否则返回 false。

 size()：返回队列包含的元素个数，与数组的 length 属性类似。

 clear()：移除栈里的所有元素。

 toString()：将队列作为字符串返回。

#### 基于对象的队列

```javascript
class Queue {
  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }
  enqueue(element) {
    this.items[this.count] = element
    this.count ++
  }
  dequeue() {
    if (this.isEmpty()) return undefined
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount ++
    return result
  }
  peek() {
    if (this.isEmpty()) return undefined
    return this.items[this.lowestCount]
  }
  size() {
    return this.count - this.lowestCount
  }
  isEmpty() {
    return this.size() === 0
  }
  clear() {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }
  toString() {
    if (this.isEmpty()) return
    let objString = `${this.items[this.lowestCount]}`
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }
}
```

#### 双端队列(Deque)
双端队列（deque，或称 double-ended queue）是一种允许我们同时从前端和后端添加和移除
元素的特殊队列。

* addFront(element)：该方法在双端队列前端添加新的元素。
* addBack(element)：该方法在双端队列后端添加新的元素（实现方法和 Queue 类中的 enqueue 方法相同）。
* removeFront()：该方法会从双端队列前端移除第一个元素（实现方法和 Queue 类中的 dequeue 方法相同）。
* removeBack()：该方法会从双端队列后端移除第一个元素（实现方法和 Stack 类中的 pop 方法一样）。
* peekFront()：该方法返回双端队列前端的第一个元素（实现方法和 Queue 类中的 peek 方法一样）。
* peekBack()：该方法返回双端队列后端的第一个元素（实现方法和 Stack 类中的 peek 方法一样）。

```javascript
class Deque {
  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }
  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element)
    } else if (this.lowestCount > 0) {
      this.lowestCount --
      this.items[this.lowestCount] = element
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1]
      }
      this.count ++
      this.lowestCount = 0
      this.items[0] = element
    }
  }
  addBack(element) {
    this.items[this.count] = element
    this.count ++
  }
  removeFront() {
    if (this.isEmpty()) return undefined
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount ++
    return result
  }
  removeBack() {
    if (this.isEmpty()) return undefined
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }
  peekFront() {
    if (this.isEmpty()) return undefined
    return this.items[this.lowestCount]
  }
  peekBack() {
    if (this.isEmpty()) return undefined
    return this.items[this.count - 1]
  }
  size() {
    return this.count - this.lowestCount
  }
  isEmpty() {
    return this.size() === 0
  }
  clear() {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }
  toString() {
    if (this.isEmpty()) return
    let objString = `${this.items[this.lowestCount]}`
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }
}
```

#### 击鼓传花游戏
由于队列经常被应用在计算机领域和我们的现实生活中，就出现了一些队列的修改版本，我
们会在本章实现它们。这其中的一种叫作循环队列。循环队列的一个例子就是击鼓传花游戏（hot
potato）。在这个游戏中，孩子们围成一个圆圈，把花尽快地传递给旁边的人。某一时刻传花停止，
这个时候花在谁手里，谁就退出圆圈、结束游戏。重复这个过程，直到只剩一个孩子（胜者）。

```javascript
function hotPotato(elementsList, num) {
  const queue = new Queue()
  const elimitatedList = []

  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i])
  }

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }
    elimitatedList.push(queue.dequeue())
  }

  return {
    eliminated: elimitatedList,
    winner: queue.dequeue()
  }
}
```

模拟游戏
```javascript
const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
const result = hotPotato(names, 7);
result.eliminated.forEach(name => {
  console.log(`${name}在击鼓传花游戏中被淘汰。`);
});
console.log(`胜利者： ${result.winner}`);
```

#### 回文检查器
下面是维基百科对回文的解释。

> 回文是正反都能读通的单词、词组、数或一系列字符的序列，例如 madam或 racecar。

有不同的算法可以检查一个词组或字符串是否为回文。最简单的方式是将字符串反向排列并
检查它和原字符串是否相同。如果两者相同，那么它就是一个回文。我们也可以用栈来完成，但
是利用数据结构来解决这个问题的最简单方法是使用双端队列。

```javascript
function palindromeChecker(aString) {
  if (aString === undefined || aString === null || (aString.length === 0)) {
    return false
  }
  const deque = new Deque()
  const lowerString = aString.toLocaleString().split(' ').join('')
  let isEqual = true
  let firstChar, lastChar;
  for (let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString.charAt(i))
  }

  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront()
    lastChar = deque.removeBack()
    if (firstChar !== lastChar) {
      isEqual = false
    }
  }

  return isEqual
}
```

测试结果

```javascript
console.log('a', palindromeChecker('a'));
console.log('aa', palindromeChecker('aa'));
console.log('kayak', palindromeChecker('kayak'));
console.log('level', palindromeChecker('level'));
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw'));
console.log('Step on no pets', palindromeChecker('Step on no pets'));
```
