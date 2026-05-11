import fs from "node:fs";
import path from "node:path";

export type CommentItem = {
  id: string;
  name: string;
  email: string;
  comment: string;
  createdAt: string;
  parentId?: string;
};

type CommentsStore = Record<string, CommentItem[]>;

const commentsPath = path.join(process.cwd(), "data", "comments.json");

function readComments(): CommentsStore {
  if (!fs.existsSync(commentsPath)) return {};
  const raw = fs.readFileSync(commentsPath, "utf-8");
  return JSON.parse(raw) as CommentsStore;
}

function writeComments(data: CommentsStore) {
  fs.writeFileSync(commentsPath, JSON.stringify(data, null, 2), "utf-8");
}

export function getCommentsBySlug(slug: string) {
  const store = readComments();
  return (store[slug] || []).sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
}

export function getCommentCount(slug: string) {
  return getCommentsBySlug(slug).length;
}

export function addComment(slug: string, payload: Omit<CommentItem, "id" | "createdAt">) {
  const store = readComments();
  const next: CommentItem = {
    id: `${slug}-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...payload
  };
  store[slug] = [...(store[slug] || []), next];
  writeComments(store);
  return next;
}

