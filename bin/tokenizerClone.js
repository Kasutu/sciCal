import { Functions } from '../lib/key-reference.js';

// credits
// modified code from @psse-cpu/tokenizer
// thanks sir!

export default class JSInfixTokenizer {
	expression;
	regex;
	nextToken;

	constructor(input) {
		this.expression = input.replace(/\s/g, '');
		const regexSrc = `\\d+(\\.\\d+)?|${Functions}|[()*/^+-]`;
		this.regex = new RegExp(regexSrc, 'g');

		this.#advance();
	}

	#advance() {
		const match = this.regex.exec(this.expression);
		this.nextToken = match?.[0];
	}

	hasMoreTokens() {
		return Boolean(this.nextToken);
	}

	readToken() {
		const current = this.nextToken;
		this.#advance();
		return current;
	}
}
