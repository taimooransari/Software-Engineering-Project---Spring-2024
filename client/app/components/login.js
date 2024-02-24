import Image from "next/image";
import React from "react";

export default function Login() {
const [isLogin, setIsLogin] = React.useState(true);

const switchLoginSignup = () => {setIsLogin(!isLogin)}
    return (
        <div className="flex flex-col justify-evenly md:flex-row md:h-screen">

            <div className="flex items-center justify-center w-full md:w-1/2" >
                {/* <Image src="/burger.jpeg" alt="Login Image" width={800} height={600} /> */}

                {/* div with width 800 and height 600 */}
                <div style={{ width: 800, height: 600, borderColor:"black", borderWidth:1, borderStyle:"solid" }}>

                </div>
            </div>

            <div className="flex flex-col items-center justify-center w-full md:w-1/4">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h1 className="text-2xl font-bold">Welcome aboard!</h1>
                        <p className="mt-2 text-gray-600">
                            Please sign in to your account.
                        </p>
                    </div>
                    <form className="mt-8 space-y-6">
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
                            />
                        </div>
                        {isLogin ?
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
                                        <a className="font-bold text-indigo-500" onClick={switchLoginSignup}>
                                            Register
                                        </a>
                                    </p>
                                </div>
                            </div> :
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
                                        <a onClick={switchLoginSignup} className="font-bold text-indigo-500">
                                            Log In
                                        </a>
                                    </p>
                                </div>
                            </div>
                        }






                    </form>
                </div>
            </div>
        </div>
    );
}