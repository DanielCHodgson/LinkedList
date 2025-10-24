class LinkedList {
  #head = null;
  #tail = null;
  #length = 0;

  append(value) {
    const newNode = new Node(value);
    if (this.#head === null) {
      this.#head = newNode;
      this.#tail = newNode;
      this.#length += 1;
    } else {
      this.#tail.setNext(newNode);
      this.#tail = newNode;
      this.#length += 1;
    }
  }

  prepend(value) {
    const newNode = new Node(value);
    newNode.setNext(this.#head);
    this.#head = newNode;
    if (this.#tail === null) {
      this.#tail = newNode;
    }
    this.#length += 1;
  }

  size() {
    return this.#length;
  }

  head() {
    return this.#head;
  }

  tail() {
    return this.#tail;
  }

  at(index) {
    let current = this.#head;
    for (let i = 0; i < index; i++) {
      if (current === null) return null;
      current = current.getNext();
    }
    return current;
  }

  pop() {
    if (this.#head === null) return null;

    if (this.#head.getNext() === null) {
      const currHead = this.#head;
      this.#head = null;
      this.#tail = null;
      this.#length -= 1;
      return currHead;
    }

    let current = this.#head;

    while (current.getNext().getNext() !== null) {
      current = current.getNext();
    }

    const oldTail = current.getNext();
    current.setNext(null);
    this.#tail = current;
    this.#length -= 1;
    return oldTail;
  }

  contains(value) {
    let current = this.#head;

    while (current !== null) {
      if (current.getValue() === value) return true;
      current = current.getNext();
    }

    return false;
  }

  find(value) {
    if (this.#head === null) return null;
    let current = this.#head;
    let index = 0;

    while (current !== null) {
      if (current.getValue() === value) return index;
      current = current.getNext();
      index++;
    }

    return null;
  }

  toString() {
    if (this.#head === null) return "null";

    let current = this.#head;
    let str = "";

    while (current !== null) {
      str += `( ${current.getValue()} ) -> `;
      current = current.getNext();
    }

    str += "null";

    return str;
  }

  insertAt(value, index) {
    const size = this.size();
    if (index < 0 || index > size)
      throw new Error("Error: Index out of bounds");

    if (index === 0) {
      this.prepend(value);
      return;
    }

    if (index === size) {
      this.append(value);
      return;
    }

    let current = this.#head;
    for (let i = 0; i < index - 1; i++) {
      current = current.getNext();
    }

    const node = new Node(value);
    node.setNext(current.getNext());
    current.setNext(node);
    this.#length += 1;
  }

  removeAt(index) {
    if (this.#head === null) return null;

    const size = this.size();
    if (index < 0 || index >= size)
      throw new Error("Error: Index out of bounds");

    if (index === 0) {
      const removed = this.#head;
      this.#head = this.#head.getNext();
      if (this.#head === null) this.#tail = null;
      return removed;
    }

    let current = this.#head;
    for (let i = 0; i < index - 1; i++) {
      current = current.getNext();
    }

    const removed = current.getNext();
    current.setNext(removed.getNext());

    if (removed === this.#tail) {
      this.#tail = current;
    }
    this.#length -= 1;
    return removed;
  }
}

class Node {
  #value = null;
  #nextNode = null;

  constructor(value) {
    this.#value = value;
  }

  getNext() {
    return this.#nextNode;
  }
  setNext(value) {
    this.#nextNode = value;
  }

  getValue() {
    return this.#value;
  }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());
