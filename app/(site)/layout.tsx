import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DreamArchitectDrawer from "@/components/dream-architect/DreamArchitectDrawer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <DreamArchitectDrawer />
    </>
  );
}
