import React from "react";
import Link from "next/link";

export default function PostList({
  posts,
  searchQuery,
  highlightText,
  canEdit,
  onEdit,
  onDelete,
}) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Link href={`/Homepage/${post.id}`} key={post.id}>
          <div className="bg-white rounded-lg shadow p-4 my-1 cursor-pointer">
            <div className="flex items-center space-x-3 mb-2">
              <img
                src={
                  post.user_info?.avatar_url ||
                  `https://i.pravatar.cc/40?img=${post.id}`
                }
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="text-sm text-gray-700 font-medium">
                {post.user_info?.username || "Unknown User"}
              </div>
              <span className="bg-gray-200 text-xs px-2 py-0.5 rounded-full ml-auto">
                {post.category ? `${post.category}` : "Uncategorized"}
              </span>
              {canEdit && (
                <div className="ml-2 space-x-2 text-gray-500 flex items-center">
                  <button
                    className="p-1"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onEdit?.(post);
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                      />
                    </svg>
                  </button>
                  <button
                    className="p-1"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDelete?.(post);
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <h2
              className="text-lg font-semibold text-gray-800 mb-1"
              dangerouslySetInnerHTML={{
                __html: highlightText(post.title || "Untitled", searchQuery),
              }}
            />

            <p
              className="text-sm text-gray-600"
              dangerouslySetInnerHTML={{
                __html: highlightText(
                  post.content || "No content available.",
                  searchQuery
                ),
              }}
            />

            <div className="mt-2 text-sm text-gray-400">
              🗓 {new Date(post.created_at).toLocaleDateString()} • 💬{" "}
              {post.commentCount || 0} Comments
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
