import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Events | SSPC",
  description: "Upcoming and past events at Sri Sowdambika Polytechnic College.",
};

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <EventsClient />
      <Footer />
    </>
  );
}
