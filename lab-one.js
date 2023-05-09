const mySum = (...numbers) => {
    return numbers.reduce((sum, num) => sum + num, 0);
  }

let myArr = [3,4,12,20,34,56,69,13,39,102];

let result = mySum(...myArr);

console.log(result);

let mySecondArr = myArr.map(num => num* 2)

  let total = mySum(...mySecondArr)
  let average = total / mySecondArr.length
  const filteredArr = mySecondArr.filter(num => {
    if(num > average){
      console.log(num);
    }
  })


  
  const Employee = 
    {
      name: "Shoko Asahaka",
      email: "shugyo@oum.com",
      department: "relaxation",
      startDate: "2021-01-01"
    }

  const Person ={
    name: Employee.name,
    email: Employee.email
  }
  
  // console.table(Person);
    setTimeout(() => {
    console.log("Goodbye");
  }, 3000);

  module.exports = {
    mySum
  }