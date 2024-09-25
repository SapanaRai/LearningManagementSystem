const miscellaneousController={
   async contactUs(req,res,next){
    const {name,email,message}=req.body;
    if(!name,!email,!message){
        return 
    }
        res.status(200).json({
            success:true,
            message:"Contact successfully fetched"
        })
   }
}
export default miscellaneousController;