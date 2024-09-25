import { useState } from "react";
import HomeLayout from "../HomeLayout/HomeLayout";
import toast from "react-hot-toast";
import axiosInstance from "../Helpers/axiosInstance";

function ContactUs() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  function handleUserInput(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }
  async function onFormSubmit(e){
    e.preventDefault();
    if(!userInput.name||!userInput.email||!userInput.message){
      toast.error("All fields are required");
      return;
    }
    if(!userInput.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      toast.error("Invalid email");
      return;
    }
    try{
      const response=axiosInstance.post("/contact",userInput);
      toast.promise(response,{
        loading:"Submitting your message",
        success:"Form submitted succesfully",
        error:"Failed to submit the form"
      })
      const contactResponse=await response;
      if(contactResponse?.data?.success){
        setUserInput({
          name:"",
          email:"",
          password:""
        })
      }
    }catch(error){
      toast.error("Operation failed");
    }
  }
  return (
    <HomeLayout>
      <div  className="h-[90vh] flex items-center justify-center">
        <form noValidate onSubmit={onFormSubmit}  className="w-[22rem] rounded-md  shadow-[0_0_10px_black] text-white border justify-center items-center flex flex-col gap-2 p-5">
          <h1 className="text-3xl font-semibold">Contact Form</h1>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              type="text"
              className="bg-transparent rounded-sm border  px-2 py-1 "
              name="name"
              id="name"
              placeholder="Enter your name"
              onChange={handleUserInput}
              
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
            <input
              type="email"
              className="bg-transparent rounded-sm border  px-2 py-1 "
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleUserInput}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="name" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              className="bg-transparent rounded-sm border px-2 py-1 resize-none h-40"
              name="message"
              id="message"
              placeholder="Enter your message"
              onChange={handleUserInput}
            ></textarea>
          </div>
          <button
            type="submit"
            className="border text-white font-semibold bg-yellow-500 hover:bg-yellow-600 py-1 w-full transition-all ease-in-out duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ContactUs;
