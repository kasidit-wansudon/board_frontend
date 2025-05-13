"use client";
import { useState, useEffect } from "react";
import CategoryDropdown from "@/component/CategoryDropdown";
import CreatePostModal from "@/component/CreatePostModal";
import PostList from "@/component/PostLists";
import MainNavbar from "@/component/MainNavbar";
import MainMenu from "@/component/MainMenu";
import { useRouter } from "next/navigation";

export default function OurBlogPage() {
  const router = useRouter();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Community");
  const categories = [
    "History",
    "Food",
    "Pets",
    "Health",
    "Fashion",
    "Exercise",
    "Others",
  ];
  const [currentPost, setCurrentPost] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const handleDelete = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (postToDelete?.id) {
      await fetch(`/api/posts/${postToDelete.id}`, { method: "DELETE" });
      setShowDeleteModal(false);
      setPostToDelete(null);
      location.reload();
    }
  };

  function toggleCategory() {
    setCategoryOpen(!categoryOpen);
  }

  function selectCategory(category) {
    setSelectedCategory(category);
    setCategoryOpen(false);
  }
  function highlightText(text, query) {
    if (!isFocused || !query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  }
  const handleEdit = async (data) => {
    console.log("showing modal");
    setCurrentPost(data);
    console.log(currentPost);

    setIsModalOpen(true);
    // const res = await fetch(`/api/posts/${id}`);
    // const postData = await res.json();
    // setEditPost(postData); // เก็บไว้ใน state
    // setIsModalOpen(true); // เปิด modal
  };
  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <CreatePostModal
            currentPost={currentPost}
            isOpen={isModalOpen}
            onClose={() => {
              setCurrentPost({});
              setIsModalOpen(false);
            }}
            onSubmit={(postData) => {
              fetch("/api/posts", {
                method: currentPost.id ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
              })
                .then(async (res) => {
                  if (!res.ok) {
                    const errText = await res.text();
                    if (res.status === 400) {
                      throw new Error("Bad Request: " + errText);
                    } else if (res.status >= 500) {
                      throw new Error("Server Error: " + errText);
                    } else {
                      throw new Error("Unexpected Error: " + errText);
                    }
                  }
                  setCurrentPost({});
                  return res.json();
                })
                .then((data) => {
                  console.log("Post created:", data);
                  setIsModalOpen(false);
                  location.reload();
                })
                .catch((error) => {
                  console.error("Error creating post:", error.message);
                  alert(error.message);
                });
            }}
          />
        </div>
      )}
      <MainNavbar />
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-62 max-[1049px]:w-42 bg-gray-100 text-green-500 p-6">
          <nav className="flex flex-col space-y-4">
            <MainMenu />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="border border-gray-300 rounded px-4 py-2 md:w-64"
              />
              <CategoryDropdown
                selected={selectedCategory}
                onSelect={setSelectedCategory}
                options={categories}
              />
            </div>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => {
                const username = localStorage.getItem("username");
                if (!username) router.push("/");
                setIsModalOpen(true);
              }}
            >
              Create +
            </button>
          </div>

          {/* Posts */}
          {/*
          Fetch posts from API and render them dynamically
        */}
          {(() => {
            const [posts, setPosts] = useState([]);

            useEffect(() => {
              async function fetchPosts() {
                try {
                  const username = localStorage.getItem("username");
                  const res = await fetch(
                    `/api/posts?username=${encodeURIComponent(username)}`
                  );
                  const data = await res.json();
                  setPosts(data);
                } catch (error) {
                  console.error("Failed to fetch posts:", error);
                }
              }
              fetchPosts();
            }, []);

            const filteredPosts = posts.filter(
              (post) =>
                (post.title &&
                  post.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())) ||
                (post.content &&
                  post.content
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()))
              //     ||
              // (post.user_info?.username &&
              //   post.user_info.username
              //     .toLowerCase()
              //     .includes(searchQuery.toLowerCase())) ||
              // (post.category &&
              //   String(post.category)
              //     .toLowerCase()
              //     .includes(searchQuery.toLowerCase()))
            );

            return (
              <PostList
                posts={filteredPosts}
                searchQuery={searchQuery}
                highlightText={highlightText}
                canEdit={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            );
          })()}
        </main>
        <div className="w-62 max-[1049px]:w-0"></div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <h3 className="text-center font-semibold mb-2">
              Please confirm if you wish to delete the post
            </h3>
            <p className="text-sm text-center text-gray-600 mb-4">
              Are you sure you want to delete the post? Once deleted, it cannot
              be recovered.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 rounded border text-gray-600"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
