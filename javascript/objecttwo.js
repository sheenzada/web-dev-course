let obj = {
    Name:"inam",
    Password:4959,
    role:["Admin" , "User" , "Manager"],
    product:function sum(a,b){
        console.log("the sum function is runing");
        
    }
}
console.log(obj.Name);
console.log(obj.role);

let {Name,...res} = obj
console.log(`Object name is : ${Name}`);
// console.log(role[0]);

// let [Admin,User,Manager] = role
// console.log(Admin);
// console.log(obj.role[0]);

// console.log(obj.sum());





// console.log(obj);
