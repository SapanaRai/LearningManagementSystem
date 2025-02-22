import Course from "../models/course.model";
import AppError from "../utils/error.util";
import cloudinary from 'cloudinary';
import fs from 'fs/promises';

const getAllCourses=async(req,res,next)=>{
    try{
        const courses=await Course.find({}).select('-lectures');
        res.status(200).json({
            success:true,
            message:"All Courses",
            courses 
        })
    }catch(err){
        return next(new AppError(500,err.message));
    }
}
const getLecturesByCourseId=async(req,res,next)=>{
    const {id}=req.params;
    try{
        const course=await Course.findById(id);
        if(!course){
            return next(new AppError(400,'No Course found'))
        }
        res.status(200).json({
            success:true,
            message:"Course details succesfully fetched",
            lectures:course.lectures
        })
    }catch(e){
        return next(new AppError(500,e.messsage))
    }
}
const createCourse=async(req,res,next)=>{
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return next(new AppError(400,"All fields are required"));
    }


    const course=await Course.create({
            title,
            description,
            category,
            createdBy,
            thumbnail:{
                public_id:'Dummy',
                secure_url:'Dummy'
            }
        })
        if(!course){
            return next(new AppError(500,"Course could not be created, please try again"))
        }
        console.log(req.file);
        if(req.file){
            try{
            const result=await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
            });
            if(!result){
                return next(new AppError(500,"Could not upload file, please try again"));
            }
            course.thumbnail.public_id=result.public_id;
            course.thumbnail.secure_url=result.secure_url;
        
            fs.rm(`uploads/${req.file.filename}`);
        }catch(e){
            return next(new AppError(400,e.message));
        }
   
  

}
await course.save();
res.status(200).json({
    success:true,
    message:"Course Added Succesfully",
    course
})
}
const updateCourse=async(req,res,next)=>{
    const {id}=req.params;
    try{
        const course=await Course.findByIdAndUpdate(id,{
            $set:req.body
        },{
            runValidators:true
        })
        if(!course){
            return next(new AppError(500,'Course with given id does not exist'));
        }
        res.status(200).json({
            success:true,
            message:"Course updated succesfully",
            course
        })
    }catch(e){
        return next(new AppError(400,e.message));
    }
}
const deleteCourse=async(req,res,next)=>{
    const {id}=req.params;
    try{
        const course=await Course.findByIdAndDelete(id);
        if(!course){
            return next(new AppError(500,"Course with given id not found"));
        }
        res.status(200).json({
            success:true,
            message:"Course deleted succesfully",
            course
        })
    }catch(e){
        return next(new AppError(400,e.message))
    }
}
const addLectureToCourseById=async(req,res,next)=>{
    try {
        const { title, description } = req.body;
        const { id } = req.params;
    
        if (!title || !description) {
          return next(new AppError(400,"All fields required"));
        }
    
        const course = await Course.findById(id);
    
        if (!course) {
          return next(new AppError(500,"Course with given id does not exist"));
        }
    
        const lecutureData = {
          title,
          description,
          lecture: {}
        };
    
        if (req.file) {
          try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
              folder: "lms",
            });
            if (result) {
              lecutureData.lecture.public_id = result.public_id;
              lecutureData.lecture.secure_url = result.secure_url;
            }
    
            fs.rm(`uploads/${req.file.filename}`);
          } catch (e) {
            return next(new AppError(500,e.message));
          }
        }
    
        console.log('lecture> ', JSON.stringify(lecutureData));
        course.lectures.push(lecutureData);
    
        course.numberOfLectures = course.lectures.length;
    
        await course.save();
    
        res.status(200).json({
          success: true,
          message: "Lecture successfully added to the course",
          course,
        });
      } catch (e) {
        return next(new AppError(500,e.message));
      }

}
export {getAllCourses,getLecturesByCourseId,createCourse,updateCourse,deleteCourse,addLectureToCourseById};