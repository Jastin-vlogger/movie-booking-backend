// const binarySearch = (arry, target) => {
//   console.log("heh");
//   let start = 0;
//   let end = arry.length - 1;
//   while (start <= end) {
//     let middle = Math.floor(start + end / 2);
//     if (target <= arry[middle]) {
//       return console.log(middle + "got at first middle");
//     }
//     if (target > arry[middle]) {
//       console.log("Searching the right side of Array");
//       start = middle + 1;
//     }
//     if (target < arry[middle]) {
//       console.log("Searching the left side of Array");

//       end = middle - 1;
//     }
//     return -1;
//   }
//   console.log("Target value not found in array");
// };

// binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 11);

// const process = (callback)=>{
//   const result = "procees data";
//   callback(result)
// }

// const handleCallback = (result)=>{
//   console.log(result)
// }

// process(handleCallback)

// const sum = (callback , a,b) =>{
//   const result = a + b;
//   callback(result)
// }

// const multiply = (result)=>{
//   console.log(result * 8);
// }

// sum(multiply,5,6)

// const addition = (a, b) => {
//   return new Promise((resolve, reject) => {
//     const result = a + b;
//     resolve(result);
//   });
// };

// addition(5, 6).then((response) => {
//   return new Promise((resolve, reject) => {
//     const result = response * 6;
//     resolve(result)
//   }).then((response)=>{
//     console.log(response)
//   });
// });
