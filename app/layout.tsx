import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import type { Metadata } from "next";
import { poppins } from "./fonts";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: {
    default: "FilmFortress",
    template: "%s — FilmFortress",
  },
  description:
    "A 10.000+ movies database created by Matías Roje with the purpose of learning Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="container mx-auto bg-neutral-800 text-gray-50 flex flex-col px-4 py-4 min-h-screen">
        <AuthProvider>
          <header>
            <NavBar />
          </header>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
