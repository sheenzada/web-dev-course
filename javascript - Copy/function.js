function sum(){
    console.log("function running");
    
}
sum()

function sum(a,s){
    return a+s;
}
let sm=sum(2,2)
console.log(sm);

function sum(a,s,d) {
    return a+s*d;
}
let sums=sum(3,4,2)
console.log(sums);

function smd(a,...s){
    return a*s;
}
console.log(smd(2,3,56,7,8));


