
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    Genre:{
        type:String,  
    },
    director:{
        type:String,  
    },
    Duration:{
        type:String,  
    },
    startDate:{
        type:Date,  
    },
    
    YoutubeLink:{
        type:String,  
    },
    Review:{
        type:Array,  
    },
    Language:{
      type:Array,
    }

  },
  {
    timestamps: true,
  }
);


const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;