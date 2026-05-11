import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import type { ReactElement } from "react";
import { GuideDocument } from "@/components/PDFGuides/GuideDocument";
import { getGuideBySlug } from "@/components/PDFGuides/guideData";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    return NextResponse.json({ error: "Guide not found." }, { status: 404 });
  }

  const pdfBuffer = await renderToBuffer(GuideDocument({ guide }) as unknown as ReactElement);

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${guide.fileName}"`,
      "Cache-Control": "public, max-age=3600"
    }
  });
}
