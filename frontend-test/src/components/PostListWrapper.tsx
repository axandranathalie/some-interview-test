
"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import PostCardMobile from "./PostCardMobile";
import PostCardDesktop from "./PostCardDesktop";
import useMediaQuery from "@/hooks/useMediaQuery";
import Sidebar from "./Sidebar"; 

export default function PostListWrapper() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/posts?_embed`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading posts...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Could not load posts.</p>;

  // Desktop: use grid layout
  if (isDesktop) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-8">
        <div className="md:col-span-2 space-y-12">
          {posts.map((post) => (
            <PostCardDesktop key={post.id} post={post} />
          ))}
        </div>
        <aside>
          <Sidebar posts={posts} />
        </aside>
      </div>
    );
  }

  // Mobile: normal stack
  return (
    <div className="space-y-12 px-4 sm:px-8">
      {posts.map((post) => (
        <PostCardMobile key={post.id} post={post} />
      ))}
    </div>
  );
}
