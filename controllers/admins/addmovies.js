const asyncHandler = require("express-async-handler");
const Movie = require('../../models/Movie');
const { uploadFile } = require("../../utils/s3");
const fs = require('fs')
const util = require('util')
// const unlinkFile = util.promisify(fs.unlink)
const AdminModel = require('../../models/admin')
const {generateAdminToken} = require('../../utils/generatetoken')


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


const adminLogin = asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const Admin = await AdminModel.findOne({ email: email });
      if (!Admin) {
        res.json("Admin not found");
      } else {
        if (Admin.password !== password) {
          res.json("Please check your password");
        } else {
          let id = Admin._id;
          let tokenGenereted = await generateAdminToken(id);
          res.cookie("adminToken", tokenGenereted).json({
            id: Admin._id,
            email: Admin.email,
            token: tokenGenereted,
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(error?.status).json(error.message);
    }
  });



module.exports = {
    addmovie,
    addMovieInfo,
    adminLogin
}