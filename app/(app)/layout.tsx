import AppNavbar from "@/components/layout/AppNavbar";
import LuxuryConciergeDrawer from "@/components/concierge/LuxuryConciergeDrawer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNavbar />
      <main className="min-h-screen bg-[#F5F5F5] pt-14">{children}</main>
      <LuxuryConciergeDrawer />
    </>
  );
}
