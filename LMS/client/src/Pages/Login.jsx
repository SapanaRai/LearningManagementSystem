import { useState } from "react";
import HomeLayout from "../HomeLayout/HomeLayout";
import { BsPersonFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import { login } from "../redux/slices/authSlice";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }
  

  
  async function onLogin(e){
    e.preventDefault();
    if(!loginData.email||!loginData.password){
        toast.error("All fields are required");
        return;
    }
    const response=await dispatch(login(loginData));

    if(response?.payload?.success){
        navigate('/')
    setLoginData({
        email: "",
        password: "",
    })

    }
  }
  return (
    <HomeLayout>
      <div className="h-screen flex items-center justify-center">
        <form noValidate onSubmit={onLogin} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <h1  className="text-2xl text-center font-bold">Login Page </h1> 
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
              value={loginData.email}
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
              value={loginData.password}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 mt-3 py-2 font-semibold hover:bg-yellow-600 transition-all ease-in-out duration-300"
          >
            Login
          </button>
          <p className="text-center">
            Don't have an account ?{" "}
            <Link to="/signup" className="link text-accent">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;
