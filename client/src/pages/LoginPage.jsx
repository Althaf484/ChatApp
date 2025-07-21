import React, {useState} from "react";
// import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {login, loading} = useAuthStore()

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password)
    }
    return (
        <div className="flex flex-col justify-center py-12 sm:px-6  lg:px-8">
            {/* <motion.div
                className="sm:mx-auto sm:w-full sm:max-w-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{duration: 0.8}}
            > */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-500">
                    Login to your account
                </h2>
            </div>
            {/* </motion.div> */}

             {/* <motion.div
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{duration: 0.8}}
            > */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-500 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute left-0 inset-y-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-gray-400" aria-hidden="true"/>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="block w-full x-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
                                    placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="johndoe@gmail.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute left-0 inset-y-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-gray-400" aria-hidden="true"/>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="block w-full x-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
                                    placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="********"
                                />
                            </div>
                        </div>


                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 boredr border-transparent rounded-md shadow-sm text-sm font-md 
                            text-white bg-emerald-400 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
                            transition duration-150 ease-in-out disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader className="mr-2 size-5 animate-spin" aria-hidden="true" />
                                    Loading...
                                </>
                            ) : (
                                    <>
                                        <LogIn className="mr-2 size-5 " aria-hidden="true" />
                                        Log In
                                    </>  
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-white">
                        Don't have an account?{" "}
                        <Link to={"/signup"} className="font-medium text-emerald-300 hover:text-emerald-200">
                            Signup here <ArrowRight className="inline size-4"/>
                        </Link>
                    </p>
                
                </div>
            </div>
            {/* </motion.div> */}
        </div>
    )
}

export default LoginPage;