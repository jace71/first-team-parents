import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// Instrument Sans is the display face (titles). Inter is the body face.
const instrument = localFont({
  src: [
    {
      path: "../fonts/instrument-sans.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-instrument",
  adjustFontFallback: "Arial",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

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
    <html lang="en" className={`${instrument.variable} ${inter.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
