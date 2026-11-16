import Link from "next/link";

export const metadata = {
  title: "Page not found",
  description: "That address is not part of this guide.",
};

export default function NotFound() {
  return (
    <main id="main" className="missing">
      <div className="prose-block">
        <h1 className="page-title">Page not found</h1>
        <p className="page-lede">
          That address is not part of this guide. <Link href="/">Back to the homepage.</Link>
        </p>
      </div>
    </main>
  );
}
