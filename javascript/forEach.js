// const coding = ['js' , 'java' , 'python' , 'C#']

// const values =  coding.forEach( (item) => {
//     console.log(item);
    
// } )
// console.log(values);


//  const mynums = [1,2,3,4,5,,6,7,8,9,10]

//  const newNums = mynums .filter( (num) => num > 4 )

// const newNums = mynums.filter( (num) => {
//     return num > 5
// })

// const newNums = []
// mynums.forEach( (num) => {
//     if(num > 4) {
//         newNums.push(num)
//     }
// })
// console.log(newNums);

 const books = [
    {title: 'Book One' , genre: 'Fiction' , publish: 1981 , edition: 2004},
    {title: 'Book Two' , genre: ' Non-Fiction' , publish: 1971 , edition: 2005},
    {title: 'Book Three' , genre: 'History' , publish: 20005 , edition: 2006},
    {title: 'Book Four' , genre: 'Science' , publish: 1999 , edition: 2007},
    {title: 'Book Five' , genre: 'Fiction' , publish: 2001 , edition: 2008},
    {title: 'Book Six' , genre: 'History' , publish: 1987 , edition: 2009},
    {title: 'Book Seven' , genre: 'Non-Fiction' , publish: 2000 , edition: 2010},
 ];

 let userBooks = books.filter ( (bk) => bk.genre === 'History' )

userBooks = books.filter ( (bk) => {

   return bk.publish >= 1999 && bk.genre==='Science'

} )


console.log(userBooks);
