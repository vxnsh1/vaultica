import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vaultica",
  description: "AI Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <footer className="bg-gray-50 py-4">
            <div className="container flex space-x-4 justify-center mx-auto px-4 text-center">
              <a href={"https://www.instagram.com"} target="_blank"><Instagram className="cursor-pointer"/></a>
              <a href={"https://x.com"} target="_blank"><Twitter className="cursor-pointer"/></a>
              <a href={"https://www.linkedin.com"} target="_blank"><Linkedin className="cursor-pointer"/></a>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
