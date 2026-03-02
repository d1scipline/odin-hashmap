import { HashMap } from "./main.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("kite", "blue");
test.set("ice cream", "brown");

test.set("moon", "silver");

test.set("hat", "red");
test.set("grape", "blueberry");

console.log(test.length());

console.log(test.get("nonexistent key"));
console.log(test.get("grape"));

console.log(test.has("grape"));
console.log(test.has("nonexistent key"));

test.remove("grape");
console.log(test.has("grape"));

console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());

test.clear();
console.log(test.capacity, test.buckets, test.loadlevel());

console.log(test.keys());
console.log(test.values());
console.log(test.entries());
