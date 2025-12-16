import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SwimmingFish } from "@/components/easter-eggs/SwimmingFish";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col relative">
      <Header />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
      <SwimmingFish />
    </div>
  );
}
