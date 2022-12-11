const asyncHandler = require("express-async-handler");
const Movie = require('../../models/Movie');
const { uploadFile } = require("../../utils/s3");
const fs = require('fs')
const util = require('util')
// const unlinkFile = util.promisify(fs.unlink)


const addmovie = asyncHandler(async(req,res)=>{
    try {
       console.log(req.params.id +'adsaf') 
       const id = req.params.id
       const { file } = req;
       console.log(file)
       const result = await uploadFile(file);
    //    await unlinkFile(file.path)
       console.log(result);
       return res.status(201).json({ status:true });
    } catch (error) {
        console.log(error)
    }
})




const addMovieInfo = asyncHandler(async(req,res)=>{
    try {
        // console.log(req.body)
        const data = await Movie(req.body).save()
        // console.log(data);
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
})



module.exports = {
    addmovie,
    addMovieInfo
}