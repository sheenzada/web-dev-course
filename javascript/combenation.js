// ------------------- UTILITY FUNCTIONS -------------------

// Currying
const multiply = a => b => c => a * b * c;

// Memoization
const memoize = fn => {
  const cache = {};
  return n => {
    if (cache[n]) return cache[n];
    cache[n] = fn(n);
    return cache[n];
  };
};

// Function composition
const compose = (...fns) => val => fns.reduceRight((acc, fn) => fn(acc), val);

// Debounce
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// ------------------- OBJECT LAYER -------------------

// Mini DB
const UserDB = {
  users: [],
  add(user) { this.users.push(user); },
  getAll() { return [...this.users]; },
  findById(id) { return this.users.find(u => u.id === id); }
};

// Object Factory
function createUser(name, role, salary) {
  const id = Math.random().toString(36).slice(2);
  return Object.freeze({ id, name, role, salary, createdAt: new Date() });
}

// Proxy for security
function secureUser(user) {
  return new Proxy(user, {
    get(target, key) {
      if (key === "salary") return "Access Denied";
      return target[key];
    },
    set(target, key, value) {
      if (key === "salary" && value < 0) throw new Error("Invalid Salary");
      target[key] = value;
      return true;
    }
  });
}

// Object Utilities
const UserUtils = {
  groupByRole(users) {
    return users.reduce((acc, u) => {
      acc[u.role] = acc[u.role] || [];
      acc[u.role].push(u);
      return acc;
    }, {});
  },
  totalSalary(users) { return users.reduce((sum, u) => sum + u.salary, 0); },
  highEarners(users, threshold) { return users.filter(u => u.salary > threshold); }
};

// ------------------- OOP LAYER -------------------

// Abstract Account
class Account {
  #balance = 0;
  constructor(owner) {
    if (new.target === Account) throw new Error("Cannot instantiate abstract class");
    this.owner = owner;
    this.transactions = [];
  }

  deposit(amount) { this.#validate(amount); this.#balance += amount; this.transactions.push({type:'deposit', amount}); }
  withdraw(amount) { this.#validate(amount); if(amount > this.#balance) throw new Error("Insufficient funds"); this.#balance -= amount; this.transactions.push({type:'withdraw', amount}); }
  getBalance() { return this.#balance; }
  #validate(amount) { if(amount <= 0) throw new Error("Invalid Amount"); }
  calculateInterest() { throw new Error("Must implement calculateInterest()"); }
}

// SavingsAccount
class SavingsAccount extends Account {
  constructor(owner, rate) { super(owner); this.rate = rate; }
  calculateInterest() { return this.getBalance() * this.rate; }
}

// CurrentAccount
class CurrentAccount extends Account {
  constructor(owner, limit) { super(owner); this.limit = limit; }
  withdraw(amount) { if(amount > this.getBalance() + this.limit) throw new Error("Overdraft limit exceeded"); super.withdraw(amount); }
  calculateInterest() { return 0; }
}

// Account Factory
const AccountFactory = {
  create(type, owner, config) {
    if(type==="savings") return new SavingsAccount(owner, config.rate);
    if(type==="current") return new CurrentAccount(owner, config.limit);
    throw new Error("Invalid account type");
  }
};

// ------------------- SERVICE LAYER -------------------
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
      grouped: UserUtils.groupByRole(users),
      highEarners: UserUtils.highEarners(users, 70000),
      totalSalary: UserUtils.totalSalary(users)
    };
  }
};

// Transaction Manager
const TransactionManager = {
  transfer(from, to, amount) { from.withdraw(amount); to.deposit(amount); },
  history(account) { return account.transactions; }
};

// ------------------- EXECUTION -------------------

// Users
const ali = UserService.createAndStore("Ali", "Developer", 80000);
const sara = UserService.createAndStore("Sara", "Manager", 120000);
const zain = UserService.createAndStore("Zain", "Intern", 30000);

// Secure Proxy
const securedAli = secureUser({...ali});

// Accounts
const accAli = AccountFactory.create("savings", "Ali", { rate: 0.05 });
const accSara = AccountFactory.create("current", "Sara", { limit: 500 });

// Transactions
accAli.deposit(1000);
accAli.withdraw(200);
TransactionManager.transfer(accAli, accSara, 300);

// Analytics
console.log("\nUser Analytics:", UserService.analytics());
console.log("\nAli Account Balance:", accAli.getBalance());
console.log("Sara Account Balance:", accSara.getBalance());
console.log("\nAli Transaction History:", TransactionManager.history(accAli));
console.log("\nSecured Ali Object:", securedAli);
