const obj = { foo: "bar", baz: 42 };
const map = new Map(Object.entries(obj));
console.log(map); // Map(2) {"foo" => "bar", "baz" => 42}
console.log(obj); // { foo: "bar", baz: 42 }
// clear, delete, keys, values, entries, forEach
// set, get, has, delete, size
// map.clear();
// map.delete("foo");
// map.size;
// map.keys();
// map.values();
// map.entries();
// map.forEach((value, key, map) => console.log(key, value)); // baz 42
// map.set("qux", 13);
// map.get("qux"); // 13
// map.has("qux"); // true
// map.delete("qux");
