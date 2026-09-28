import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Sri Sowdambika Polytechnic College | SSPC — Virudhunagar",
  description:
    "Sri Sowdambika Polytechnic College — AICTE approved institution in Virudhunagar, Tamil Nadu. Quality diploma education in Civil, EEE, ECE, IT, Mechanical & Textile.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HomeClient />
      <Footer />
    </>
  );
}
