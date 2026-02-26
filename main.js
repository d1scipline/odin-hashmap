class HashMap {
  constructor(capacity = 16, loadfactor = 0.75) {
    this.capacity = 16;
    this.loadfactor = 0.75;
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
}

const hashMap = new HashMap();
