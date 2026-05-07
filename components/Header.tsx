import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container-default flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold text-brand">
          Health Fruits Tips
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-gray-600">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
