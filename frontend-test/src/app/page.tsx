
import BottomNav from "@/components/BottomNav";
import PostListWrapper from "@/components/PostListWrapper";


export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Bergviks Blogg</h1>
      <PostListWrapper />
      <BottomNav />
    </main>
  );
}
