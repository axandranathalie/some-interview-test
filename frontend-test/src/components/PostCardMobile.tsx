"use client";
import Image from "next/image";
import { Post } from "@/types/post";
import LikeShareBar from "./LikeShareBar";
import Button from "./Button";

export default function PostCardMobile({ post }: { post: Post }) {
  const image = post._embedded?.["wp:featuredmedia"]?.[0];

  return (
    <div className="mb-12">
      {image && (
        <div className="-mx-10">
          <Image
            src={image.source_url}
            alt={image.alt_text || "Inläggsbild"}
            width={1080}
            height={1350}
            className="w-full h-[500px] object-cover"
            priority
          />
        </div>
      )}

      <LikeShareBar
        postId={post.id}
        postLink={post.link}
        postDate={post.date}
      />

      <div className="px-4 mt-3">
        <h2
          className="text-lg font-semibold mb-1"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div
          className="text-sm text-gray-700 mb-2"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <Button href={post.link}>Läs mer</Button>
      </div>
    </div>
  );
}
