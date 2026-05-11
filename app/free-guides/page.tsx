import type { Metadata } from "next";
import FreeGuidesClient from "@/components/PDFGuides/FreeGuidesClient";
import { guides } from "@/components/PDFGuides/guideData";

export const metadata: Metadata = {
  title: "Free Health Guide PDF Download | Fruit Benefits PDF Free & Home Remedies Handbook PDF",
  description:
    "Free health guide PDF download hub with 10 premium printable resources, including fruit benefits PDF free files, home remedies handbook PDF, healthy eating guide free download plans, and immunity boosting foods PDF guides.",
  alternates: { canonical: "/free-guides" }
};

export default function FreeGuidesPage() {
  return (
    <div className="container-default pb-12 pt-6 md:pt-8">
      <FreeGuidesClient guides={guides} />
    </div>
  );
}
