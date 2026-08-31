import AppNavbar from "@/components/layout/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavbar />
      <main>{children}</main>
    </div>
  );
}
