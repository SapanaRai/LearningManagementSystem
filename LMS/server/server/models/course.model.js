import mongoose from "mongoose";
const courseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is required'],
        trim:true,
        minLength:[8,'Title length must be greater than 8'],
        maxLength:[60,'Title length must be less than 60']
    },
    description:{
        type:String,
        required:[true,'Description is required'],
        maxLength:[200,'Description must be less than 200']
    },
    category:{
        type:String,
        required:[true,'Category is required']
    },
    thumbnail:{
        public_id:{
            type:String,
            required:true
        },
        secure_url:{
            type:String,
            required:true
        }
    },
    lectures:[
        {
            title:String,
            description:String,
            lecture:{
                public_id:{
                    type:String,
                    required:true
                },
                secure_url:{
                    type:String,
                    required:true
                }
            }
        }
    ],
    numberOfLectures:{
        type:Number,
        default:0
    },
    createdBy:{
        type:String,
        required:true
    }
    
},{timestamps:true});

const Course=mongoose.model("Course",courseSchema,"courses");
export default Course;