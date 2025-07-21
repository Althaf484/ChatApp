import React from 'react'
import {MessagesSquare, User, LogIn, LogOut} from "lucide-react";
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

    return (
        <header className='fixed top-0 left-0 w-full bg-emerald-500 shadow-lg z-40 transition-all duration-300
        border-b border-amber-300'>
                                                
            <div className='container mx-auto p-3'>
                <div className='flex justify-between items-center flex-wrap'>
                    <Link to='/' className='text-2xl font-bold text-emerald-100 flex items-center space-x-2'>
              <MessagesSquare className='inline-block mr-1 group-hover:text-emarald-300' size={25} />
                    Yap
                    </Link>

                    <nav className='flex flex-wrap items-center gap-4'>
                        <Link to={'/'} className='text-gray-200 hover:text-emerald-300 transition duration-300 ease-in-out'>Home</Link>

                        {authUser ? (
                            <>
                            <Link to={"/profile"} className='bg-emerald-400 hover:bg-emerald-600 text-white py-2 px-4 rounded-md 
                                flex items-center transition duration-300 ease-in-out'>
                                        <User className='mr-2' size={18} />
                                        Profile
                            </Link>
                
                            <button className='bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-md flex items-center transition 
                            duration-300 ease-in-out'
                            onClick={logout}>
                                <LogOut size={18} />
                                <span className='hidden sm:inline'>Log Out</span>
                            </button>
                            </>
                        ) : (
                            <>
                                    
                                <Link to={"/signup"} className='bg-emerald-400 hover:bg-emerald-600 text-white py-2 px-4 rounded-md 
                                flex items-center transition duration-300 ease-in-out'>
                                        <User className='mr-2' size={18} />
                                        Sign Up
                                </Link>
                                
                                <Link to={"/login"} className='bg-emerald-400 hover:bg-emerald-600 text-white py-2 px-4 rounded-md 
                                flex items-center transition duration-300 ease-in-out'>
                                        <LogIn className='mr-2' size={18} />
                                        Login
                                </Link>
                                    
                            </>
                        )}
                    </nav>
                </div>
            </div>


        </header>
  )
}

export default Navbar