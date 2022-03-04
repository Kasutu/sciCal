export default class Stack {
	maxSize = 30;
	data = (this.data = Object.seal(new Array(this.maxSize).fill(undefined)));
	count = 0;

	push(element) {
		this.data[this.count] = element;
		this.count++;
	}

	pop() {
		this.count--;
		return this.data[this.count];
	}

	peek() {
		return this.data[this.count - 1];
	}

	isEmpty() {
		return this.count <= 0;
	}

	isFull() {
		return this.count >= this.data.length;
	}
}
