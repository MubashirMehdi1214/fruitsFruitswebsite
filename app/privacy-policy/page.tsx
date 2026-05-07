import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and GDPR details for Health Fruits Tips.",
  alternates: { canonical: "/privacy-policy" }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-default py-10">
      <h1 className="font-serif text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-4 text-gray-700">We value your privacy and process personal data in accordance with GDPR principles such as transparency, purpose limitation, and data minimization.</p>
      <p className="mt-4 text-gray-700">We may use cookies for analytics, performance, and advertising personalization. Google AdSense may use cookies to serve ads based on prior visits.</p>
      <p className="mt-4 text-gray-700">You can request data access, correction, deletion, or portability by contacting us.</p>
    </div>
  );
}
