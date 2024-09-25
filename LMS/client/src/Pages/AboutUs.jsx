import HomeLayout from "../HomeLayout/HomeLayout";
import aboutMainImage from "../Assets/images/aboutMainImage.png";
import celebrities from "../Constants/CelebrityData";
import CarouselSlide from "../Components/CarouselSlide";

function AboutUs() {
  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white">
        <div className="flex items-center gap-5 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className="text-yellow-500 text-5xl font-semibold">
              Affordable and quality education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide the affordable and quality education to the
              world. We are providing the platform for the aspiring teachers and
              students to share their skills, creativity and knowledge to each
              other to empower and contribute in the growth and
            </p>
          </section>
          <div className="w-1/2">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0,0,0))",
              }}
              alt="About Main Image"
              className="drop-shadow-2xl"
              src={aboutMainImage}
            />
          </div>
        </div>
        <div className="carousel m-auto w-1/2 my-16">
          {celebrities.map((celeb) => (
            <CarouselSlide
              {...celeb}
              key={celeb.slideNumber}
              totalSlides={celebrities.length}
            />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
