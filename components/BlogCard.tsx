import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/posts";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <article className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <Image src={post.featuredImage} alt={post.title} width={800} height={450} className="h-48 w-full object-cover" />
      <div className="p-5">
        <p className="text-xs font-semibold uppercase text-brand">{post.category}</p>
        <h3 className="mt-2 text-lg font-bold text-gray-900">{post.title}</h3>
        <p className="mt-2 text-sm text-gray-600">{post.metaDescription}</p>
        <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-brand">
          Read article →
        </Link>
      </div>
    </article>
  );
}
