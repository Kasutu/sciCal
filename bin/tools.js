import {
	Letters,
	Functions,
	Operators,
	Ignore,
	Properties,
} from '../lib/key-reference.js';
import Stack from './stack.js';

const outputStack = new Stack();
const charStack = new Stack();

export async function makeProperPrefix(str) {
	const charArr = str.replace(/\s/g, '').split('');
	console.log(charArr);
	await pushTo(charArr, charStack);
	console.log(charStack);

	let word = '';
	let numbers = '';

	while (!charStack.isEmpty()) {
		const char = charStack.pop();
		console.log('READING ->', char);

		if (await findIn(char, Ignore)) {
			if (char === ',') {
				pushIfNumber();
			}
			continue;
		}

		if (await findIn(word, Properties)) {
			// a function
			pushIfWord();
			word = '';
		}

		if (await findIn(word, Functions)) {
			// a function
			pushIfWord();
			word = '';
		}

		if (char === '(') {
			pushIfWord();
			pushIfNumber();
			outputStack.push(char);
		}

		if (await findIn(char, Operators)) {
			// an operator
			pushIfWord();
			pushIfNumber();
			outputStack.push(char);
		} else if (char === ')') {
			pushIfWord();
			pushIfNumber();
			outputStack.push(char);
		}

		if (await findIn(char, Letters)) {
			// a letter
			pushIfNumber();
			word += char;
		}

		if (isNum(char)) {
			// a Number
			numbers += char;
			while (!charStack.isEmpty() && isNum(char)) {
				const token2 = charStack.pop();

				if (!isNum(token2)) {
					pushIfNumber();
					break;
				}

				numbers += token2;
				pushIfWord();
				console.log('NUMBER ->', char);
			}
		}
	}

	function pushIfNumber() {
		if (numbers !== '') {
			outputStack.push(numbers);
			numbers = '';
		}
	}

	function pushIfWord() {
		if (word !== '') {
			// if its just a letter
			outputStack.push(word);
			word = '';
		}
	}

	return outputStack;
}

export function isNum(str) {
	// detects a number from string
	return !isNaN(str);
}

export async function pushTo(arr, stack) {
	// push to stack
	let counter = arr.length;

	while (counter > 0) {
		stack.push(arr[counter - 1]);
		counter--;
	}
}

export async function findIn(token, inArray) {
	return inArray.indexOf(token) !== -1;
}
