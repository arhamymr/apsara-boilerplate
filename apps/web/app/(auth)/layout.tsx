import { MainNav } from "@/components/navigation/main-nav";
import { Footer } from "@/components/footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <>
   <MainNav />
   <main className="flex-1">
     <div className="flex flex-col">{children}</div>
   </main>
   <Footer />
   </>
  );
}
