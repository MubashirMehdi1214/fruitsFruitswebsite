export default function AuthorBio({ author, bio }: { author: string; bio: string }) {
  return (
    <section className="rounded-2xl bg-green-700 p-6 text-white">
      <h3 className="text-lg font-bold">About the Author</h3>
      <div className="mt-4 flex items-start gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/20 text-xl font-bold">
          {author.slice(0, 1)}
        </span>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="mt-2 text-green-100">{bio}</p>
          <div className="mt-3 flex gap-2 text-xs">
            <span className="rounded-full bg-white/20 px-3 py-1">Twitter</span>
            <span className="rounded-full bg-white/20 px-3 py-1">LinkedIn</span>
            <span className="rounded-full bg-white/20 px-3 py-1">Website</span>
          </div>
        </div>
      </div>
    </section>
  );
}
