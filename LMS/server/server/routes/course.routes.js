import express from 'express';
import {addLectureToCourseById, createCourse, deleteCourse, getAllCourses, getLecturesByCourseId, updateCourse } from '../controllers/course.controller';
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware';
import upload from '../middlewares/multer.middleware';


const router=express.Router();

router.route('/')
       .get(getAllCourses)
       .post(isLoggedIn,upload.single('thumbnail'),createCourse);
router.route('/:id')
        .get(isLoggedIn,getLecturesByCourseId)
        .put(isLoggedIn,updateCourse)
        .delete(isLoggedIn,deleteCourse)
        .post(addLectureToCourseById);
export default router;