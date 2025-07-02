import { Post } from "@/types/post";
import { FaHeart, FaShare } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import { formatDate } from "@/lib/formatDate";

export default function PostCardDesktop({ post }: { post: Post }) {
  const image = post._embedded?.["wp:featuredmedia"]?.[0];

  const [likes, setLikes] = useState(5);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes((prev) => prev + 1);
      setLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setLiked(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(post.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="bg-white shadow-lg overflow-hidden flex hover:scale-[1.01] transition-transform duration-200 rounded-2xl">
      {image && (
        <div className="relative w-1/3 min-w-[250px] h-[250px] overflow-hidden bg-white rounded-l-2xl">
          <Image
            src={image.source_url}
            alt={image.alt_text || "Post image"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-0 w-full bg-white/80 backdrop-blur-md px-3 py-2 flex justify-between items-center text-sm text-gray-700">
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
              {copied && (
                <span className="text-xs text-green-600">Copied!</span>
              )}
            </div>
            <span className="text-xs">{formatDate(post.date)}</span>
          </div>
        </div>
      )}

      {/* Right side: Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h2
            className="text-xl font-semibold mb-2"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div
            className="text-gray-700 text-sm mb-4 line-clamp-5"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
        </div>
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm underline"
        >
          Read more →
        </a>
      </div>
    </div>
  );
}
