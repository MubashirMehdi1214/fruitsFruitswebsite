import { NextResponse } from "next/server";
import { addComment, getCommentsBySlug } from "@/lib/comments";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  return NextResponse.json({ comments: getCommentsBySlug(params.slug) });
}

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    comment?: string;
    parentId?: string;
  };

  if (!body.name || !body.email || !body.comment) {
    return NextResponse.json({ error: "Name, email, and comment are required." }, { status: 400 });
  }

  const created = addComment(params.slug, {
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    comment: body.comment.trim(),
    parentId: body.parentId
  });

  return NextResponse.json({ comment: created }, { status: 201 });
}

