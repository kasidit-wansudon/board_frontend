import React from "react";
import { FaClock } from "react-icons/fa";

/**
 * CommentList Component
 * Props:
 * - comments: Array of { id, user_info: { username, avatar_url }, text, created_at, created_by }
 * - currentUser: string (username)
 * - onEdit?: fn(comment)
 * - onDelete?: fn(comment)
 */
export default function CommentList({
  comments,
  currentUser,
  onEdit,
  onDelete,
}) {
  const formatTimeAgo = (isoDate) => {
    const delta = Math.floor((Date.now() - new Date(isoDate)) / 1000);
    if (delta < 3600) return `${Math.floor(delta / 60)}h ago`;
    if (delta < 86400) return `${Math.floor(delta / 3600)}h ago`;
    if (delta < 2592000) return `${Math.floor(delta / 86400)}d ago`;
    return `${Math.floor(delta / 2592000)}mo. ago`;
  };

  return (
    <div className="space-y-4">
      {comments.map((c) => {
        const avatar =
          c.user_info?.avatar_url || `https://i.pravatar.cc/40?u=${c.id}`;
        const name = c.user_info?.username || c.created_by || "Unknown";
        const timeAgo = formatTimeAgo(c.created_at);
        const isOwner = currentUser === c.created_by;

        return (
          <div key={c.id} className="bg-white p-1  rounded  flex space-x-4">
            <img
              src={avatar}
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-start space-x-4">
                <span className="font-medium">{name}</span>
                <span className="flex items-center text-xs text-gray-400">
                  <FaClock className="mr-1" />
                  {timeAgo}
                </span>
              </div>
              <p className="text-sm text-gray-700">{c.text}</p>
              {isOwner && (
                <div className="flex items-center space-x-4 text-sm">
                  <button
                    onClick={() => onEdit?.(c)}
                    className="text-gray-500 hover:text-black"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete?.(c)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
