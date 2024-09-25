import express from 'express';
import { register,login,logout,getProfile,forgotPassword,resetPassword, changePassword, updateUser } from '../controllers/user.controller';
import { isLoggedIn } from '../middlewares/auth.middleware';
import upload from '../middlewares/multer.middleware';
const router=express.Router();
router.post('/register',upload.single('avatar'),register);
router.post('/login',login);
router.get('/logout',logout);   
router.get('/me',isLoggedIn,getProfile);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:resetToken',resetPassword);
router.post('/change-password',isLoggedIn,changePassword);
router.put('/update',isLoggedIn,upload.single('avatar'),updateUser)

export default router;
