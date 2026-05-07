import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our mission, editorial process, and health content standards.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <div className="container-default py-10">
      <h1 className="font-serif text-4xl font-bold">About Us</h1>
      <p className="mt-4 text-gray-700">Health Fruits Tips is a health education platform focused on practical nutrition and wellness content.</p>
      <h2 className="mt-8 text-2xl font-bold">Mission</h2>
      <p className="mt-3 text-gray-700">Our mission is to make healthy living simple, affordable, and evidence-informed for everyone.</p>
      <h2 className="mt-8 text-2xl font-bold">Team</h2>
      <p className="mt-3 text-gray-700">Our team includes health writers, nutrition researchers, and editorial reviewers.</p>
      <h2 className="mt-8 text-2xl font-bold">Why Trust Our Content</h2>
      <p className="mt-3 text-gray-700">Each article is reviewed for clarity, scientific plausibility, and reader safety.</p>
      <a href="/contact" className="mt-8 inline-block rounded bg-brand px-5 py-3 font-semibold text-white">Contact Us</a>
    </div>
  );
}
