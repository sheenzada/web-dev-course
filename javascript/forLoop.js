for (let i=10;i>0;i--){
    console.log(i);
    
}
let a=2
for(let i=1;i<=20;i++){
    // console.log(a," x ",i ,"= " ,a*i);
    console.log(`${a} X ${i} = ${a*i}`);
}

for(let i=1;i<=10;i++){
    if(i%2==0){
        console.log(i);
        
    }
    
}
console.log("break sataem");

for(let i=1;i<=10;i++){
if(i==3){
    break
}
console.log(i);

}

console.log("conti sataem");

for(let i=1;i<=10;i++){
if(i==3 || i==4 || i==6){
    continue;
}
console.log(i);

}
console.log("+++++++++++++++++++");

for(let i=1;i<=10;i++){
    if(i%2==0){
       
        continue
    }
     console.log(i);
    
}