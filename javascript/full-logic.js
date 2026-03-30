// ```javascript
// const fs = require("fs");
// const readline = require("readline");

// const DATA_FILE = "tasks.json";

// // ---------- Utility Functions ----------
// function loadTasks() {
//   if (!fs.existsSync(DATA_FILE)) return [];
//   return JSON.parse(fs.readFileSync(DATA_FILE));
// }

// function saveTasks(tasks) {
//   fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
// }

// function generateId() {
//   return Math.random().toString(36).substring(2, 10);
// }

// // ---------- Task Class ----------
// class Task {
//   constructor(title, priority = "medium") {
//     this.id = generateId();
//     this.title = title;
//     this.priority = priority;
//     this.completed = false;
//     this.createdAt = new Date();
//   }
// }

// // ---------- Smart Engine ----------
// class SmartEngine {
//   static suggestPriority(title) {
//     const keywords = {
//       high: ["urgent", "asap", "important", "deadline"],
//       low: ["later", "optional", "someday"]
//     };

//     title = title.toLowerCase();

//     for (let word of keywords.high) {
//       if (title.includes(word)) return "high";
//     }
//     for (let word of keywords.low) {
//       if (title.includes(word)) return "low";
//     }
//     return "medium";
//   }

//   static productivityScore(tasks) {
//     let completed = tasks.filter(t => t.completed).length;
//     let total = tasks.length;
//     if (total === 0) return 0;
//     return ((completed / total) * 100).toFixed(2);
//   }

//   static recommend(tasks) {
//     let pending = tasks.filter(t => !t.completed);

//     if (pending.length === 0) return "No tasks pending 🎉";

//     // prioritize high priority first
//     pending.sort((a, b) => {
//       const order = { high: 3, medium: 2, low: 1 };
//       return order[b.priority] - order[a.priority];
//     });

//     return `👉 Next Focus: "${pending[0].title}" (${pending[0].priority})`;
//   }
// }

// // ---------- CLI Interface ----------
// class CLI {
//   constructor() {
//     this.tasks = loadTasks();

//     this.rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout
//     });
//   }

//   start() {
//     console.log("\n🚀 Smart Task Manager\n");
//     this.menu();
//   }

//   menu() {
//     console.log(`
// 1. Add Task
// 2. View Tasks
// 3. Complete Task
// 4. Delete Task
// 5. Stats
// 6. Smart Recommendation
// 0. Exit
//     `);

//     this.rl.question("Choose option: ", (choice) => {
//       switch (choice) {
//         case "1": return this.addTask();
//         case "2": return this.viewTasks();
//         case "3": return this.completeTask();
//         case "4": return this.deleteTask();
//         case "5": return this.showStats();
//         case "6": return this.recommend();
//         case "0": return this.exit();
//         default:
//           console.log("Invalid choice");
//           this.menu();
//       }
//     });
//   }

//   addTask() {
//     this.rl.question("Enter task title: ", (title) => {
//       let priority = SmartEngine.suggestPriority(title);

//       const task = new Task(title, priority);
//       this.tasks.push(task);
//       saveTasks(this.tasks);

//       console.log(`✅ Task added with ${priority} priority`);
//       this.menu();
//     });
//   }

//   viewTasks() {
//     console.log("\n📋 Tasks:\n");

//     this.tasks.forEach((t, i) => {
//       console.log(
//         `${i + 1}. [${t.completed ? "✔" : " "}] ${t.title} (${t.priority})`
//       );
//     });

//     this.menu();
//   }

//   completeTask() {
//     this.viewTasks();
//     this.rl.question("Enter task number to complete: ", (num) => {
//       let index = num - 1;
//       if (this.tasks[index]) {
//         this.tasks[index].completed = true;
//         saveTasks(this.tasks);
//         console.log("✅ Task completed");
//       }
//       this.menu();
//     });
//   }

//   deleteTask() {
//     this.viewTasks();
//     this.rl.question("Enter task number to delete: ", (num) => {
//       let index = num - 1;
//       if (this.tasks[index]) {
//         this.tasks.splice(index, 1);
//         saveTasks(this.tasks);
//         console.log("🗑 Task deleted");
//       }
//       this.menu();
//     });
//   }

//   showStats() {
//     let score = SmartEngine.productivityScore(this.tasks);

//     console.log(`\n📊 Productivity Score: ${score}%`);

//     let grouped = {
//       high: 0,
//       medium: 0,
//       low: 0
//     };

//     this.tasks.forEach(t => grouped[t.priority]++);

//     console.log("Priority Breakdown:", grouped);

//     this.menu();
//   }

//   recommend() {
//     let rec = SmartEngine.recommend(this.tasks);
//     console.log("\n" + rec + "\n");
//     this.menu();
//   }

//   exit() {
//     console.log("Goodbye 👋");
//     this.rl.close();
//   }
// }

// // ---------- Run App ----------
// const app = new CLI();
// app.start();
// ```





const fs = require("fs");
const readline = require("readline");

const DATA_FILE = "tasks.json";

function loadTasks() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

class Task {
  constructor(title, priority = "medium") {
    this.id = generateId();
    this.title = title;
    this.priority = priority;
    this.completed = false;
    this.createdAt = new Date();
  }
}

class SmartEngine {
  static suggestPriority(title) {
    const keywords = {
      high: ["urgent", "asap", "important", "deadline"],
      low: ["later", "optional", "someday"]
    };

    title = title.toLowerCase();

    for (let word of keywords.high) {
      if (title.includes(word)) return "high";
    }
    for (let word of keywords.low) {
      if (title.includes(word)) return "low";
    }
    return "medium";
  }

  static productivityScore(tasks) {
    let completed = tasks.filter(t => t.completed).length;
    let total = tasks.length;
    if (total === 0) return 0;
    return ((completed / total) * 100).toFixed(2);
  }
}

class CLI {
  constructor() {
    this.tasks = loadTasks();

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  start() {
    console.log("Smart Task Manager");
    this.menu();
  }

  menu() {
    console.log(`
1. Add Task
2. View Tasks
3. Complete Task
4. Delete Task
5. Stats
0. Exit
    `);

    this.rl.question("Choose option: ", (choice) => {
      switch (choice) {
        case "1": return this.addTask();
        case "2": return this.viewTasks();
        case "3": return this.completeTask();
        case "4": return this.deleteTask();
        case "5": return this.showStats();
        case "0": return this.exit();
        default:
          console.log("Invalid choice");
          this.menu();
      }
    });
  }

  addTask() {
    this.rl.question("Enter task title: ", (title) => {
      let priority = SmartEngine.suggestPriority(title);

      const task = new Task(title, priority);
      this.tasks.push(task);
      saveTasks(this.tasks);

      console.log("Task added");
      this.menu();
    });
  }

  viewTasks() {
    console.log("\nTasks:\n");

    this.tasks.forEach((t, i) => {
      console.log(
        `${i + 1}. [${t.completed ? "X" : " "}] ${t.title} (${t.priority})`
      );
    });

    this.menu();
  }

  completeTask() {
    this.viewTasks();
    this.rl.question("Enter task number: ", (num) => {
      let index = num - 1;
      if (this.tasks[index]) {
        this.tasks[index].completed = true;
        saveTasks(this.tasks);
        console.log("Completed");
      }
      this.menu();
    });
  }

  deleteTask() {
    this.viewTasks();
    this.rl.question("Enter task number: ", (num) => {
      let index = num - 1;
      if (this.tasks[index]) {
        this.tasks.splice(index, 1);
        saveTasks(this.tasks);
        console.log("Deleted");
      }
      this.menu();
    });
  }

  showStats() {
    let score = SmartEngine.productivityScore(this.tasks);
    console.log("Productivity:", score + "%");
    this.menu();
  }

  exit() {
    console.log("Goodbye");
    this.rl.close();
  }
}

const app = new CLI();
app.start();