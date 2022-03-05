import Stack from '../bin/stack.js';
import {
	Operators,
	Functions,
	Properties,
	PropVal,
} from '../lib/key-reference.js';
import { findIn, isNum } from '../bin/tools.js';

const operandStack = new Stack();
const expressionStack = new Stack();

export default async function DoMath(outputStack) {
	// push to stack and reverses the array order
	while (!outputStack.isEmpty()) {
		expressionStack.push(outputStack.pop());
	}

	while (!expressionStack.isEmpty()) {
		// console.log('expressionStack ', expressionStack);
		// console.log('operandStack ', operandStack);

		const token = expressionStack.pop();
		// console.log('READING -> ', token);

		if (isNum(token)) {
			operandStack.push(Number(token));
		} else if (await findIn(token, Properties)) {
			operandStack.push(PropVal[token]);
		}

		if ((await findIn(token, Operators)) || (await findIn(token, Functions))) {
			// an operator
			const a = popIfNotEmpty();
			const b = popIfNotEmpty();
			// console.log('B -> ', b, 'A -> ', a);
			// console.log('A -> ', a, token, 'B -> ', b);

			switch (token) {
				case '^':
					operandStack.push(b ** a);
					break;

				case '*':
					operandStack.push(b * a);
					break;

				case '+':
					operandStack.push(b + a);
					break;

				case '-':
					operandStack.push(b - a);
					break;

				case '/':
					operandStack.push(b / a);
					break;

				case 'sin':
					operandStack.push(Math.sin(a * (Math.PI / 180)));
					break;

				case 'max':
					operandStack.push(Math.max(a, b));
					break;

				case 'tan':
					operandStack.push(Math.tan((a * Math.PI) / 180));
					break;

				case 'log':
					operandStack.push(Math.log(b) / Math.log(a));
					break;

				case 'sqrt':
					operandStack.push(Math.sqrt(a * a + b * b));
					break;

				case 'cbrt':
					operandStack.push(Math.cbrt(a));
					break;

				default:
					break;
			}
		}
	}

	if (expressionStack.isEmpty() && !operandStack.isEmpty()) {
		return await operandStack.pop();
		// console.log(operandStack.pop());
	}
}

function popIfNotEmpty() {
	if (!operandStack.isEmpty()) {
		return operandStack.pop();
	}
}
