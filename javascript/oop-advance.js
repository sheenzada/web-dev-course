// ---------------- BASE CLASS (ABSTRACTION) ----------------
class Account {
  #balance = 0; // private field

  constructor(owner) {
    if (new.target === Account) {
      throw new Error("Cannot instantiate abstract class");
    }
    this.owner = owner;
    this.transactions = [];
  }

  deposit(amount) {
    this.#validate(amount);
    this.#balance += amount;
    this.transactions.push({ type: "deposit", amount });
  }

  withdraw(amount) {
    this.#validate(amount);
    if (amount > this.#balance) {
      throw new Error("Insufficient funds");
    }
    this.#balance -= amount;
    this.transactions.push({ type: "withdraw", amount });
  }

  getBalance() {
    return this.#balance;
  }

  #validate(amount) {
    if (amount <= 0) {
      throw new Error("Invalid amount");
    }
  }

  // abstract method
  calculateInterest() {
    throw new Error("Must implement calculateInterest()");
  }
}

// ---------------- SAVINGS ACCOUNT ----------------
class SavingsAccount extends Account {
  constructor(owner, rate) {
    super(owner);
    this.rate = rate;
  }

  calculateInterest() {
    return this.getBalance() * this.rate;
  }
}

// ---------------- CURRENT ACCOUNT ----------------
class CurrentAccount extends Account {
  constructor(owner, overdraftLimit) {
    super(owner);
    this.overdraftLimit = overdraftLimit;
  }

  withdraw(amount) {
    if (amount > this.getBalance() + this.overdraftLimit) {
      throw new Error("Overdraft limit exceeded");
    }
    super.withdraw(amount);
  }

  calculateInterest() {
    return 0; // no interest
  }
}

// ---------------- FACTORY PATTERN ----------------
class AccountFactory {
  static create(type, owner, config) {
    switch (type) {
      case "savings":
        return new SavingsAccount(owner, config.rate);
      case "current":
        return new CurrentAccount(owner, config.limit);
      default:
        throw new Error("Invalid account type");
    }
  }
}

// ---------------- TRANSACTION MANAGER ----------------
class TransactionManager {
  static transfer(fromAcc, toAcc, amount) {
    fromAcc.withdraw(amount);
    toAcc.deposit(amount);
  }

  static history(account) {
    return account.transactions;
  }
}

// ---------------- BANK SYSTEM ----------------
class Bank {
  constructor(name) {
    this.name = name;
    this.accounts = [];
  }

  createAccount(type, owner, config) {
    const acc = AccountFactory.create(type, owner, config);
    this.accounts.push(acc);
    return acc;
  }

  findAccount(owner) {
    return this.accounts.find(acc => acc.owner === owner);
  }

  totalBankBalance() {
    return this.accounts.reduce((sum, acc) => sum + acc.getBalance(), 0);
  }

  generateReport() {
    return this.accounts.map(acc => ({
      owner: acc.owner,
      balance: acc.getBalance(),
      transactions: acc.transactions.length
    }));
  }
}

// ---------------- RUN SYSTEM ----------------
const bank = new Bank("MyBank");

// Create Accounts
const ali = bank.createAccount("savings", "Ali", { rate: 0.05 });
const sara = bank.createAccount("current", "Sara", { limit: 500 });

// Transactions
ali.deposit(1000);
ali.withdraw(200);

sara.deposit(500);
TransactionManager.transfer(ali, sara, 300);

// Output
console.log("\nAli Balance:", ali.getBalance());
console.log("Sara Balance:", sara.getBalance());

console.log("\nAli Interest:", ali.calculateInterest());

console.log("\nBank Total Balance:", bank.totalBankBalance());

console.log("\nBank Report:");
console.log(bank.generateReport());

console.log("\nTransaction History (Ali):");
console.log(TransactionManager.history(ali));
