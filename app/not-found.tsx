import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-default py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-3 text-gray-600">The page you are looking for may have moved or no longer exists.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-green-700 px-5 py-3 font-semibold text-white">
        Back to homepage
      </Link>
    </div>
  );
}
