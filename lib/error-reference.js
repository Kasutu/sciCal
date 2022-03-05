const errorList = [
	'The stack runs out without finding a (left) parenthesis',
	'Operator token on the top of the stack is a (left) parenthesis',
	'Some error',
];

export default function SyntaxError(errorCode) {
	return `Error ID: ${errorCode} ${errorList[errorCode]}`;
}
