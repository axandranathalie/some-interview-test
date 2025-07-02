
import BottomNav from "@/components/BottomNav";
import DesktopHeader from "@/components/DesktopHeader";
import PostListWrapper from "@/components/PostListWrapper";


export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black p-6">
      <DesktopHeader />
      <PostListWrapper />
      <BottomNav />
    </main>
  );
}
