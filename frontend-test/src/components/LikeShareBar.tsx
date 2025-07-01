"use client";
import { FaHeart, FaShare } from "react-icons/fa";
import { useState, useEffect } from "react";

type LikeShareBarProps = {
  postId: number;
  postLink: string;
  postDate: string;
};

export default function LikeShareBar({ postId, postLink, postDate }: LikeShareBarProps) {
  const storageKey = `likes-${postId}`;
  const [likes, setLikes] = useState(5);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      setLikes(parsed.likes);
      setLiked(parsed.liked);
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ likes, liked }));
  }, [likes, liked, storageKey]);

  const handleLike = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked((prev) => !prev);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(postLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Could not copy link", err);
    }
  };

  return (
    <div className="flex justify-between items-center text-sm px-4 mt-2 text-gray-600">
      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 transition-colors ${
            liked ? "text-red-500" : "hover:text-red-400"
          }`}
        >
          <FaHeart />
          <span>{likes}</span>
        </button>

        <button
          onClick={handleShare}
          className="hover:text-blue-500 transition-colors"
        >
          <FaShare />
        </button>
        {copied && <span className="text-xs text-green-600">Link copied!</span>}
      </div>

      <span className="text-xs">
        {new Date(postDate).toLocaleDateString("sv-SE", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>
    </div>
  );
}
