"use client";

import { FormEvent, useMemo, useState } from "react";

type CommentItem = {
  id: string;
  name: string;
  email: string;
  comment: string;
  createdAt: string;
  parentId?: string;
};

type Props = {
  slug: string;
  initialComments: CommentItem[];
};

function timeAgo(date: string) {
  const diff = Date.now() - +new Date(date);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export default function CommentsSection({ slug, initialComments }: Props) {
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [replyTo, setReplyTo] = useState<string | undefined>(undefined);
  const [form, setForm] = useState({ name: "", email: "", comment: "" });

  const nested = useMemo(
    () => comments.filter((comment) => !comment.parentId).map((comment) => ({
      ...comment,
      replies: comments.filter((reply) => reply.parentId === comment.id)
    })),
    [comments]
  );

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = { ...form, parentId: replyTo };
    const response = await fetch(`/api/comments/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) return;
    const data = await response.json();
    setComments((prev) => [...prev, data.comment]);
    setForm({ name: "", email: "", comment: "" });
    setReplyTo(undefined);
  };

  return (
    <section className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="text-xl font-bold text-gray-900">Comments ({comments.length})</h3>
      <div className="mt-4 space-y-4">
        {nested.map((item) => (
          <div key={item.id} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-green-100 font-semibold text-green-700">
                {item.name.slice(0, 1).toUpperCase()}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">{timeAgo(item.createdAt)}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-700">{item.comment}</p>
            <button type="button" className="mt-2 text-xs font-semibold text-green-700" onClick={() => setReplyTo(item.id)}>
              Reply
            </button>
            {item.replies.length > 0 && (
              <div className="mt-3 space-y-3 border-l-2 border-green-100 pl-4">
                {item.replies.map((reply) => (
                  <div key={reply.id} className="rounded-md bg-white p-3">
                    <p className="text-xs font-semibold text-gray-900">{reply.name} • {timeAgo(reply.createdAt)}</p>
                    <p className="mt-1 text-sm text-gray-700">{reply.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="mt-6 space-y-3 rounded-xl border border-dashed border-gray-300 p-4">
        {replyTo && <p className="text-xs text-green-700">Replying to comment</p>}
        <div className="grid gap-3 md:grid-cols-2">
          <input
            required
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Name"
            className="min-h-[44px] rounded-lg border px-3"
          />
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="Email"
            className="min-h-[44px] rounded-lg border px-3"
          />
        </div>
        <textarea
          required
          value={form.comment}
          onChange={(event) => setForm((prev) => ({ ...prev, comment: event.target.value }))}
          placeholder="Write your comment..."
          rows={4}
          className="w-full rounded-lg border p-3"
        />
        <button type="submit" className="min-h-[44px] rounded-lg bg-green-700 px-5 py-2 font-semibold text-white">
          Submit Comment
        </button>
      </form>
    </section>
  );
}

