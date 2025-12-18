const result = [1, 2, 3]
.map(x => x * 2)
.filter(x => x> 2)
.reduce((a, b) => a + b);
console.log(result); // 10
