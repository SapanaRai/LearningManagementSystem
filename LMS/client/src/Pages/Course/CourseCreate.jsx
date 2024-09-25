import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createCourse } from "../../redux/slices/courseSlice";
import HomeLayout from "../../HomeLayout/HomeLayout";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
function CourseCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category:"",
    createdBy: "",
    thumbnail: null,
    previewImage: "",
  });
  function handleImageUpload(e) {
    e.preventDefault();
    const imageUploaded = e.target.files[0];
    if (imageUploaded) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageUploaded);
      fileReader.addEventListener("load", function(){
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: imageUploaded,
        });
      });
    }
  }
  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  }
  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.createdBy ||
      !userInput.category||
      !userInput.thumbnail
    ) {
      toast.error("All fields are mandatory");
      return;
    }
    const response = await dispatch(createCourse(userInput));
    console.log(response);
    
    if (response?.payload?.success) {
      navigate("/courses");
      setUserInput({
        title: "",
        description: "",
        category:"",
        createdBy: "",
        thumbnail: null,
        previewImage: "",
      });
    
    }
  }
  return (
    <HomeLayout>
      <div className="h-[90vh] flex justify-center items-center text-white">
       
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col items-center border shadow-[0_0_10px_black] px-4 py-4 gap-5 relative"
        >
           <Link to="/courses" 
           className="absolute top-8 text-2xl text-accent cursor-pointer left-5">
            <AiOutlineArrowLeft/>
            </Link> 
          <h1 className="text-2xl font-bold ">Create new course</h1>
          <main className="grid grid-cols-2 gap-10">
            <div className="gap-y-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput.previewImage ? (
                    <img
                      alt="Thumbnail"
                      className="w-full h-44 m-auto border"
                      src={userInput.previewImage}
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                      <h1 className="font-bold text-lg">
                        Upload your course thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  name="image_uploads"
                  id="image_uploads"
                  className="hidden"
                  accept=".jpg,jpeg,.png"
                />
              </div>
              <div>
                <label htmlFor="course_title" className="font-bold">
                  Course Title
                </label>
                <input
                  type="text"
                  id="course_title"
                  name="title"
                  className="w-full bg-transparent border px-2 py-1 "
                  placeholder="Enter the course title"
                  value={userInput.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>
            <div className="gap-y-6">
              <div>
                <label htmlFor="course_instructor" className="font-semibold">
                  Course Instructor
                </label>
                <input
                  type="text"
                  id="course_instructor"
                  name="createdBy"
                  className="w-full bg-transparent border h-8 px-2 py-1"
                  placeholder="Enter the instructor"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />
              </div>
              <div>
                <label htmlFor="category" className="font-semibold">
                  Course Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="w-full bg-transparent border h-8 px-2 py-1"
                  placeholder="Enter the category"
                  value={userInput.category}
                  onChange={handleUserInput}
                />
              </div>
              <div>
                <label htmlFor="course_description" className="font-semibold">
                  Course description
                </label>
                <textarea
                  id="course_description"
                  name="description"
                  className=" bg-transparent border h-24  resize-none px-2 w-full"
                  placeholder="Enter the description"
                  value={userInput.description}
                  onChange={handleUserInput}
                ></textarea>
              </div>
            </div>
          </main>
          <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 w-full py-2 rounded-sm font-semibold transition-all ease-in-out duration-300">Create Course</button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CourseCreate;
