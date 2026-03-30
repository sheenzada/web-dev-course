const UserDB = {
  users: [],

  add(user) {
    this.users.push(user);
  },

  getAll() {
    return [...this.users];
  },

  findById(id) {
    return this.users.find(u => u.id === id);
  }
};

// ---------------- FACTORY FUNCTION ----------------
function createUser(name, role, salary) {
  let id = Math.random().toString(36).slice(2);

  let user = {
    id,
    name,
    role,
    salary,
    createdAt: new Date()
  };

  return Object.freeze(user); // immutable object
}

// ---------------- PROXY (VALIDATION + SECURITY) ----------------
function secureUser(user) {
  return new Proxy(user, {
    set(target, key, value) {
      if (key === "salary" && value < 0) {
        throw new Error("Invalid salary");
      }
      target[key] = value;
      return true;
    },

    get(target, key) {
      if (key === "salary") {
        return "Access Denied";
      }
      return target[key];
    }
  });
}

// ---------------- OBJECT UTILITIES ----------------
const UserUtils = {
  groupByRole(users) {
    return users.reduce((acc, user) => {
      if (!acc[user.role]) {
        acc[user.role] = [];
      }
      acc[user.role].push(user);
      return acc;
    }, {});
  },

  calculateTotalSalary(users) {
    return users.reduce((sum, user) => sum + user.salary, 0);
  },

  getHighEarners(users, threshold) {
    return users.filter(user => user.salary > threshold);
  }
};

// ---------------- OBJECT DESCRIPTORS ----------------
function defineSecureProperty(obj, key, value) {
  Object.defineProperty(obj, key, {
    value,
    writable: false,
    enumerable: true,
    configurable: false
  });
}

// ---------------- SERVICE LAYER ----------------
const UserService = {
  createAndStore(name, role, salary) {
    let user = createUser(name, role, salary);
    UserDB.add(user);
    return user;
  },

  getAnalytics() {
    let users = UserDB.getAll();

    return {
      totalUsers: users.length,
      grouped: UserUtils.groupByRole(users),
      highEarners: UserUtils.getHighEarners(users, 70000)
    };
  }
};

// ---------------- RUN SYSTEM ----------------

// Create users
const u1 = UserService.createAndStore("Ali", "Developer", 80000);
const u2 = UserService.createAndStore("Sara", "Manager", 120000);
const u3 = UserService.createAndStore("Zain", "Intern", 30000);

// Secure user with proxy
const secured = secureUser({ name: "Test", salary: 50000 });

// Try accessing salary
console.log("Salary:", secured.salary); // hidden

// Add secure property
defineSecureProperty(secured, "id", "ABC123");

// Show database
console.log("\nAll Users:");
console.log(UserDB.getAll());

// Analytics
console.log("\nAnalytics:");
console.log(UserService.getAnalytics());
