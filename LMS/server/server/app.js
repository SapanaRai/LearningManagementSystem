import cookieParser from 'cookie-parser';
import cors from 'cors';
import { } from 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware';
import courseRoutes from './routes/course.routes';
import contactRoutes from './routes/miscellaneous.routes';
import userRoutes from './routes/user.routes';
const app=express();

app.use(express.json());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}))
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/ping',function(req,res){
    res.send('pong');
})
//Routes of 3 modules
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/course',courseRoutes);
app.use('/api/v1/contact',contactRoutes)

app.all('*',(req,res)=>{
    res.status(404).send('OOPS!! 404 page not found');
})

app.use(errorMiddleware);
export default app;