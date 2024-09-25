import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../HomeLayout/HomeLayout";
import { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { getUserData, updateProfile } from "../../redux/slices/authSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function EditProfile() {
  const [data, setData] = useState({
    fullName: "",
    previewImage: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?._id),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }
  function handleUserInput(e){
    const {name,value}=e.target;
    setData({
        ...data,
        [name]:value
    })
    
  }
  async function onFormSubmit(e){
    e.preventDefault();
    if(!data.fullName||!data.avatar){
        toast.error("All fields are mandatory");
        return;
    }
    const formData=new FormData();
    formData.append("fullName",data.fullName);
    formData.append("avatar",data.avatar);
    await dispatch(updateProfile([data.userId,formData]));
    await dispatch(getUserData());    
    navigate('/user/profile');
  }

  return (
    <HomeLayout>
      <div className="h-[90vh] flex justify-center items-center">
        <form onSubmit={onFormSubmit} noValidate className="flex flex-col rounded-lg gap-5 shadow-[0_0_10px_black] w-80 p-4 h-[26rem] text-white">
          <h1 className="text-2xl text-center font-semibold">Edit Profile</h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {data.previewImage ? (
              <img
                alt="Avatar"
                src={data.previewImage}
                className="w-28 h-28 m-auto  rounded-full "
                accept=".jpg,.jpeg,.svg,.png"
              />
            ) : (
              <div>
                <BsFillPersonFill className="w-24 h-24 m-auto border rounded-full border-black" />
              </div>
            )}
          </label>
          <input
            type="file"
            className="hidden"
            id="image_uploads"
            name="image_uploads"
            onChange={handleImageUpload}
          />
          <div className="flex flex-col ">
            <label htmlFor="fullName">FullName</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="bg-transparent border rounded-sm px-2 py-1"
              placeholder="Enter your name"
              onChange={handleUserInput}
              value={data.fullName}
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-700 px-3 py-2 rounded-md font-semibold transition-all ease-in-out duration-300"
          >
            Update profile
          </button>
          <Link to="/user/profile">
            <p className="text-accent link cursor-pointer flex items-center justify-center gap-1"><AiOutlineArrowLeft/> back to profile</p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}
export default EditProfile;
