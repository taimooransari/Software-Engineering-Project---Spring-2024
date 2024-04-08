"use client";
import Image from "next/image";
import React from "react";
import { authSlice, useDispatch, useSelector } from "@/lib/redux";

export default function Login() {
  const [isLogin, setIsLogin] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    name: "",
  });

  const dispatch = useDispatch();
  const {loggedIn} = useSelector(state => state.auth.isLoggedIn);

  const host = "http://localhost:3000";

  const register = async () => {
    try {
      const response = await fetch(`${host}/api/customers/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Password: formData.password,
        }),
      });
      if (response.ok) {
        const { authtoken } = await response.json();
        localStorage.setItem("token", authtoken);
        alert("Registration successful");
        dispatch(authSlice.actions.login());
      } else {
        const { errors } = await response.json();
        console.error("Registration failed", errors);
        alert("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const login = async () => {
    try {
      // Make API request to verify login and get the web token
      const response = await fetch(`${host}/api/customers/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: formData.email,
          Password: formData.password,
        }),
      });

      if (response.ok) {
        const { token } = await response.json();

        // Store the web token in local storage
        localStorage.setItem("token", token);
        alert("Login successful");
        dispatch(authSlice.actions.login());
      } else {
        // Handle login error
        console.error("Login failed");
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleSubmit = (e) => {
    console.log("Form Submitted");
    e.preventDefault();
    if (isLogin) {
      login();
    } else {
      console.log(formData);
      register();
    }
  };

  const switchLoginSignup = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="flex flex-col justify-evenly md:flex-row md:h-screen">
      <div className="flex items-center justify-center w-full md:w-1/2">
        {/* <Image src="/burger.jpeg" alt="Login Image" width={800} height={600} /> */}

        {/* div with width 800 and height 600 */}
        <div
          style={{
            width: 800,
            height: 600,
            borderColor: "black",
            borderWidth: 1,
            borderStyle: "solid",
          }}
        ></div>
      </div>

      <div className="flex flex-col items-center justify-center w-full md:w-1/4">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome aboard!</h1>
            <p className="mt-2 text-gray-600">
              Please sign in to your account.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block font-bold text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block font-bold text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block font-bold text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            {isLogin ? (
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
                >
                  Sign In
                </button>
                <div>
                  <p className="text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <a
                      className="font-bold text-indigo-500"
                      onClick={switchLoginSignup}
                    >
                      Register
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 font-bold text-white bg-blue-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
                >
                  Register
                </button>
                <div>
                  <p className="text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <a
                      onClick={switchLoginSignup}
                      className="font-bold text-indigo-500"
                    >
                      Log In
                    </a>
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
