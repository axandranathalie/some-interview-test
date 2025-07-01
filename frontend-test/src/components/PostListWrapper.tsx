"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import PostCardMobile from "./PostCardMobile";
import PostCardDesktop from "./PostCardDesktop"; // skapa denna senare
import useMediaQuery from "@/hooks/useMediaQuery";

export default function PostListWrapper() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    fetch("https://bergvik.se/wp-json/wp/v2/posts?_embed")
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

  if (loading) return <p className="text-center mt-10">Laddar inlägg...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Kunde inte ladda inlägg.</p>;

  return (
    <div className="space-y-12 px-4 sm:px-8">
      {posts.map((post) =>
        isDesktop ? (
          <PostCardDesktop key={post.id} post={post} />
        ) : (
          <PostCardMobile key={post.id} post={post} />
        )
      )}
    </div>
  );
}
