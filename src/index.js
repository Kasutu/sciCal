import parseInfix from '../modules/shunting-yard.js';
import DoMath from '../modules/solver.js';
import pkg from 'enquirer';
const { prompt } = pkg;

// const input = await prompt({
// 	type: 'input',
// 	name: 'prefix',
// 	message: 'enter math problem: ',
// });

// const rpn = await parseInfix('1+1');
const rpn = await parseInfix('sin ( max ( 2000, 3 ) / 3 * pi )');
// const rpn = await parseInfix('3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3');
// const rpn = await parseInfix('7 + ( 8 * 3 ^ 2 + 4)');

// const result = await DoMath(rpn);
// await DoMath(rpn);

// console.log(result);
console.log(rpn.data.join());
