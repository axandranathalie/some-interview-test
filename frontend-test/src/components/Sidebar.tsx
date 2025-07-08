import { Post } from "@/types/post";
import Button from "./Button";

export default function Sidebar({ posts }: { posts: Post[] }) {
  const oldestPosts = [...posts].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <aside className="sticky top-24 max-h-[80vh] overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Tidigare inlägg</h3>

      <div className="space-y-6">
        {oldestPosts.slice(0, 4).map((post) => (
          <div
            key={post.id}
            className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h4
              className="text-md font-medium mb-1"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div
              className="text-sm text-gray-600 mb-2 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
            <Button href={post.link}>Läs mer</Button>
          </div>
        ))}
      </div>
    </aside>
  );
}
