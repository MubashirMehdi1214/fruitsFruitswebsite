import Link from "next/link";
import { categorySlug } from "@/lib/utils";

export default function CategoryCard({ name }: { name: string }) {
  return (
    <Link href={`/category/${categorySlug(name)}`} className="rounded-lg border bg-white p-4 text-center shadow-sm hover:border-brand">
      <p className="font-semibold text-gray-800">{name}</p>
    </Link>
  );
}
