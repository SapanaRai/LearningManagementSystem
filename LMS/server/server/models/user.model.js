import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { } from 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Schema, model } from 'mongoose';
const userSchema=new Schema({
    fullName:{
        type:String,required:[true,"Name is required"],minLength:[5,"Name must be at least 5 character"],maxLength:[50,"Name must be at least 50 character"],lowercase:true,trim:true
    },
    email:{
        type:String,required:[true,'Email is required'],lowercase:true,trim:true,unique:true,match:[/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "Please fill in a valid email address"]
    },
    password:{
        type:String,required:[true,'Password is required'],minLength:[8,'Password must be at least 8 charactesrs'],
        select:false
    },
    avatar:{
        public_id:{type:String},secure_url:{type:String}
    },
    role:{
        type:String,
        enum:["USER","AMDIN"],
        default:'USER'
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date
},{timestamps:true});
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
})
userSchema.methods={
    generateJWTToken: async function() {
        return await jwt.sign(
            { id: this._id, email: this.email, subscription: this.subscription, role: this.role },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        )
    },
    comparePassword:async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.password);
    },
    generateResetPasswordToken:async function(){
       const resetToken=crypto.randomBytes(20).toString('hex');
       this.forgotPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex');
       this.forgotPasswordExpiry=Date.now()+15*60*1000;
       return resetToken;
    }
}
const User=model('User',userSchema,'users');
export default User;