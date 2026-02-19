// for(let i=1;i<=10;i++){
//     if(i==3 || i==4 || i==6){
//         continue;
//     }

//     console.log(i);
// }

for(let i=1;i<=10;i++){
    for(let j=1;j<=10;j++){
        console.log(`${i} X ${j} = ${i*j}`);
    }  }

// for(let i=1;i<=10;i++){
//     for(let j=1;j<=10;j++){
//         console.log("*" ,"");}}
        
for(let i=1;i<=5;i++){ 
    let str="";
    for(let j=1;j<=5;j++){
        str+="* ";
    }
    console.log(str);
}


for(i=0;i<5;i++){
    let str=""; 
    for(j=0;j<=i;j++){
        str+="* ";
    }
    console.log(str);}