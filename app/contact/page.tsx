import type { Metadata } from "next";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Health Fruits Tips editorial team.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  const contact = siteConfig.contact;

  return (
    <div className="container-default py-10">
      <h1 className="font-serif text-4xl font-bold">Contact Us</h1>
      <p className="mt-3 max-w-2xl text-gray-700">
        Reach out for article feedback, partnership inquiries, or support. Our team usually responds within 24 hours.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <form className="space-y-4 rounded-2xl border bg-white p-6">
          <input className="w-full rounded border p-3" placeholder="Full Name" required />
          <input className="w-full rounded border p-3" type="email" placeholder="Email" required />
          <input className="w-full rounded border p-3" type="tel" placeholder="Phone (optional)" />
          <textarea className="w-full rounded border p-3" rows={5} placeholder="Message" required />
          <button className="rounded bg-brand px-5 py-3 text-white">Send Message</button>
        </form>

        <section className="rounded-2xl border bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p><span className="font-semibold text-gray-900">Phone:</span> {contact.phone}</p>
            <p><span className="font-semibold text-gray-900">WhatsApp:</span> {contact.whatsapp}</p>
            <p><span className="font-semibold text-gray-900">Email:</span> {contact.email}</p>
            <p>
              <span className="font-semibold text-gray-900">Address:</span><br />
              {contact.addressLine1}<br />
              {contact.addressLine2}<br />
              {contact.cityCountry}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Business Hours:</span><br />
              {contact.hoursWeek}<br />
              {contact.hoursWeekend}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
