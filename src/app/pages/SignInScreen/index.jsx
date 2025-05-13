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
    <div className="min-h-screen flex flex-col md:flex-row bg-green-500">
      {/* Left Section: Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-white text-2xl font-semibold mb-6">Sign in</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // ✅ Bind input to state
            className="w-full p-3 rounded-md mb-4 border border-gray-300 text-secondary-placholder bg-white text-black"
          />
          <button
            onClick={handleSubmit} // ✅ Fix function reference
            className="w-full cursor-pointer bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-center bg-green-300 p-8 rounded-l-[3rem]">
        <img
          src={notebookImg.src}
          alt="Board Logo"
          className="w-40 h-40 mb-4"
        />
        <img src={logoWhite.src} alt="" />
      </div>
    </div>
  );
}
