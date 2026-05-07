export default function Newsletter() {
  return (
    <section className="rounded-xl bg-brand px-6 py-10 text-white">
      <h3 className="text-2xl font-bold">Join our wellness newsletter</h3>
      <p className="mt-2 max-w-2xl text-green-100">Get weekly practical health tips, seasonal fruit guides, and easy recipes.</p>
      <form className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input type="email" required placeholder="Enter your email" className="w-full rounded-md border border-white/30 px-4 py-3 text-gray-900" />
        <button className="rounded-md bg-white px-5 py-3 font-semibold text-brand">Subscribe</button>
      </form>
    </section>
  );
}
