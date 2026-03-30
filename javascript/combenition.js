// ---------------- UTILITY FUNCTIONS ----------------

// Curry + Compose + Debounce + Memoization
const curry = fn => (...args) => args.length >= fn.length ? fn(...args) : (...rest) => curry(fn)(...args, ...rest);
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const debounce = (fn, delay) => { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); } };
const memoize = fn => { const cache = {}; return arg => cache[arg] ?? (cache[arg] = fn(arg)); };

// ---------------- OBJECT LAYER ----------------

// Factory + Proxy + Object.freeze + Descriptors
function createUser(name, role, salary) {
  const id = Math.random().toString(36).slice(2);
  const user = { id, name, role, salary, createdAt: new Date() };
  return Object.freeze(user);
}

function secureUser(user) {
  return new Proxy(user, {
    get(target, key) {
      if (key === 'salary') return 'Access Denied';
      return target[key];
    },
    set(target, key, value) {
      if (key === 'salary' && value < 0) throw new Error('Invalid Salary');
      target[key] = value;
      return true;
    }
  });
}

function defineImmutable(obj, key, value) {
  Object.defineProperty(obj, key, { value, writable: false, configurable: false, enumerable: true });
}

// ---------------- MINI DATABASE ----------------
const UserDB = {
  users: [],
  add(user) { this.users.push(user); },
  getAll() { return [...this.users]; },
  findById(id) { return this.users.find(u => u.id === id); }
};

// ---------------- OOP LAYER ----------------
class Account {
  #balance = 0;
  constructor(owner) {
    if (new.target === Account) throw new Error("Cannot instantiate abstract class");
    this.owner = owner;
    this.transactions = [];
  }
  deposit(amount) { this.#validate(amount); this.#balance += amount; this.transactions.push({type:'deposit', amount}); }
  withdraw(amount) { this.#validate(amount); if(amount>this.#balance) throw new Error('Insufficient'); this.#balance-=amount; this.transactions.push({type:'withdraw', amount}); }
  getBalance() { return this.#balance; }
  #validate(amount) { if(amount<=0) throw new Error('Invalid Amount'); }
  calculateInterest() { throw new Error("Must implement in subclass"); }
}

class SavingsAccount extends Account {
  constructor(owner, rate) { super(owner); this.rate = rate; }
  calculateInterest() { return this.getBalance() * this.rate; }
}

class CurrentAccount extends Account {
  constructor(owner, limit) { super(owner); this.limit = limit; }
  withdraw(amount) { if(amount > this.getBalance()+this.limit) throw new Error("Overdraft exceeded"); super.withdraw(amount); }
  calculateInterest() { return 0; }
}

// ---------------- SERVICE LAYER ----------------
const UserService = {
  createAndStore(name, role, salary) {
    const user = createUser(name, role, salary);
    UserDB.add(user);
    return user;
  },
  analytics() {
    const users = UserDB.getAll();
    return {
      totalUsers: users.length,
      groupedByRole: users.reduce((acc,u)=>{acc[u.role]=acc[u.role]||[];acc[u.role].push(u);return acc;}, {}),
      highEarners: users.filter(u=>u.salary>70000),
      totalSalary: users.reduce((sum,u)=>sum+u.salary,0)
    };
  }
};

// ---------------- TRANSACTION LAYER ----------------
const TransactionManager = {
  transfer(from, to, amount) { from.withdraw(amount); to.deposit(amount); },
  history(account) { return account.transactions; }
};

// ---------------- ASYNC / API SIMULATION ----------------
async function fetchMockAPI(url) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ data: `Fetched from ${url}`, timestamp: new Date() }), 500);
  });
}

async function batchFetch(urls) {
  return Promise.all(urls.map(u => fetchMockAPI(u)));
}

// ---------------- FUNCTIONAL ARRAY LOGIC ----------------
const numbers = [1,2,3,4,5,6,7,8,9,10];
const processed = compose(
  arr => arr.filter(n=>n%2===0),
  arr => arr.map(n=>n*10),
  arr => arr.map(n=>n+1)
)(numbers);

// ---------------- EXECUTION ----------------

// Users
const ali = UserService.createAndStore("Ali", "Developer", 80000);
const sara = UserService.createAndStore("Sara", "Manager", 120000);
const zain = UserService.createAndStore("Zain", "Intern", 30000);

// Secure Proxies
const securedAli = secureUser({...ali});

// Accounts
const accAli = new SavingsAccount("Ali", 0.05);
const accSara = new CurrentAccount("Sara", 500);

// Transactions
accAli.deposit(1000);
accAli.withdraw(200);
TransactionManager.transfer(accAli, accSara, 300);

// Immutable Property
defineImmutable(securedAli, 'role', 'Developer');

// Async API Fetch
(async()=>{
  const responses = await batchFetch(['https://api.example.com/users', 'https://api.example.com/stats']);
  console.log("\nAPI Responses:", responses);
})();

// Outputs
console.log("\nProcessed Array:", processed);
console.log("\nUser Analytics:", UserService.analytics());
console.log("\nAli Account Balance:", accAli.getBalance());
console.log("Sara Account Balance:", accSara.getBalance());
console.log("\nAli Transaction History:", TransactionManager.history(accAli));
console.log("\nSecured Ali Object:", securedAli);
