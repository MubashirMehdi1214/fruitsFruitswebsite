import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white py-10">
      <div className="container-default flex flex-col items-center justify-between gap-4 text-sm text-gray-600 md:flex-row">
        <p>© {new Date().getFullYear()} Health Fruits Tips. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
