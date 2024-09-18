let buckets = new Array(16).fill(undefined);
function HashMap() {
  let length = 0;
  let loadFactor = 0.75;
  return {
    hashTable: buckets,
    hash(key) {
      let hashCode = 0;

      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
      }

      return hashCode;
    },
    set(key, value) {
      if (this.has(key)) {
        let index = this.hash(key) % buckets.length;
        if (index < 0 || index >= buckets.length) {
          throw new Error("Trying to access index out of bound");
        }
        let place = buckets[index];
        while (place != null || place != undefined) {
          if (place.k === key) {
            place.v = value;
            place = null;
          } else {
            place = place.next;
          }
        }
      } else {
        length++;
        if (length > buckets.length * loadFactor) {
          this.resize();
        }
        let index = this.hash(key) % buckets.length;
        if (index < 0 || index >= buckets.length) {
          throw new Error("Trying to access index out of bound");
        }
        if (buckets[index] == undefined) {
          buckets[index] = { k: key, v: value, next: null };
        } else {
          if (buckets[index].next == null) {
            buckets[index].next = { k: key, v: value, next: null };
          } else {
            let next = buckets[index];
            while (next.next != null) {
              next = next.next;
            }
            next.next = { k: key, v: value, next: null };
          }
        }
      }
    },
    get(key) {
      let index = this.hash(key) % buckets.length;
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }
      if (buckets[index] === undefined) {
        return null;
      } else if (key === buckets[index].k) {
        return buckets[index].v;
      } else {
        let next = buckets[index].next;
        while (next != null) {
          if (key === next.k) {
            return next.v;
          } else {
            next = next.next;
          }
        }
        return null;
      }
    },
    has(key) {
      let index = this.hash(key) % buckets.length;
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }
      if (buckets[index] == undefined) {
        return false;
      } else if (key == buckets[index].k) {
        return true;
      } else {
        let next = buckets[index].next;
        while (next != null) {
          if (key == next.k) {
            return true;
          } else {
            next = next.next;
          }
        }
        return false;
      }
    },
    remove(key) {
      let index = this.hash(key) % buckets.length;
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }
      if (buckets[index] == undefined) {
        return false;
      } else if (key == buckets[index].k) {
        buckets[index] = buckets[index].next;
        length--;
        return true;
      } else {
        let next = buckets[index];
        while (next.next != null) {
          if (key == next.next.k) {
            next.next = next.next.next;
            length--;
            return true;
          } else {
            next = next.next;
          }
        }
        return false;
      }
    },
    length() {
      return length;
    },
    clear() {
      for (let i = 0; i < buckets.length; i++) {
        buckets[i] = undefined;
      }
    },
    keys() {
      let keysArray = [];
      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i] != undefined) {
          keysArray.push(buckets[i].k);
          let next = buckets[i].next;
          while (next != null) {
            keysArray.push(next.k);
            next = next.next;
          }
        }
      }
      return keysArray;
    },
    values() {
      let valuesArray = [];
      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i] != undefined) {
          valuesArray.push(buckets[i].v);
          let next = buckets[i].next;
          while (next != null) {
            valuesArray.push(next.v);
            next = next.next;
          }
        }
      }
      return valuesArray;
    },
    entries() {
      let totalArray = [];
      let tempArray = [];
      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i] != undefined) {
          tempArray.push(buckets[i].k);
          tempArray.push(buckets[i].v);
          totalArray.push(tempArray);
          tempArray = [];
          let next = buckets[i].next;
          while (next != null) {
            tempArray.push(next.k);
            tempArray.push(next.v);
            totalArray.push(tempArray);
            tempArray = [];
            next = next.next;
          }
        }
      }
      return totalArray;
    },
    resize() {
      let oldBuckets = buckets;
      buckets = new Array(buckets.length * 2).fill(undefined);
      length = 0; // Reset length since we're going to re-add each element

      for (let i = 0; i < oldBuckets.length; i++) {
        let place = oldBuckets[i];
        while (place != null) {
          this.set(place.k, place.v); // Re-insert each key-value pair
          place = place.next;
        }
      }
    },
  };
}

const test = HashMap();
console.log(test.values());
console.log(buckets);
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
console.log(test.values());
test.set("elephant", "purple");
test.set("lion", "magestic");
console.log(test.values());
console.log(buckets);
test.set("moon", "silver");
console.log(buckets);
