import Autocomplete from "./Autocomplete";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-[#17012c]"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="px-4 md:px-16 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <img
            src="/assets/logo-algoflix-darkBG-small.svg"
            alt="Algoflix"
            className="h-5"
            onClick={() => navigate("/")}
          />
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#"
              onClick={() => navigate("/")}
              className="text-sm font-light hover:text-gray-300"
            >
              Home
            </a>
            <a
              href="#"
              onClick={() => navigate("/category/Action")}
              className="text-sm font-light hover:text-gray-300"
            >
              Action
            </a>
            <a
              href="#"
              onClick={() => navigate("/category/Comedy")}
              className="text-sm font-light hover:text-gray-300"
            >
              Comedy
            </a>
            <a
              href="#"
              onClick={() => navigate("/category/Western")}
              className="text-sm font-light hover:text-gray-300"
            >
              Western
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <Autocomplete />

          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src="https://avatar.iran.liara.run/public/41"
              alt="Profile"
              className="w-8 h-8 rounded"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
