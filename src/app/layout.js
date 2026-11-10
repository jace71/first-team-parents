import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// The variable file shipped with the preview. weight "100 900" keeps
// regular, medium, and semibold as real Inter weights rather than fakes.
const inter = localFont({
  src: [
    {
      path: "../fonts/inter-variable.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: "Arial",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata = {
  title: {
    default: "First Team Parents — A practical guide to travel and club sports",
    template: "%s — First Team Parents",
  },
  description:
    "A practical guide to travel and club sports, written for parents. Understand costs, choose a program, and prepare for tryouts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${inter.className}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" className="container">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
