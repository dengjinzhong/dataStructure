// const Stack = require('./StackArray')
// const Stack = require('./StackObject')
const Stack = require('./StackSymbol')

const stack = new Stack();
console.log(stack.isEmpty()); // 输出为 true

stack.push(5);
stack.push(8);

console.log(stack.peek()); // 输出 8

stack.push(11);
console.log(stack.size()); // 输出 3
console.log(stack.isEmpty()); // 输出 false

stack.push(15);

stack.pop();
stack.pop();
console.log(stack.size()); // 输出 2
