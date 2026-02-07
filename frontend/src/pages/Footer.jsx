import React from "react";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* LEFT */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} E-Kart. All rights reserved.
        </p>

        {/* RIGHT */}
        <div className="flex items-center gap-6 text-gray-400 text-lg">
          <a
            href="https://instagram.com/ig_arjunpandit45"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>

          <a
            href="https://github.com/arjunkumarpandey45"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/arjun-kumar-pandey-b2a24a330/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://arjunkumarpandey45.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition"
          >
            <FaGlobe />
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
