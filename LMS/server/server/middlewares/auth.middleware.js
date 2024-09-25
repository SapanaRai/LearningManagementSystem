import AppError from "../utils/error.util";
import jwt from 'jsonwebtoken';
const isLoggedIn=async(req,res,next)=>{
    
    const {token}=req.cookies;
    if(!token){
        return next(new AppError(401,'Unauthenticated, please login again'))
    }
    const userDetails=await jwt.verify(token,process.env.JWT_SECRET);
    req.user=userDetails;
    next();
}
const authorizedRoles=(...roles)=>async(req,res,next)=>{
    const currentUserRole=req.user.role;
    if(roles.includes(currentUserRole)){
        return next(new AppError(403,'You do not have permission to access this route'))
    }
    next();

}
export {isLoggedIn,authorizedRoles};