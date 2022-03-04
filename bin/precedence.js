async function getData(key) {
	switch (key) {
		case '^':
			return { precedence: 4, Assoc: 'right' };

		case '*':
		case '/':
			return { precedence: 3, Assoc: 'left' };

		case '+':
		case '-':
			return { precedence: 2, Assoc: 'left' };

		default:
			return 'ignore';
	}
}

export default async function comparePrecedence(token, opStack) {
	let OP1 = await getData(token);
	let OP2 = await getData(opStack.peek());

	if (OP1 === 'ignore' || OP2 === 'ignore') {
		return false;
	} else {
		return (
			OP2.precedence > OP1.precedence ||
			(OP2.precedence === OP1.precedence && OP1.Assoc === 'left')
		);
	}
}
