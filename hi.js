

// let a = new Date()
// console.log(new Date())

// let num = new Array(10000000)

// let numbers = Array.from(num, (_, i) => i + 1);

// // const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue);
// let sum = 0
// for (let i = 0; i < numbers.length; i++) {
//     sum = sum+numbers[i]
// }
// console.log(sum); // 15
// let b = new Date()
// console.log(b-a)


// let count = 0;

// function logMessage() {
//   console.log(`This message has been logged ${count} times.`);
//   count++;
//     console.log('hello');
//   setTimeout(logMessage, 1000);
// }

// logMessage();

let count = 0;

function logMessages() {
  for (let i = 0; i < 100; i++) {
      setTimeout(()=>{
        console.log('prijith ser')
      }, 500);
      console.log(`This is message number ${i}.`);
  }

  count++;
}

logMessages();


