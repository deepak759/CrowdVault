import { useState } from "react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const mailtoLink = `mailto:deepaksharma28787@gmail.com?subject=Message from CrowdVault&body=${encodeURIComponent(
      message
    )}`;
    window.location.href = mailtoLink;
  };
  return (
    <footer className="bg-[#1f2937] text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start  space-y-6 md:space-y-0">
        <div className="md:w-2/5 md:pr-14">
          <h2 className="text-lg font-bold mb-2">CrowdVault</h2>
          <p className="text-gray-200 font-semibol text-lg">
          CrowdVault is a secure crowdfunding platform where entrepreneurs and
            investors connect seamlessly. Entrepreneurs receive funding in
            batches, ensuring that investors can withdraw remaining funds if
            trust is lost, promoting transparency and confidence
          </p>
          <div className="flex space-x-4 text-xl mt-4">
            <a href="#" className="text-gray-200 hover:text-gray-100">
              <i className="fab fa-instagram">
                <FaInstagram />
              </i>
            </a>
            <a href="#" className="text-gray-200 hover:text-gray-100">
              <i className="fab fa-linkedin">
                <FaLinkedin />
              </i>
            </a>
            <a href="#" className="text-gray-200 hover:text-gray-100">
              <i className="fab fa-twitter">
                <FaTwitter />
              </i>
            </a>
          </div>
        </div>
        <div className="flex flex-col md:w-1/5 space-y-2">
          <a href="#" className="text-gray-200 hover:text-gray-100">
            Home
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-100">
            About Us
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-100">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-100">
            Terms and Conditions
          </a>
        </div>
        <div className="w-full text-black md:w-2/5 ">
          <h3 className="text-lg text-white font-bold mb-2">Contact Us</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Write Your Message Here"
                className="w-full p-2 border border-gray-300 rounded h-32"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-teal-700 text-white py-2 px-4 rounded hover:bg-teal-800"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <div className="text-center text-gray-200 mt-6">
        © 2024 CrowdVault. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
