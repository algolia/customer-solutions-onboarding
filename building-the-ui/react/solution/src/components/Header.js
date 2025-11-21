import Autocomplete from "./Autocomplete";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="px-4 md:px-16 py-6 flex flex-col gap-4 flex-row md:items-center md:gap-8">
        <div className="flex items-center space-x-8 w-full md:w-auto">
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
              onClick={() => navigate("/category/action")}
              className="text-sm font-light hover:text-gray-300"
            >
              Action
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:flex-1 md:ml-auto">
          <Autocomplete />

          <div className="hidden md:flex items-center space-x-2 cursor-pointer flex-shrink-0">
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
