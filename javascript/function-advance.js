// ---------------- 1. CLOSURE ----------------
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log("Counter:", counter(), counter(), counter());


// ---------------- 2. CURRYING ----------------
function multiply(a) {
  return function (b) {
    return function (c) {
      return a * b * c;
    };
  };
}

console.log("Curried Multiply:", multiply(2)(3)(4));


// ---------------- 3. MEMOIZATION ----------------
function memoize(fn) {
  let cache = {};

  return function (n) {
    if (cache[n]) {
      console.log("From cache");
      return cache[n];
    }
    let result = fn(n);
    cache[n] = result;
    return result;
  };
}

function slowSquare(n) {
  for (let i = 0; i < 1e7; i++) {} // heavy work
  return n * n;
}

const fastSquare = memoize(slowSquare);

console.log("Memo:", fastSquare(5));
console.log("Memo:", fastSquare(5)); // cached


// ---------------- 4. FUNCTION COMPOSITION ----------------
function compose(...fns) {
  return function (value) {
    return fns.reduceRight((acc, fn) => fn(acc), value);
  };
}

const add2 = x => x + 2;
const multiply3 = x => x * 3;

const composed = compose(add2, multiply3);
console.log("Compose:", composed(5)); // (5*3)+2


// ---------------- 5. HIGHER ORDER FUNCTION ----------------
function repeat(fn, times) {
  for (let i = 0; i < times; i++) {
    fn(i);
  }
}

repeat(i => console.log("Repeat:", i), 3);


// ---------------- 6. ADVANCED RECURSION ----------------
function flattenArray(arr) {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
  }, []);
}

console.log("Flatten:", flattenArray([1, [2, [3, 4], 5]]));


// ---------------- 7. PIPE (LEFT TO RIGHT) ----------------
function pipe(...fns) {
  return function (value) {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
}

const piped = pipe(
  x => x + 1,
  x => x * 2,
  x => x - 3
);

console.log("Pipe:", piped(5));


// ---------------- 8. CUSTOM FILTER ----------------
function myFilter(arr, callback) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) {
      result.push(arr[i]);
    }
  }

  return result;
}

console.log("Filter:", myFilter([1, 2, 3, 4], x => x > 2));


// ---------------- 9. FUNCTION WITH STATE ----------------
function createBankAccount(initial) {
  let balance = initial;

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) return "Insufficient funds";
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const acc = createBankAccount(1000);
console.log("Balance:", acc.deposit(500));
console.log("Balance:", acc.withdraw(300));


// ---------------- 10. DEBOUNCE ----------------
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const search = debounce((text) => {
  console.log("Searching:", text);
}, 500);

// simulate typing
search("a");
search("ab");
search("abc"); // only this runs


// ---------------- 11. THROTTLE ----------------
function throttle(fn, limit) {
  let waiting = false;

  return function (...args) {
    if (!waiting) {
      fn.apply(this, args);
      waiting = true;

      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
}

const log = throttle(() => console.log("Throttled"), 1000);
log();
log();
log();


// ---------------- 12. FUNCTION CHAINING ----------------
function calculator(initial = 0) {
  let value = initial;

  return {
    add(n) {
      value += n;
      return this;
    },
    multiply(n) {
      value *= n;
      return this;
    },
    result() {
      return value;
    }
  };
}

const result = calculator(5).add(3).multiply(2).result();
console.log("Chaining:", result);
