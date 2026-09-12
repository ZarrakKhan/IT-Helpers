import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { TrustSection } from "@/components/home/TrustSection";
import { CTASection } from "@/components/home/CTASection";
import { ContactSection } from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "IT Support Sydney | Managed IT Services & Cybersecurity",
  description:
    "IT Helpers delivers IT support, Microsoft 365, cloud, networking, and cybersecurity services for Sydney SMBs and individuals. Get a free consultation.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <TrustSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
