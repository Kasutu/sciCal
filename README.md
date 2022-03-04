# docs

[Shunting-yard algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm)
[Operator precedence values](https://en.wikipedia.org/wiki/Order_of_operations)
[Operator precedence parser](https://en.wikipedia.org/wiki/Operator-precedence_parser)

# How to use

1. to Install dependencies, cd to src folder and execute this command

```
npm install
```

after installation

1. start the program

```
node index.js
```

# LIFO behavior

```javascript
const fruits = [];

console.log(fruits.push('🍎'));
console.log(fruits);
console.log(fruits.push('🍌'));
console.log(fruits);
console.log(fruits.push('🍒'));
console.log(fruits);
console.log(fruits.push('🍓'));
console.log(fruits);
console.log(fruits.pop());
console.log(fruits);
console.log(fruits.pop());
console.log(fruits);
console.log(fruits.pop());
console.log(fruits);

// outputs
/*
[ '🍎' ]
[ '🍎', '🍌' ]
[ '🍎', '🍌', '🍒' ]
[ '🍎', '🍌', '🍒', '🍓' ]
'🍓'

[ '🍎', '🍌', '🍒' ]
'🍒'

[ '🍎', '🍌' ]
'🍌'

[ '🍎' ]
*/
```
