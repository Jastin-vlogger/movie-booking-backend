const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const theaterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        
    },
    theater:{
        type:String,
        required:[true,"Theater Name is required"], 
    },
    city:{
        type:String,
        required:[true,"City is required"],
    },
    address:{
        type:String,
        required:[true,"Address is required"],
    },
    state:{
        type:String,
        required:[true,"Name is required"],
    },
    email:{
        type:String,
        required:[true,"email is required"],
       
    },
    password:{
        type:String,
        required:[true,"Password is Required"]
    },
    isApproved:{
        type:Boolean,
        default:false,
    }
})

theaterSchema.pre('save',async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
    next()
})
theaterSchema.statics.login = async function(email,password){
    const theater = await this.findOne({email});
    // console.log(theater);
    if(theater){
        const auth = await bcrypt.compare(password, theater.password);
        if(auth){
            return theater;
        }
        throw Error("incorrect password")
    }
    throw Error ("incorrect email")
}



module.exports = mongoose.model("Theater",theaterSchema)