// ```javascript
// -------- DATA STORAGE --------
let students = [];

// -------- ADD STUDENT --------
function addStudent(name, marksArray) {
  let student = {
    id: students.length + 1,
    name: name,
    marks: marksArray,
    total: 0,
    average: 0,
    grade: ""
  };

  calculateResult(student);
  students.push(student);
}

// -------- CALCULATE RESULT --------
function calculateResult(student) {
  let sum = 0;

  for (let i = 0; i < student.marks.length; i++) {
    sum += student.marks[i];
  }

  student.total = sum;
  student.average = sum / student.marks.length;

  if (student.average >= 90) student.grade = "A+";
  else if (student.average >= 75) student.grade = "A";
  else if (student.average >= 60) student.grade = "B";
  else if (student.average >= 50) student.grade = "C";
  else student.grade = "F";
}

// -------- GET TOPPER --------
function getTopper() {
  let topper = students[0];

  for (let i = 1; i < students.length; i++) {
    if (students[i].average > topper.average) {
      topper = students[i];
    }
  }

  return topper;
}

// -------- FILTER FAIL STUDENTS --------
function getFailStudents() {
  let failList = [];

  for (let i = 0; i < students.length; i++) {
    if (students[i].grade === "F") {
      failList.push(students[i]);
    }
  }

  return failList;
}

// -------- SORT STUDENTS --------
function sortStudentsByAverage() {
  students.sort(function (a, b) {
    return b.average - a.average;
  });
}

// -------- SEARCH STUDENT --------
function searchStudent(name) {
  let result = [];

  for (let i = 0; i < students.length; i++) {
    if (students[i].name.toLowerCase().includes(name.toLowerCase())) {
      result.push(students[i]);
    }
  }

  return result;
}

// -------- DISPLAY ALL --------
function displayStudents() {
  console.log("\nAll Students:\n");

  for (let i = 0; i < students.length; i++) {
    let s = students[i];

    console.log(
      s.id +
        ". " +
        s.name +
        " | Marks: " +
        s.marks.join(", ") +
        " | Avg: " +
        s.average.toFixed(2) +
        " | Grade: " +
        s.grade
    );
  }
}

// -------- SAMPLE DATA --------
addStudent("Ali", [80, 90, 85, 70]);
addStudent("Ahmed", [40, 50, 45, 30]);
addStudent("Sara", [95, 92, 88, 96]);
addStudent("Zain", [60, 65, 70, 58]);

// -------- RUN LOGIC --------
displayStudents();

console.log("\nTopper:");
console.log(getTopper());

console.log("\nFail Students:");
console.log(getFailStudents());

console.log("\nSorted Students:");
sortStudentsByAverage();
displayStudents();

console.log("\nSearch 'a':");
console.log(searchStudent("a"));
// ```
