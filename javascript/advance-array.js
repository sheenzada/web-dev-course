
// ---------------- SAMPLE DATABASE ----------------
const database = [
  { id: 1, name: "Ali", age: 22, city: "Lahore", salary: 50000 },
  { id: 2, name: "Sara", age: 28, city: "Karachi", salary: 80000 },
  { id: 3, name: "Ahmed", age: 35, city: "Lahore", salary: 120000 },
  { id: 4, name: "Zain", age: 19, city: "Islamabad", salary: 30000 },
  { id: 5, name: "Hina", age: 31, city: "Karachi", salary: 95000 },
];

// ---------------- QUERY ENGINE ----------------
class QueryEngine {
  constructor(data) {
    this.data = data;
    this.result = [...data];
  }

  // WHERE condition
  where(conditionFn) {
    this.result = this.result.filter(conditionFn);
    return this;
  }

  // SELECT specific fields
  select(fields) {
    this.result = this.result.map(item => {
      let obj = {};
      fields.forEach(field => {
        obj[field] = item[field];
      });
      return obj;
    });
    return this;
  }

  // ORDER BY
  orderBy(field, direction = "asc") {
    this.result.sort((a, b) => {
      if (direction === "asc") return a[field] - b[field];
      return b[field] - a[field];
    });
    return this;
  }

  // GROUP BY + AGGREGATE
  groupBy(field) {
    const grouped = {};

    this.result.forEach(item => {
      if (!grouped[item[field]]) {
        grouped[item[field]] = [];
      }
      grouped[item[field]].push(item);
    });

    this.result = Object.entries(grouped).map(([key, value]) => ({
      [field]: key,
      count: value.length,
      avgSalary:
        value.reduce((sum, v) => sum + v.salary, 0) / value.length
    }));

    return this;
  }

  // LIMIT
  limit(n) {
    this.result = this.result.slice(0, n);
    return this;
  }

  // EXECUTE
  execute() {
    return this.result;
  }
}

// ---------------- AI ENGINE ----------------
class RecommendationEngine {
  static recommendSalary(data) {
    return data.map(user => {
      let suggestion = "Average";

      if (user.salary < 40000) suggestion = "Upskill needed";
      else if (user.salary > 100000) suggestion = "High performer";

      return {
        ...user,
        suggestion
      };
    });
  }
}

// ---------------- ADVANCED ANALYTICS ----------------
class Analytics {
  static getStats(data) {
    let total = data.reduce((sum, u) => sum + u.salary, 0);
    let avg = total / data.length;

    let max = Math.max(...data.map(u => u.salary));
    let min = Math.min(...data.map(u => u.salary));

    return { total, avg, max, min };
  }

  static detectOutliers(data) {
    let avg =
      data.reduce((sum, u) => sum + u.salary, 0) / data.length;

    return data.filter(u => Math.abs(u.salary - avg) > avg * 0.5);
  }
}

// ---------------- RUN COMPLEX QUERIES ----------------

// Query Example
const result = new QueryEngine(database)
  .where(user => user.age > 20)
  .orderBy("salary", "desc")
  .limit(3)
  .execute();

console.log("\nFiltered Result:");
console.log(result);

// Grouping Example
const grouped = new QueryEngine(database)
  .groupBy("city")
  .execute();

console.log("\nGroup By City:");
console.log(grouped);

// AI Recommendation
const recommendations = RecommendationEngine.recommendSalary(database);

console.log("\nRecommendations:");
console.log(recommendations);

// Stats
console.log("\nStats:");
console.log(Analytics.getStats(database));

// Outliers
console.log("\nOutliers:");
console.log(Analytics.detectOutliers(database));

