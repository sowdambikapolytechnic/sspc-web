import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
  title: "News & Announcements | SSPC",
  description: "Latest news, announcements, and achievements from Sri Sowdambika Polytechnic College.",
};

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <NewsClient />
      <Footer />
    </>
  );
}
