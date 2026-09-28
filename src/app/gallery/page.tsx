import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery — Campus Life at SSPC",
  description: "Explore the campus life, events, laboratories and activities at Sri Sowdambika Polytechnic College through our photo and video gallery.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <GalleryClient />
      <Footer />
    </>
  );
}
