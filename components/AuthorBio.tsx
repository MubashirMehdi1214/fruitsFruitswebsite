import Image from "next/image";

type AuthorBioProps = {
  author: string;
  bio: string;
  title?: string;
  avatar?: string;
  linkedin?: string;
  lastUpdated?: string;
};

export default function AuthorBio({ author, bio, title, avatar, linkedin, lastUpdated }: AuthorBioProps) {
  return (
    <section className="rounded-2xl bg-green-700 p-6 text-white">
      <h3 className="text-lg font-bold">Written by</h3>
      <div className="mt-4 flex items-start gap-4">
        {avatar ? (
          <Image src={avatar} alt={author} width={56} height={56} className="h-14 w-14 shrink-0 rounded-full bg-white/20 object-cover" />
        ) : (
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/20 text-xl font-bold">{author.slice(0, 1)}</span>
        )}
        <div>
          <p className="font-semibold">{author}</p>
          {title && <p className="text-sm text-green-100">{title}</p>}
          <p className="mt-2 text-green-100">{bio}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white/20 px-3 py-1">Reviewed by editorial team</span>
            {lastUpdated && <span className="rounded-full bg-white/20 px-3 py-1">Last updated: {lastUpdated}</span>}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer" className="rounded-full bg-white/20 px-3 py-1 hover:bg-white/30">
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
