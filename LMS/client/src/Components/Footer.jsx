import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <footer className="relative left-0 bottom-0 flex flex-col align-center justify-between py-5  text-white bg-gray-800 h-[10vh] sm:flex-row sm:px-20">
      <section className="text-lg">
        Copyright {year} | All rights reserved
      </section>
      <section className="flex gap-5 align-center justify-center text-[50px] text-white">
        <a
          href="#"
          className="hover:text-yellow-500 transition-all ease-in-out duration-300"
        >
          <BsFacebook />
        </a>
        <a
          href="#"
          className="hover:text-yellow-500 transition-all ease-in-out duration-300"
        >
          <BsInstagram />
        </a>
        <a
          href="#"
          className="hover:text-yellow-500 transition-all ease-in-out duration-300"
        >
          <BsLinkedin />
        </a>
        <a
          href="#"
          className="hover:text-yellow-500 transition-all ease-in-out duration-300"
        >
          <BsTwitter />
        </a>
      </section>
    </footer>
  );
}

export default Footer;
