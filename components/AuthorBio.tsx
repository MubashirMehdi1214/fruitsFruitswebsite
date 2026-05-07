export default function AuthorBio({ author, bio }: { author: string; bio: string }) {
  return (
    <section className="rounded-xl border bg-white p-6">
      <h3 className="text-lg font-bold">About the Author</h3>
      <p className="mt-2 font-semibold text-brand">{author}</p>
      <p className="mt-2 text-gray-700">{bio}</p>
    </section>
  );
}
