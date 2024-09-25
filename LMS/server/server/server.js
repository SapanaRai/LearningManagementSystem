import app from './app';
import {} from 'dotenv/config';
import {v2 as cloudinary} from 'cloudinary';
import connectToDB from './config/dbConnection';
const PORT=process.env.PORT;

cloudinary.config({ 
  cloud_name: 'dgbxiu8yj', 
  api_key: '212787435519848', 
  api_secret: 'PO3uBRUpGAulGKrw1hPbWxs3kHU' 
});

app.listen(PORT,()=>{
     connectToDB();
    console.log(`App is running at http:localhost:${PORT} `);
})
