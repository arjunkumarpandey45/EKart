import React from "react";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* LEFT */}
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} E-Kart. All rights reserved.
        </p>

        {/* RIGHT - SOCIAL LINKS */}
        <div className="flex items-center gap-5 text-gray-600 text-lg">
          <a
            href="https://instagram.com/ig_arjunpandit45"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black"
          >
            <FaInstagram />
          </a>

          <a
            href="https://github.com/arjunkumarpandey45"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/arjun-kumar-pandey-b2a24a330/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://arjunkumarpandey45.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black"
          >
            <FaGlobe />
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
