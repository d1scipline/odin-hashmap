class Node {
  constructor(key = null, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.nextNode = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  append(key, value) {
    if (!this.head) {
      this.head = new Node(key, value);
      this.length++;
      return;
    }

    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.key === key) {
        currentNode.value = value;
        return;
      }

      if (!currentNode.nextNode) {
        currentNode.nextNode = new Node(key, value);
        this.length++;
        return;
      }

      currentNode = currentNode.nextNode;
    }
  }

  get(key) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    do {
      if (currentNode.key == key) {
        return currentNode.value;
      } else {
        currentNode = currentNode.nextNode;
      }
    } while (currentNode != null);

    return null;
  }

  has(key) {
    if (!this.head) {
      return false;
    }

    let currentNode = this.head;

    do {
      if (currentNode.key == key) {
        return true;
      } else {
        currentNode = currentNode.nextNode;
      }
    } while (currentNode != null);

    return false;
  }

  remove(key) {
    if (!this.head) {
      return false;
    }

    if (this.head.key == key) {
      this.head = null;
      this.length -= 1;
      return true;
    }

    let previousNode = this.head;
    let currentNode = previousNode.nextNode;

    do {
      if (currentNode.key == key) {
        previousNode.nextNode = currentNode.nextNode;
        this.length -= 1;
        return true;
      } else {
        previousNode = currentNode;
        currentNode = currentNode.nextNode;
      }
    } while (currentNode != null);

    return false;
  }

  keys() {
    let result = [];

    if (!this.head) {
      return result;
    }

    let currentNode = this.head;

    do {
      result.push(currentNode.key);
      currentNode = currentNode.nextNode;
    } while (currentNode != null);

    return result;
  }

  values() {
        let result = [];

    if (!this.head) {
      return result;
    }

    let currentNode = this.head;

    do {
      result.push(currentNode.value);
      currentNode = currentNode.nextNode;
    } while (currentNode != null);

    return result;

  }

  entries() {
    let result = [];
    if (!this.head) {
      return result;
    }

    let currentNode = this.head;

    do {
      result.push([currentNode.key, currentNode.value]);
      currentNode = currentNode.nextNode;
    } while (currentNode != null);

    return result;
  }
}

class HashMap {
  constructor(capacity = 16, loadfactor = 0.75) {
    this.capacity = capacity;
    this.loadfactor = loadfactor;
    this.buckets = [];
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  boundscheck(index) {
    if (index < 0 || index >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  set(key, value) {
    let hashValue = this.hash(key);
    this.boundscheck(hashValue);

    if (this.buckets[hashValue] == undefined) {
      this.buckets[hashValue] = new LinkedList();
    }

    this.size += this.buckets[hashValue].append(key, value);
    if (this.length() > this.capacity * this.loadfactor) {
      this.resize();
    }
  }

  get(key) {
    let hashValue = this.hash(key);
    this.boundscheck(hashValue);

    if (this.buckets[hashValue] == undefined) {
      return null;
    } else {
      return this.buckets[hashValue].get(key);
    }
  }

  has(key) {
    let hashValue = this.hash(key);
    this.boundscheck(hashValue);

    if (this.buckets[hashValue] == undefined) {
      return false;
    } else {
      return this.buckets[hashValue].has(key);
    }
  }

  remove(key) {
    let hashValue = this.hash(key);
    this.boundscheck(hashValue);

    if (this.buckets[hashValue] == undefined) {
      return false;
    } else {
      return this.buckets[hashValue].remove(key);
    }
  }

  length() {
    let sum = 0;
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i] !== undefined) {
        sum += this.buckets[i].length;
      }
    }
    return sum;
  }

  clear() {
    this.buckets = [];
  }

  keys() {
    let result = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i] !== undefined) {
        result = result.concat(this.buckets[i].keys());
      }
    }
    return result;
  }

    values() {
    let result = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i] !== undefined) {
        result = result.concat(this.buckets[i].values());
      }
    }
    return result;
  }

  entries() {
    let result = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i] !== undefined) {
        result = result.concat(this.buckets[i].entries());
      }
    }
    return result;

  }
  
  resize() {
    let entries = this.entries();
    this.capacity = this.capacity * 2;
    this.buckets = [];
    for (let i = 0; i < entries.length; i++) {
      this.set(entries[i][0], entries[i][1]);
    }
  }
}

