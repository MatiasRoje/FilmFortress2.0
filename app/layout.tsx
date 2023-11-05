import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import type { Metadata } from "next";
import { poppins } from "./fonts";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

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
      <body className="container mx-auto flex min-h-screen flex-col border-none bg-neutral-800 px-4 py-4 text-neutral-50">
        <AuthProvider>
          <ReactQueryProvider>
            <header>
              <NavBar />
            </header>
            {children}
            <Footer />
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
