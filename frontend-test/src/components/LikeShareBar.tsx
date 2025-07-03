"use client";
import { useState } from "react";
import { FaHeart, FaShare } from "react-icons/fa";
import { formatDate } from "@/lib/formatDate";

type Props = {
  postId: number;
  postLink: string;
  postDate: string;
};

export default function LikeShareBar({ postId, postLink, postDate }: Props) {
  const initialLikes = postId % 2 === 0 ? 15 : 4; 
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLike = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(postLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="px-4 py-2 flex justify-between items-center text-sm text-gray-700">
      <div className="flex items-center gap-3">
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
        {copied && <span className="text-xs text-green-600">Copied!</span>}
      </div>
      <span className="text-xs">{formatDate(postDate)}</span>
    </div>
  );
}
