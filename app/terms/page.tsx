import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Health Fruits Tips.",
  alternates: { canonical: "/terms" }
};

export default function TermsPage() {
  return (
    <div className="container-default py-10">
      <h1 className="font-serif text-4xl font-bold">Terms of Service</h1>
      <p className="mt-4 text-gray-700">By accessing this website, you agree to use it lawfully and at your own discretion.</p>
      <p className="mt-4 text-gray-700">All content is protected by copyright. You may not republish full articles without written permission.</p>
      <p className="mt-4 text-gray-700">We are not liable for direct or indirect damages resulting from use of content on this site.</p>
    </div>
  );
}
