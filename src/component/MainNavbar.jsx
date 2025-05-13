import logoWhite from "@svg/a_board_white.svg";
import { useState, useEffect } from "react";
import MainMenu from "./MainMenu";
import { useRouter } from "next/navigation";

export default function MainNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");
    if (stored) {
      try {
        setUserInfo(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("username");
    router.push("/");
  };

  return (
    <div>
      <div className="bg-green-500 hidden md:flex items-center justify-between px-8 py-3">
        <img src={logoWhite.src} className="max-w-28" alt="" />
        {userInfo ? (
          <div className="relative">
            <div
              className="flex items-center space-x-4 text-white cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="text-lg">{userInfo.username}</span>
              <img
                src={userInfo.avatar_url}
                alt={userInfo.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow px-4 py-2">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="bg-success hover:bg-green-600 text-white font-bold py-1 px-4 rounded"
            onClick={() => router.push("/")}
          >
            Sign In
          </button>
        )}
      </div>
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between bg-green-500 text-white p-4 md:hidden">
        <img src={logoWhite.src} className="max-w-24 pl-3 p-2" alt="" />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl"
        >
          ☰
        </button>
      </div>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-0 right-0 h-full bg-green-900 text-white p-6 z-50 md:hidden w-96 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="text-right w-full text-white text-2xl mb-6"
        >
          ➜
        </button>
        {userInfo && (
          <div className="mb-6">
            <div
              className="flex items-center space-x-4 cursor-pointer mb-2"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src={userInfo.avatar_url}
                alt={userInfo.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-lg">{userInfo.username}</span>
            </div>
            {showDropdown && (
              <div>
                <button
                  className="bg-white text-green-800 px-4 py-1 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
        {!userInfo && (
          <div className="mb-6">
            <button
              className="bg-success hover:bg-green-600 text-white font-bold py-1 px-4 rounded"
              onClick={() => router.push("/")}
            >
              Sign In
            </button>
          </div>
        )}
        <nav className="flex flex-col space-y-4 text-white">
          <MainMenu />
        </nav>
      </div>
    </div>
  );
}
