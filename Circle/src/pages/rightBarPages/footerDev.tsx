import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";


export function Footer() {
  return (
    <div >
      {/* Profile Section */}
      
      {/* Suggested Users */}

      {/* develop */}
      <div className="bg-[#333e35] p-3 rounded-lg mt-3 pr">
        <p className=" flex text-xs font-light items-center gap-1.5">
          Developed by
          <p className="font-semibold">Septania </p> •
          <FaGithub size={15} href="" />
          <FaLinkedin size={15} href="" />
          <FaFacebook size={15} href="" />
          <PiInstagramLogoFill size={16} href="" />
        </p>
        <p className="flex text-gray-500 gap-1 text-xs mt-1 items-center">
          Powered by
          <img className="w-4" src="/public/logo.png" /> DumbWays
          Indonesia • #1CodingBootcamp
        </p>
      </div>
    </div>
  );
}

