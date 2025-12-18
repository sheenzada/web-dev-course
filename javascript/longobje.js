// student.js

const student = {
  name: "InamUllah",
  age: 18,
  rollNo: 35,
  field: "Computer Science",
  marks: {
    mathematics: 95,
    physics: 88,
    chemistry: 92,
    computerScience: 98,
    english: 85
  },
  address: {
    colony: "Mehdi colony",
    city: "Skardu",
    District: "Ghanche",
    zip: "110016"
  },
  hobbies: ["reading", "coding", "painting", "volleyball"],
  contact: {
    email: "sheenzada7@gmail.com",
    phone: "03498405661",
  },
  attendance: 92, 
  languages: ["Urdu", "Shina", "Balti"],
  Year: 2025,
  favoriteSubjects: ["Computer Science", "Mathematics"],
  FName: {
    father: "Muhammad. Ejaz",
  }
};

console.log("Student Name:", student.name);
console.log("Roll No:", student.rollNo);
console.log("Marks in Computer Science:", student.marks.computerScience);
console.log("City:", student.address.city);
console.log("Hobbies:", student.hobbies); //.join(", ")
console.log("Father Name:", student.FName.father);
console.log("Languages:", student.languages);
// .join(", ")