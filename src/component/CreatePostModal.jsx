import React, { useState, useEffect } from "react";
import DropdownPost from "./DropdownPost";

const categories = [
  "History",
  "Food",
  "Pets",
  "Health",
  "Fashion",
  "Exercise",
  "Others",
];

export default function CreatePostModal({
  isOpen,
  onClose,
  onSubmit,
  currentPost,
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (currentPost) {
      console.log(currentPost);
      
      setSelectedCategory(currentPost.category || "");
      setTitle(currentPost.title || "");
      setContent(currentPost.content || "");
    }
  }, [currentPost]);

  if (!isOpen) return null;

  const handlePost = () => {
    const user = localStorage.getItem("username");
    onSubmit?.({
      category: selectedCategory,
      title,
      content,
      user,
      id: currentPost?.id,
    });
    setSelectedCategory("");
    setTitle("");
    setContent("");
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 md:max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {currentPost ? "Edit Post" : "Create Post"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <DropdownPost
            options={categories}
            selected={selectedCategory}
            onChange={(select) => {
              setSelectedCategory(select);
              console.log("oak", select);
            }}
          />
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="What's on your mind..."
            className="w-full border border-gray-300 rounded px-4 py-2"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50"
            >
              Cancel
            </button>
            <button
              onClick={handlePost}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
