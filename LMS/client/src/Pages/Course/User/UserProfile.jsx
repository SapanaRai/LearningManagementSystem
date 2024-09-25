import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomeLayout from '../../HomeLayout/HomeLayout'
import { useEffect } from "react";
import { getUserData } from "../../redux/slices/authSlice";
 function UserProfile(){
    const userData=useSelector((state)=>state?.auth?.data);
    const dispatch=useDispatch();
   useEffect(()=>{
        dispatch(getUserData());  
    },[]);
return(
    <HomeLayout>
        <div className="min-h-[90vh] flex justify-center items-center text-white">
        <div className=" flex w-80 gap-4 rounded-lg px-2 flex-col justify-center items-center py-4 shadow-[0_0_10px_black]">
            <img 
            src={userData?.avatar?.secure_url}
            alt="User profile"
            className="rounded-full w-40 m-auto border border-black"
            />
            <h3 className="capitalize font-semibold mt-2 text-xl">{userData.fullName}</h3>
            <div className="grid grid-cols-2">
                <p>Email:</p><p>{userData.email}</p>
                <p>Role:</p><p>{userData.role}</p>
                <p>Subscription:</p><p>Active</p>

            </div>
            <div className="flex gap-2 items-center justify-between w-full">
                <Link to="/changepassword"
                className="w-1/2 bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 py-2 font-semibold cursor-pointer text-center">
                    <button>Change Password</button>
                </Link>
                <Link to="/user/editprofile"
                className="w-1/2 bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 py-2 font-semibold cursor-pointer text-center">
                    <button>Edit profile</button>
                </Link>

            </div>
            {userData?.subscription?.status ==='Active'&&(
 <button className="bg-red-600 hover:bg-red-700 w-full py-2 transition-all ease-in-out duration-300">
 Cancel Subscription
</button>
            )            }
        </div>
    </div>
    </HomeLayout>
)
}
export default UserProfile;