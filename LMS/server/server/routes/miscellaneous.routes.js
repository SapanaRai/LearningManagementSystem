import express from 'express';
import miscellaneousController from '../controllers/miscellaneous.controller';

const router=express.Router();

router.route('/')
        .post(miscellaneousController.contactUs)


export default router;