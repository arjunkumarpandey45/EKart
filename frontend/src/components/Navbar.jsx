import useAuthStore from "@/store/authStore";
import axios from "axios";
import { Loader2, LogIn, LogOut } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()
  const { user, accessToken, logout } = useAuthStore();
  const logoutHandle = async () => {
    setLoading(true)
    console.log("NAVBAR STATE CHECK 👉", {
      isUserPresent: !!user,
      userData: user,
      token: accessToken ? "Token Received ✅" : "No Token ❌"
    });

    try {

      const res = await axios.post(`http://localhost:3000/api/user/logout`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }

      })


      if (res.data.success) {
        logout();
        localStorage.removeItem("auth-storage");
        toast.success("Logout successfully 😄", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate('/')
      }

    } catch (error) {
      toast.error("Logout failed ", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {

      setLoading(false)

    }

  }
  return (
    <div className="fixed top-0 z-50 w-full">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10 py-4
        bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">

        {/* LOGO */}
        <Link
          to={'/'}
          className="text-2xl font-bold text-gray-900 tracking-wide hover:text-indigo-600 transition"
        >
          E-Kart ✨
        </Link>

        {user ? <Link
          to={`/profile/${user._id}`}
          className="
    block md:hidden
     inline-flex items-center
    rounded-full
    px-4 py-1.5
    text-sm font-medium
    text-black
    bg-white
    border border-black
    transition-colors duration-200
    hover:bg-blue-600 hover:text-white hover:border-sky-300
    active:scale-95
  "
        >
          Hi, {user.firstName}
        </Link>
          : <Link className="cursor-pointer block md:hidden group relative flex items-center gap-2 cursor-pointer overflow-hidden rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 border border-gray-200 hover:border-red-200  hover:shadow-lg hover:shadow-red-500/10 active:scale-95" to={'/login'}>   <span className="h-2 w-2 rounded-full animate-pulse cursor-pointer  group bg-green-300"></span><b>Login</b> <LogIn className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>}
        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <li><Link to={'/'} className="hover:text-indigo-600">Home</Link></li>
          <li><Link to={'/about'} className="hover:text-indigo-600">About</Link></li>
          <li><Link to={'/products'} className="hover:text-indigo-600">Projects</Link></li>
          <li><Link to={'/contact'} className="hover:text-indigo-600">Contact</Link></li>

          <li>
            <h1 className="hover:text-indigo-600 transition-colors cursor-pointer"><b>
              {user ? <Link
                to={`/profile/${user._id}`}
                className="
    inline-flex items-center
    rounded-full
    px-4 py-1.5
    text-sm font-medium
    text-black
    bg-white
    border border-black
    transition-colors duration-200
    hover:bg-blue-600 hover:text-white hover:border-sky-300
    active:scale-95
  "
              >
                <b> Hi, {user.firstName}</b>
              </Link>

                : <Link className="cursor-pointer group relative flex items-center gap-2 cursor-pointer overflow-hidden rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 border border-gray-200 hover:border-red-200  hover:shadow-lg hover:shadow-red-500/10 active:scale-95" to={'/login'}>   <span className="h-2 w-2 rounded-full animate-pulse cursor-pointer  group bg-green-300"></span><b>Login</b> <LogIn className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
              }
            </b> </h1>
          </li>
          {/* DESKTOP BUTTON */}

          {user ? (

            <div className="flex items-center gap-3  hover:bg-gray-200">

              <button
                onClick={logoutHandle}
                className="group relative flex items-center gap-2 cursor-pointer  bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 border border-gray-200 hover:border-red-200 hover:text-red-600 hover:shadow-lg hover:shadow-red-500/10 active:scale-95"
              >

                <span className="h-2 w-2 rounded-full animate-pulse cursor-pointer  group-hover:bg-red-600"></span>

                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Trying To Logout" : "Logout"}


                <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />


                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-red-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></span>
              </button>
            </div>
          ) : (

            <Link to="/signup">
              <button
                className="group relative flex items-center gap-2 cursor-pointer overflow-hidden rounded-full bg-indigo-600 px-7 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95"
              >

                <div className="absolute -left-[100%] top-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 group-hover:left-[100%]"></div>


                <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>

                <span className="tracking-wide hover:cursor-pointer">Sign In</span>


                <LogIn className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />


                <span className="absolute inset-0 rounded-full border border-white/10"></span>
              </button>
            </Link>
          )}
        </ul>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-b border-gray-200 cursor-pointer shadow-lg animate-in slide-in-from-top duration-300">
          {/* Links container: Left aligned */}
          <ul className="flex flex-col gap-2 px-6 pt-5 pb-3 text-gray-700 text-sm font-medium">
            <li className="border-b border-gray-50 pb-2">
              <Link onClick={() => setOpen(false)} to={'/'} className="hover:text-indigo-600 transition-colors">Home</Link>
            </li>
            <li className="border-b border-gray-50 pb-2">
              <Link onClick={() => setOpen(false)} to={'/about'} className="hover:text-indigo-600 transition-colors">About</Link>
            </li>
            <li className="border-b border-gray-50 pb-2">
              <Link onClick={() => setOpen(false)} to={'/products'} className="hover:text-indigo-600 transition-colors">Products</Link>
            </li>
            <li className="border-b border-gray-50 pb-2">
              <Link onClick={() => setOpen(false)} to={'/contact'} className="hover:text-indigo-600 transition-colors">Contact</Link>
            </li>
          </ul>

          {/* Auth Button container: Centered at the bottom */}
          <div className="flex justify-center items-center px-6 pb-6 pt-2">
            {user ? (
              <button
                onClick={() => { logoutHandle(); setOpen(false); }}
                className="group relative flex w-full max-w-[200px] items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 border border-gray-200 hover:border-red-200 hover:text-red-600 shadow-sm active:scale-95"
              >
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Trying To Logout" : "Logout"}
                <LogOut className="h-4 w-4" />
              </button>
            ) : (
              <Link to="/signup" onClick={() => setOpen(false)} className="w-full flex justify-center">
                <button
                  className="group relative flex w-full max-w-[200px] items-center justify-center gap-2 overflow-hidden rounded-full bg-indigo-600 px-7 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-indigo-700 shadow-md active:scale-95"
                >
                  <div className="absolute -left-[100%] top-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 group-hover:left-[100%]"></div>
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>
                  <span className="tracking-wide">Signup</span>
                  <LogIn className="h-4 w-4" />
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
