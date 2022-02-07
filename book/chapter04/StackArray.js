class StackArray {
  _length = 0
  constructor() {
    this.items = []
  }
  push(element) {
    this.items.push(element)
    this._length++
  }
  pop() {
    if (!this.isEmpty()) this._length--
    return this.items.pop()
  }
  peek() {
    return this.items[this._length - 1]
  }
  isEmpty() {
    return this._length === 0
  }
  size() {
    return this._length
  }
  clear() {
    this.items = []
    this._length = 0
  }
}

module.exports = StackArray
