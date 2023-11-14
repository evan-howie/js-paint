export default class Queue {
  constructor() {
    this.data = [];
    this.head = 0;
    this.tail = 0;
  }

  enqueue(item) {
    this.data[this.tail++] = item;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const item = this.data[this.head];
    this.data[this.head++] = undefined; // Clear the reference
    if (this.head === this.tail) {
      // Reset pointers if queue is empty
      this.head = this.tail = 0;
    }
    return item;
  }

  isEmpty() {
    return this.head === this.tail;
  }
}
