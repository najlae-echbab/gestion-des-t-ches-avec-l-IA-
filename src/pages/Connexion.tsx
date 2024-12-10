import React, { useState }  from "react";
import { FaGoogle } from "react-icons/fa";
import { Facebook, Github } from "lucide-react"; 
import SignUpImage from "../assets/SignUp.png";
import { Link } from "react-router-dom";

const Connexion: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white">
      {/* Form Section */}
      <div className="lg:w-1/2 px-6 py-10">
        <h1 className="text-3xl font-bold mb-4">WELCOME BACK!</h1>
        <p className="text-sm text-gray-500 mb-8">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 cursor-pointetext-blue-700 cursor-pointer font-medium">
            Sign up
          </Link>
        </p>

        <form className="space-y-6">
          {/* Username Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="email"
              id="email"
              placeholder="deniel123@gmail.com"
              className="mt-2 w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="●●●●●●"
                className="mt-2 w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)} // Inverse l'état de visibilité
              >
                {passwordVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223a10.477 10.477 0 0116.04 0M21 12s-3.612 5.25-9 5.25S3 12 3 12m9-5.25a3.75 3.75 0 110 7.5 3.75 3.75 0 010-7.5z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223a10.477 10.477 0 0116.04 0M21 12s-3.612 5.25-9 5.25S3 12 3 12m7.5-4.5L16.5 16.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>

          {/* Remember Me & Forget Password */}
          <div className="flex items-center justify-between mb-6">
          <label className="flex items-center space-x-2 cursor-pointer">
    <div className="relative">
      <input
        type="checkbox"
        className="hidden peer"
      />
      <div className="w-5 h-5 rounded-full border-2 border-sky-400 bg-white peer-checked:bg-sky-400 peer-checked:border-sky-500"></div>
    </div>
    <span className="text-sm text-gray-600">Remember me</span>
  </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forget password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground rounded-md hover:bg-primary/90 py-3 rounded-xl text-lg shadow-md  transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Continue With Section */}
        <div className="mt-6 text-center">
          {/* Decorative Lines */}
          <div className="flex items-center">
            <div className="flex-grow h-px bg-sky-200 "></div>
            <p className="mx-4 text-sm text-gray-500">or continue with</p>
            <div className="flex-grow h-px bg-sky-200 "></div>
          </div>

          <div className="flex justify-center gap-12 mt-8">
            {/* Google Icon */}
            <button className="p-3 border rounded-full hover:bg-gray-100 transition text-red-500">
              <FaGoogle className="w-6 h-6" />
            </button>
            {/* Facebook Icon */}
            <button className="p-3 border rounded-full hover:bg-gray-100 transition text-blue-600">
              <Facebook className="w-6 h-6" />
            </button>
            {/* Github Icon */}
            <button className="p-3 border rounded-full hover:bg-gray-100 transition text-gray-800">
              <Github className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Illustration Section */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={SignUpImage}
          alt="Sign Up"
          className="w-full h-full object-contain"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </div>
  );
};

export default Connexion;
