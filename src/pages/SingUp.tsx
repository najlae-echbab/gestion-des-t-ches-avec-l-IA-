import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Facebook, Github } from "lucide-react";
import SignUpImage from "../assets/SignUp.png";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white">
      {/* Form Section */}
      <div className="lg:w-1/2 px-6 py-10">
        <h1 className="text-3xl font-bold mb-4">CREATE AN ACCOUNT</h1>
        <p className="text-sm text-gray-500 mb-8">
          Already have an account?{" "}
          <Link to="/connexion" className="text-blue-600 cursor-pointetext-blue-700 cursor-pointer font-medium">
            Log in
          </Link>
        </p>

        <form className="space-y-6">
          {/* Full Name Input */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="John Doe"
              className="mt-2 w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="johndoe@example.com"
              className="mt-2 w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="●●●●●●"
                className="mt-2 w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                onMouseDown={togglePasswordVisibility}
                onMouseUp={togglePasswordVisibility}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="●●●●●●"
              className="mt-2 w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground rounded-md hover:bg-primary/90 rounded-lg text-lg shadow-md transition duration-200"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <hr className="w-1/4 border-blue-300" />
            <p className="mx-4 text-sm text-gray-500">or continue with</p>
            <hr className="w-1/4 border-blue-300" />
          </div>

          <div className="flex justify-center gap-12">
            <button className="p-3 border rounded-full hover:bg-gray-100 transition">
              <FaGoogle className="w-6 h-6 text-red-500 cursor-pointer" />
            </button>
            <button className="p-3 border rounded-full hover:bg-gray-100 transition">
              <Facebook className="w-6 h-6 text-blue-600 cursor-pointer" />
            </button>
            <button className="p-3 border rounded-full hover:bg-gray-100 transition">
              <Github className="w-6 h-6 text-gray-700 cursor-pointer" />
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

export default SignUp;
