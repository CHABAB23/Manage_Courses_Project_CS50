require('dotenv').config()
const asyncWarraper = require('../middleware/asyncWarraper');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const generateJWT = require("../utils/generateJWT");
const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');

const getAllUsers = asyncWarraper( async (req,res) => {
    const query = req.query;
    const limit = query.limit;
    const page = query.page;
    const skip = (page - 1)*limit;

    const users = await User.find({},{"__v" : false ,"password" : false}).limit(limit).skip(skip);
    res.json({status : "seccess" , data : {users}})

});

const register = asyncWarraper( async (req,res)=>{

    const {FirstName, LastName, email, password ,role} = req.body;
    const OldEmail = await User.findOne({email : email});
    const hashedPassword = await bcrypt.hash(password, 10);
    if(OldEmail){res.status(400).json({ERROR : "EMAIL ALREADY EXIST"});}
    const newUser = new User({FirstName, LastName, email, password : hashedPassword,role});
    
    // generate JWT token 

    //const token = await generateJWT({email: newUser.email, id: newUser._id, role: newUser.role});
    //newUser.token = token;
    
    await newUser.save();
    const users = await User.find({},{"__v" : false,"password" : false,"token" : false});
    res.status(201).json({status : "seccess" , data : {users}});

    
});

const login =  asyncWarraper( async (req , res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email : email});
    if(!user){res.status(400).json({ERROR : "USER NOT EXIST"});
    }else if(!await bcrypt.compare(password, user.password)){
        res.status(400).json({ERROR : "invalid password"})
    }else{
        const token = await generateJWT({email: user.email, id: user._id,role: user.role});

        res.status(200).json({Login : "Login successed", data: {token}});
    }
});

module.exports = {
    getAllUsers,
    register,
    login
}