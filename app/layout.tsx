import NavBar from "@/components/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FilmFortress",
  description: "A movies database",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="container mx-auto bg-zinc-900 text-gray-50 flex flex-col px-4 py- min-h-screen">
        <header>
          <NavBar />
        </header>
        {children}
        <footer>[Footer]</footer>
      </body>
    </html>
  );
}
