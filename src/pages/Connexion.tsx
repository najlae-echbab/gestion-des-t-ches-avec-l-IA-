import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Facebook, Github } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SignUpImage from "../assets/SignUp.png";

const Connexion: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("jwt", token);

      navigate("/Home");
    } catch (error) {
      console.error("Authentication failed:", error);
      setError("Authentication failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white">
      <div className="lg:w-1/2 px-6 py-10">
        <h1 className="text-3xl font-bold mb-4">WELCOME BACK!</h1>
        <p className="text-sm text-gray-500 mb-8">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium">
            Sign up
          </Link>
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
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
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground rounded-md hover:bg-primary/90 py-3 rounded-xl text-lg shadow-md  transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>

      <div className="hidden lg:block lg:w-1/2">
        <img src={SignUpImage} alt="Sign Up" className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default Connexion;
