function processUserInput(callback) {
  const name = "Alice";
  callback(name);
}
processUserInput(name => console.log(`Hi, ${name}`));
