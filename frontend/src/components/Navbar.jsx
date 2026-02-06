import React, { use, useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
const user=false
  return (
    <div className="fixed top-0 z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10 py-4
        bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">

        {/* LOGO */}
        <a
          href="#home"
          className="text-2xl font-bold text-gray-900 tracking-wide hover:text-indigo-600 transition"
        >
          E-Kart ✨
        </a>

        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <li><a href="#home" className="hover:text-indigo-600">Home</a></li>
          <li><a href="#about" className="hover:text-indigo-600">About</a></li>
          <li><a href="#projects" className="hover:text-indigo-600">Projects</a></li>
          <li><a href="#contact" className="hover:text-indigo-600">Contact</a></li>
        </ul>

        {/* DESKTOP BUTTON */}
        <a
         
          className="hidden md:inline-block rounded-full bg-indigo-600 px-5 py-2
          text-sm font-semibold text-white hover:bg-indigo-700 transition shadow-md"
        >
  {user?"Logout":"Login"}
        </a>

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
        <div className="md:hidden bg-white border-b border-gray-200 shadow-md">
          <ul className="flex flex-col gap-4 px-6 py-5 text-gray-700 text-sm font-medium">
            <li><a onClick={() => setOpen(false)} href="#home">Home</a></li>
            <li><a onClick={() => setOpen(false)} href="#about">About</a></li>
            <li><a onClick={() => setOpen(false)} href="#projects">Projects</a></li>
            <li><a onClick={() => setOpen(false)} href="#contact">Contact</a></li>

            <a
              href="#contact"
              className="mt-2 inline-block rounded-full bg-indigo-600 px-4 py-2
              text-center text-white font-semibold hover:bg-indigo-700 transition"
            >
            Login
            </a>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
