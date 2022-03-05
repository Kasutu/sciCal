import Stack from '../bin/stack.js';
import SyntaxError from '../lib/error-reference.js';
import { isNum, findIn } from '../bin/tools.js';
import {
	Operators,
	Functions,
	Parenthesis,
	Properties,
} from '../lib/key-reference.js';
import comparePrecedence from '../bin/precedence.js';
import JSInfixTokenizer from '../bin/tokenizerClone.js';

export default async function parseInfix(rawInput) {
	const operators = Operators;
	const functions = Functions;
	const parenthesis = Parenthesis;
	const operatorStack = new Stack();
	const outputStack = new Stack();
	const tokenizer = new JSInfixTokenizer(rawInput);

	while (tokenizer.hasMoreTokens()) {
		const token = tokenizer.readToken();

		if (isNum(token)) {
			// a number
			outputStack.push(token);
		} else if (await findIn(token, Properties)) {
			// a property like PI
			outputStack.push(token);
		} else if (await findIn(token, functions)) {
			// a function
			operatorStack.push(token);
		} else if (
			(await findIn(token, operators)) &&
			token !== parenthesis.left &&
			token !== parenthesis.right &&
			!isNum(token)
		) {
			// an operator
			if (
				(await findIn(operatorStack.peek(), operators)) ||
				operatorStack.peek() === parenthesis.left
			) {
				while (await comparePrecedence(token, operatorStack)) {
					outputStack.push(operatorStack.pop());
					break;
				}
			}

			operatorStack.push(token);
		} else if (parenthesis.left === token) {
			// a left '('
			operatorStack.push(token);
		} else if (parenthesis.right === token) {
			// a right ')'

			while (operatorStack.peek() !== parenthesis.left) {
				if (!operatorStack.isEmpty()) {
					outputStack.push(operatorStack.pop());
				}
				SyntaxError(0);
			}

			if (operatorStack.peek() === parenthesis.left) {
				operatorStack.pop();
			}

			if (await findIn(operatorStack.peek(), functions)) {
				outputStack.push(operatorStack.pop());
			}
		}
	}

	while (!tokenizer.hasMoreTokens() && !operatorStack.isEmpty()) {
		if (operatorStack.peek() !== parenthesis.left) {
			SyntaxError(1);
		}
		outputStack.push(operatorStack.pop());
	}

	return outputStack;
}
