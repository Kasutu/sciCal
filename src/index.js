#!/usr/bin/env node

import parseInfix from '../modules/shunting-yard.js';
import DoMath from '../modules/solver.js';
import pkg from 'enquirer';
const { prompt } = pkg;

const input = await prompt({
	name: 'prefix',
	type: 'input',
	message: 'enter math problem: ',
});

const rpn = await parseInfix(input.prefix);
const result = await DoMath(rpn);

console.log('ANSWER -> ', result);
