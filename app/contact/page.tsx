import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Health Fruits Tips editorial team.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <div className="container-default py-10">
      <h1 className="font-serif text-4xl font-bold">Contact Us</h1>
      <p className="mt-3 text-gray-700">Email us at hello@healthfruitstips.com</p>
      <form className="mt-6 max-w-xl space-y-4 rounded-xl border bg-white p-6">
        <input className="w-full rounded border p-3" placeholder="Name" required />
        <input className="w-full rounded border p-3" type="email" placeholder="Email" required />
        <textarea className="w-full rounded border p-3" rows={5} placeholder="Message" required />
        <button className="rounded bg-brand px-5 py-3 text-white">Send Message</button>
      </form>
      <div className="mt-6 text-gray-700">Follow us: X / Facebook / YouTube</div>
    </div>
  );
}
