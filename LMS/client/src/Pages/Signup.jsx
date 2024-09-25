import { useState } from "react";
import HomeLayout from "../HomeLayout/HomeLayout";
import { BsPersonFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import { createAccount } from "../redux/slices/authSlice";
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: ""
  });
  const [previewImage, setPreviewImage] = useState("");
  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }
  function getImage(e){
    e.preventDefault();
    const uploadedImage=e.target.files[0];
    if(uploadedImage){
        setSignupData({
            ...signupData,
            avatar:uploadedImage
        })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        const fileReader=new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load",function(){
            setPreviewImage(this.result);
        })
    }

  }
  async function createNewAccount(e){
    e.preventDefault();
    if(!signupData.fullName||!signupData.email||!signupData.password||!signupData.avatar){
        toast.error("All fields are required");
        return;
    }
    if(signupData.fullName.length<5){
        toast.error("Full Name length must be greater than 5 characters")
        return;
    }
    if(!signupData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        toast.error("Invalid email");
        return;
    }
    if(!signupData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
        toast.error("Password must have around 6 to 16 characters with atleast one number and a special character");
        return;
    }
    const formData=new FormData();
    formData.append("fullName",signupData.fullName);
    formData.append("email",signupData.email);
    formData.append("password",signupData.password);
    formData.append("avatar",signupData.avatar);
    const response=await dispatch(createAccount(formData));
 
    if(response?.payload?.success){
    setSignupData({
        fullName: "",
        email: "",
        password: "",
        avatar: "",
    })
    setPreviewImage("");
    navigate('/');
    }
  }
  return (
    <HomeLayout>
      <div className="h-screen flex items-center justify-center">
        <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <h1  className="text-2xl text-center font-bold">Registration Page</h1>
          <label htmlFor="avatar" className="cursor-pointer">
            {previewImage ? (
              <img className="rounded-full w-24 h-24 m-auto" src={previewImage} />
            ) : (
              <BsPersonFill className="rounded-full w-24 h-24 m-auto" />
            )}
          </label>
          <input
            type="file"
            className="hidden"
            name="avatar"
            id="avatar"
            accept=".png, .jpg .jpeg,.svg"
            onChange={getImage}
          />
           <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="bg-transparent px-2 py-1 border"
              placeholder="Enter your full name"
              required
              onChange={handleUserInput}
              value={signupData.fullName}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-transparent px-2 py-1 border"
              placeholder="Enter your email"
              onChange={handleUserInput}
              value={signupData.email}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-transparent px-2 py-1 border"
              placeholder="Enter your password"
              onChange={handleUserInput}
              value={signupData.password}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 mt-3 py-2 font-semibold hover:bg-yellow-600 transition-all ease-in-out duration-300"
          >
            Create Account
          </button>
          <p className="text-center">
            Already have account ?{" "}
            <Link to="/login" className="link text-accent">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Signup;
