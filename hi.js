let now = new Date();
let ne = new Date();
let nale = new Date();
let nalathekazhinju = new Date();
let date = [now, ne, nale, nalathekazhinju];
let row = 10;
let Numbers = 10;

let seating = [];
let seats = [];
for (let i = 0; i < date.length; i++) {
  let time = date[i]
  for (let i = 0; i < row; i++) {
    let arr = [];
    let id = String.fromCharCode(i + 65)
    for (let j = 0; j < Numbers; j++) {
      arr.push({index:`${id}${j+1}`,isReserved: false, user: "" });
    }
    seats.push(arr);
  }
  seating.push({time,seats})
}
console.log(seating);


db.pushNewItemsDemo.insertOne(
  {
     "_id" :1,
     "StudentScore" : 56,
     "StudentOtherDetails" : [
        {
           "StudentName" : "John",
           "StudentFriendName" : [
              "Bob",
              "Carol"
           ]
        },
        {
           "StudentName" : "David",
           "StudentFriendName" : [
              "Mike",
              "Sam"
           ]      
        }
     ]
  }
);
db.pushNewItemsDemo.update({"_id":1,"Screen":{"$elemMatch":{"screenName":"David"}}},
   {"$push":{"Screen.$.screenName":"James"}});
