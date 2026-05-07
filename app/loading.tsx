export default function Loading() {
  return (
    <div className="container-default py-10">
      <div className="h-10 w-1/2 animate-pulse rounded bg-gray-200" />
      <div className="mt-4 h-4 w-full animate-pulse rounded bg-gray-200" />
      <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-gray-200" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-52 animate-pulse rounded bg-gray-200" />
        ))}
      </div>
    </div>
  );
}
