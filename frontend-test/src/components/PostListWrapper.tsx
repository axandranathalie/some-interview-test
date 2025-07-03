"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import PostCardMobile from "./PostCardMobile";
import PostCardDesktop from "./PostCardDesktop";
import useMediaQuery from "@/hooks/useMediaQuery";
import Sidebar from "./Sidebar";
import { useApp } from "@/context/AppContext";

export default function PostListWrapper() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { search, showFavorites, sortOrder } = useApp();

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

  if (loading) return <p className="text-center mt-10">Laddar inlägg...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-600">
        Kunde inte ladda inläggen.
      </p>
    );

  // Fake likes för demonstrationen
  const getFakeLikes = (id: number) => (id % 2 === 0 ? 15 : 4);

  // 🔍 Filter and sort
  const filteredPosts = posts
    .filter((post) => {
      const keyword = search.toLowerCase();
      return (
        post.title.rendered.toLowerCase().includes(keyword) ||
        post.excerpt.rendered.toLowerCase().includes(keyword)
      );
    })
    .filter((post) => {
      if (!showFavorites) return true;
      return getFakeLikes(post.id) >= 10;
    })
    .sort((a, b) => {
      // If "favorites" is active: sort by likes
      if (showFavorites) {
        return getFakeLikes(b.id) - getFakeLikes(a.id);
      }

      // Otherwise sort by date
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  // 💻 Desktop layout
  if (isDesktop) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-8">
        <div className="md:col-span-2 space-y-12">
          {filteredPosts.map((post) => (
            <PostCardDesktop key={post.id} post={post} />
          ))}
        </div>
        <aside>
          <Sidebar posts={posts} />
        </aside>
      </div>
    );
  }

  // 📱 Mobil layout
  return (
    <div className="space-y-12 px-4 sm:px-8">
      {filteredPosts.map((post) => (
        <PostCardMobile key={post.id} post={post} />
      ))}
    </div>
  );
}
