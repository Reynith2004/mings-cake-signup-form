import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setDropdownOpen(false);
    router.push("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="w-full bg-[#EDDFE0] text-white p-8 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Event Tracker</h1>
        <nav>
          <ul className="flex space-x-4">
            <li className="relative">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center text-gray-600 hover:text-gray-500 focus:outline-none"
                  >
                    <FaUser className="text-3xl" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                      <ul className="py-2 text-gray-800">
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href="/signup"
                  className="text-gray-600 hover:text-gray-500 flex items-center"
                >
                  <FaUser className="text-3xl" />
                </a>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
