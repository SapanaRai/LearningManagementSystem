import User from "../models/user.model";
import AppError from "../utils/error.util";
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import {} from 'dotenv/config';
import sendEmail from "../utils/sendEmail";
import crypto from 'crypto';
const cookieOptions={
    maxAge:7*24*60*60*1000,
    httpOnly:true,
    secure:true
}          
const register=async(req,res,next)=>{
    const {fullName,email,password}=req.body;
    if(!fullName||!email||!password){
        return next(new AppError(400,"All fields are required"));
    }
    const userExists=await User.findOne({email:email});
    if(userExists){
        return next(new AppError(400,"Email already exists"));
    }
    const user=await User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id:email,
            secure_url:'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg'
        }
    })
    if(!user){
        return next(new AppError(400,'User registration failed,please try again!'));
    }
    //TODO:File upload
    console.log('File Details>',JSON.stringify(req.file));
    if(req.file){
        try{
            const result=await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
                width:250,
                height:250,
                gravity:'faces',
                crop:'fill'
            });
            if(result){
                user.avatar.public_id=result.public_id;
                user.avatar.secure_url=result.secure_url;
                //Remove file from server
                 fs.rm(`uploads/${req.file.filename}`)
            }
            
        }catch(e){
            return next(new AppError(500,e||'Could not upload file,plese try again'));
        }
    }
    await user.save();
    user.password=undefined;
    const token=await user.generateJWTToken();
    res.cookie('token',token,cookieOptions);
    res.status(201).json({
        success:true,
        message:'User registered successfully',
        user,
        token
    })


    
}
const login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return next(new AppError(400,'All fields are required'));
        }
        const user=await User.findOne({email}).select('+password');
        if(!user||!user.comparePassword(password)){
            return next(new AppError(400,'Email or password does not match'));
        }
        
        const token=await user.generateJWTToken();   
        user.password=undefined;
        res.cookie('token', token, cookieOptions);
      
        res.status(200).json({
            success:true,
            message:'User loggedin Succesfully',
            user
        })
    }catch(err){
        return next(new AppError(500,err.message));
    }
}
const logout=(req,res)=>{
        res.cookie('token',null,{
            secure:true,
            maxAge:0,
            httpOnly:true
        })
        res.status(200).json({
            success:true,
            message:'User logged out succesfully'
        })
}
const getProfile=async(req,res,next)=>{
   try{
    const userId=req.user.id;
    const user=await User.findById(userId);
    res.status(200).json({
        success:true,
        message:'User Details',
        user
    });
   }catch(err){
    return next(new AppError('Failed to fetch profile details',err.message));
   }
}
const forgotPassword=async(req,res,next)=>{
   const {email}=req.body;
   if(!email){
    return next(new AppError(400,'Email required '));
   }
   const user=await User.findOne({email});
   if(!user){
    
    return next(new AppError(400,'Email not registered'));
   }
   const resetToken=await user.generateResetPasswordToken();
   await user.save();
   const resetPasswordURL=`${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
   console.log(resetPasswordURL);
   const subject=`Reset Password`;
   const message=`You can reset your password by clicking <a href=${resetPasswordURL} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordURL} If you have not requested this, kindly ignore.`
   try{
    await sendEmail(email,subject,message);
    res.status(200).json({
        success:true,
        message:`Reset password has been sent to ${email} successfully` 
    })
   }catch(e){
    return next(new AppError(400,e.message))
   }
}
const resetPassword=async(req,res,next)=>{
  const {resetToken}=req.params;
  const {password}=req.body;
  const forgotPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex');
  const user=await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry:{$gt:Date.now()}
  })
  if(!user){
    return next(new AppError(400,'The reset token is invalid or expired'));
  }
  user.password=password;
  user.forgotPasswordExpiry=undefined;
  user.forgotPasswordToken=undefined;
  await user.save();
  res.status(200).json({
    success:true,
    message:"Password changed succesfully"
  })
}
const changePassword=async(req,res,next)=>{
    const {oldPassword,newPassword}=req.body;
    const {id}=req.user;
    if(!oldPassword||!newPassword){
        return next(new AppError(400,'All fields are required'));
    }
    const user=await user.findOne({_id:id}).select('+password');
    if(!user){
        return next(new AppError(400,'User does not exist'));
    }
    const isPasswordValid=await user.comparePassword(oldPassword);
    if(!isPasswordValid){
        return next(new AppError(400,'Invalid old password'));
    }
    user.password=newPassword;
    user.save();
    user.password=undefined;
    res.status(200).json({
        success:true,
        message:"Password Changed successfully"
    })
}
const updateUser=async(req,res,next)=>{
    const {fullName}=req.body;
    const {id}=req.user.id;
    const user=await User.findById(id);
    if(!user){
        return next(new AppError(400,'User does not exist'));
    }
    if(req.fullName){
        user.fullName=fullName;
    }
    if(req.file){
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        try{
            const result=await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
                width:250,
                height:250,
                gravity:faces,
                crop:'fill'
            });
            if(result){
                user.avatar.public_id=result.public_id;
                user.avatar.secure_url=result.secure_url;
                fs.rm(`uploads/${req.file.filename}`);
            }
           
        }catch(err){
            return next(new AppError(500,e||'File not uploaded, please try again'));
        }
    }


}
export {register,login,logout,getProfile,forgotPassword,resetPassword,changePassword,updateUser};