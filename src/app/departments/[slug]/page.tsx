import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DepartmentClient from "./DepartmentClient";

const DEPARTMENTS = [
  "civil-engineering",
  "electrical-electronics",
  "electronics-communication",
  "information-technology",
  "mechanical-engineering",
  "textile-technology",
  "refrigeration-air-conditioning",
];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!DEPARTMENTS.includes(slug)) return { title: "Not Found" };
  const name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${name} Department | SSPC`,
    description: `Learn more about the ${name} diploma programme at Sri Sowdambika Polytechnic College.`,
  };
}

export default async function DepartmentPage({ params }: Props) {
  const { slug } = await params;

  if (!DEPARTMENTS.includes(slug)) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <DepartmentClient slug={slug} />
      <Footer />
    </>
  );
}
