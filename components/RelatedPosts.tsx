import BlogCard from "@/components/BlogCard";
import { Post } from "@/lib/posts";

export default function RelatedPosts({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  return (
    <section className="mt-10">
      <h3 className="text-2xl font-bold">Related Posts</h3>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
