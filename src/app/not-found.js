import Link from "next/link";

export const metadata = {
  title: "Page not found",
  description: "That address is not part of this guide.",
};

export default function NotFound() {
  return (
    <header className="page-intro">
      <h1>Page not found</h1>
      <p className="lede">
        That address is not part of this guide.{" "}
        <Link href="/">Back to the homepage.</Link>
      </p>
    </header>
  );
}
