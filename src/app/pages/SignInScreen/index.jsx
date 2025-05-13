"use client";
import { useRouter } from "next/navigation";
import { useState } from "react"; // ✅ Add useState
import notebookImg from "@png/sign_in/notebook.png";
import logoWhite from "@svg/a_board_white.svg";

export default function SignInScreen() {
  const router = useRouter();
  const [username, setUsername] = useState(""); // ✅ Add state for username

  async function handleSubmit() {
    // get api then save username to localStorage
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create post ", JSON.stringify(res));
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("username", username); // ✅ Save username
        localStorage.setItem("userInfo", JSON.stringify(data)); // ✅ Save username
        console.log("Post created:", data);
        router.push("/Homepage");
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  }

  return (
    <div className="min-h-screen flex flex-col bg-green-500">
      {/* Mobile Top Image */}
      <div className="md:hidden flex-1 flex flex-col justify-center items-center bg-green-300 rounded-b-3xl p-6">
        <img
          src={notebookImg.src}
          alt="Board Logo"
          className="w-40 h-40 mb-4"
        />
        <img src={logoWhite.src} alt="a Board" className="w-32" />
      </div>

      {/* Mobile Form */}
      <div className="md:hidden flex-1 flex flex-col justify-center items-center p-6 bg-green-500">
        <div className="w-full max-w-md">
          <h1 className="text-white text-2xl font-semibold mb-6">Sign in</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-md mb-4 border border-gray-200 bg-white text-black"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-success font-bold text-white p-3 hover:bg-green-700 transition"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-1">
        {/* Left Image */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 bg-green-500">
          <div className="w-full max-w-md">
            <h1 className="text-white text-2xl font-semibold mb-6">Sign in</h1>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-md mb-4 border border-gray-300 bg-white text-black"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-success font-bold text-white p-3 rounded-md hover:bg-green-700 transition"
            >
              Sign In
            </button>
          </div>
        </div>
        {/* Right Form */}
        <div className="flex-1 flex flex-col justify-center items-center bg-green-300 p-8 rounded-l-3xl">
          <img
            src={notebookImg.src}
            alt="Board Logo"
            className="w-40 h-40 mb-4"
          />
          <img src={logoWhite.src} alt="a Board" className="w-32" />
        </div>
      </div>
    </div>
  );
}
