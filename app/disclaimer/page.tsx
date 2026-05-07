import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Medical and professional disclaimer for Health Fruits Tips.",
  alternates: { canonical: "/disclaimer" }
};

export default function DisclaimerPage() {
  return (
    <div className="container-default py-10">
      <h1 className="font-serif text-4xl font-bold">Disclaimer</h1>
      <p className="mt-4 text-gray-700">All content is for educational purposes only and does not replace diagnosis, treatment, or professional medical advice.</p>
      <p className="mt-4 text-gray-700">Always consult a qualified healthcare professional before changing medication, diet, or treatment plans.</p>
    </div>
  );
}
