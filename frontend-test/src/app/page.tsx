
import BottomNav from "@/components/BottomNav";
import DesktopHeader from "@/components/DesktopHeader";
import Hero from "@/components/Hero";
import MobileHeader from "@/components/MobileHeader";
import PostListWrapper from "@/components/PostListWrapper";


export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black p-6">
      <DesktopHeader />
      <MobileHeader />
      <Hero />
      <PostListWrapper />
      <BottomNav />
    </main>
  );
}
