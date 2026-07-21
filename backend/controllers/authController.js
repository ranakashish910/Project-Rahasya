const {User}=require('../models')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const signup=async(req,res)=>{
    try{
        const {username,email,password}=req.body

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"user already exists"})
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const user=await User.create({
            username,email,password:hashedPassword
        })
        return res.status(200).json({message:"Signup successful"})

    }catch(error){
        return res.status(400).json({message:error.message})
    }
}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const existingUser=await User.findOne({email})
        if(!existingUser){
            return res.status(404).json({message:"User not found"})
        }

        const match=await bcrypt.compare(password,existingUser.password)
        if(!match){
            return res.status(401).json({message:"Invalid password"})
        }
        const token=jwt.sign({id:existingUser._id,email:existingUser.email,username:existingUser.username,role:existingUser.role},process.env.JWT_SECRET,{expiresIn:"7d"})
        console.log(process.env.JWT_SECRET);
        return res.status(200).json({message:"Successful",
            token,
            user:{
                id:existingUser._id,
                username:existingUser.username,
                email:existingUser.email,
                role:existingUser.role
            }
        })

    }catch(error){
        console.log(error)
        res.status(500).json({message:error.message})
    }
}

module.exports={signup,login}