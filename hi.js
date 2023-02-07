// function reverseArray(arr){
//     let temp = 0
//     let hi = arr.length
//     for(i=0;i<hi/2;i++){
//         temp = arr[i];
//         arr[i]=arr[hi-i-1];
//         arr[hi-i-1] = temp;
//     }
//     console.log(arr)
// }
function reverseArray(arr){
    const array = [];
        for (let j = 0; j < arr.length; j++) {
            array[j+arr.length] =arr[j]
        }
    return array
}

// function reverseArray(arr){
//     let temp = 0
//     let j=arr.lenght-1
//     for(i=0;i<=arr.lenght/2;i++){
//         temp = arr[i];
//         arr[i]=arr[j];
//         arr[j] = temp;
//         j--
//     }
//     console.log(arr)
// }

console.log(reverseArray([1,2,3]))