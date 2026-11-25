import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalyticsPageView from "@/components/GoogleAnalyticsPageView";
import { gaMeasurementId } from "@/lib/analytics";
import { defaultDescription, defaultTitle, siteUrl, titleSuffix } from "@/lib/seo";
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
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s${titleSuffix}`,
  },
  description: defaultDescription,
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
      <GoogleAnalytics gaId={gaMeasurementId} />
      <GoogleAnalyticsPageView />
    </html>
  );
}
