import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DepartmentsClient from "./DepartmentsClient";

export const metadata: Metadata = {
  title: "Departments & Programmes",
  description: "Explore the various engineering diploma programmes offered at Sri Sowdambika Polytechnic College.",
};

export default function DepartmentsPage() {
  return (
    <>
      <Navbar />
      <DepartmentsClient />
      <Footer />
    </>
  );
}
