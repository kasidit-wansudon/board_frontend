"use client";
import { useState, useEffect } from "react";
import { FaClock } from 'react-icons/fa';
import { useRouter, useParams } from "next/navigation";
import MainNavbar from "@/component/MainNavbar";
import MainMenu from "@/component/MainMenu";
import CommentList from "@/component/CommentList"; // assume exists

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [refreshComments, setRefreshComments] = useState(false);

  const formatTimeAgo = (isoDate) => {
    const delta = Math.floor((Date.now() - new Date(isoDate)) / 1000);
    if (delta < 3600) return `${Math.floor(delta/60)}h ago`;
    if (delta < 86400) return `${Math.floor(delta/3600)}h ago`;
    if (delta < 2592000) return `${Math.floor(delta/86400)}d ago`;
    return `${Math.floor(delta/2592000)}mo. ago`;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const resPost = await fetch(`/api/posts/${id}`);
        const dataPost = await resPost.json();
        setPost(dataPost);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const resComm = await fetch(`/api/comments/${id}`);
        setComments(await resComm.json());
      } catch (err) {
        console.error(err);
      }
    }
    if (id) fetchComments();
  }, [id, refreshComments]);

  const handleAddComment = async () => {
    if (!newComment) return;
    const username = localStorage.getItem("username");
    const res = await fetch(`/api/comments/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: username, text: newComment }),
    });
    if (res.ok) {
      // const comment = await res.json();
      setNewComment("");
      setShowCommentForm(false);
      setRefreshComments(prev => !prev);
    }
  };

  if (!post) return null;

  return (
    <div>
      <MainNavbar />
      <div className="min-h-screen flex bg-gray-100">
        <aside className="hidden md:flex flex-col w-62 max-[1049px]:w-42 bg-gray-100 text-green-500 p-6">
          <MainMenu />
        </aside>
        <main className="flex-1 p-6">
          <button
            onClick={() => router.back()}
            className="mb-4 p-2 bg-green-100 rounded-full"
          >
            &larr;
          </button>
          <div className="bg-white rounded p-6 shadow">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={post.user_info.avatar_url}
                className="w-12 h-12 rounded-full"
                alt="avatar"
              />
              <div className="flex items-center space-x-2">
                <span className="font-medium text-lg">{post.user_info.username}</span>
                <span className="flex items-center text-sm text-gray-500">
                  <FaClock className="mr-1" />
                  {formatTimeAgo(post.created_at)}
                </span>
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <div className="mb-4 text-gray-700">{post.content}</div>
            <div className="text-sm text-gray-500 mb-6">
              💬 {post.commentCount} Comments
            </div>
            <button
              className="mb-6 px-4 py-2 border border-green-500 text-success rounded hover:bg-green-50"
              onClick={() => setShowCommentForm(!showCommentForm)}
            >
              Add Comment
            </button>
            {showCommentForm && (
              <>
                {/* Mobile Modal */}
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 md:hidden">
                  <div className="bg-white rounded-lg p-6 w-11/12 max-w-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Add Comments</h3>
                      <button
                        onClick={() => setShowCommentForm(false)}
                        className="text-gray-500 text-xl leading-none"
                      >
                        &times;
                      </button>
                    </div>
                    <textarea
                      className="w-full border border-gray-300 rounded p-2 mb-4 resize-none"
                      rows={4}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="What's on your mind..."
                    />
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setShowCommentForm(false)}
                        className="px-4 py-2 border border-green-500 text-success rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddComment}
                        className="px-4 py-2 bg-success text-white rounded"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
                {/* Desktop Inline */}
                <div className="hidden md:block mb-6">
                  <textarea
                    className="w-full border border-gray-300 rounded p-2 mb-4 resize-none"
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="What's on your mind..."
                  />
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setShowCommentForm(false)}
                      className="px-4 py-2 border border-green-500 text-success rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddComment}
                      className="px-4 py-2 bg-success text-white rounded"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </>
            )}
            <CommentList
              comments={comments}
              currentUser={localStorage.getItem("username")}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
