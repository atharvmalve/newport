import { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

// --- METADATA CONFIGURATION ---
export const metadata: Metadata = {
  title: "Atharv | Product Developer", // Site Name / Browser Tab Title
  description: "Product Developer from Pune. Helping agencies build end-to-end applications.", // Meta Description
  
  // Favicon configuration
  icons: {
    icon: "/favicon.ico", 
  },

  // Open Graph (Link previews for Discord, LinkedIn, WhatsApp, etc.)
  openGraph: {
    title: "Atharv | Product Developer",
    description: "Product Developer from Pune. Helping agencies build end-to-end applications.",
    url: "https://atharv.dev", // Replace with your actual live domain URL
    siteName: "Atharv Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Refers to public/og-image.png
        width: 1200,
        height: 630,
        alt: "Atharv Portfolio Preview",
      },
    ],
  },

  // Twitter/X Cards preview configuration
  twitter: {
    card: "summary_large_image",
    title: "Atharv | Product Developer",
    description: "Product Developer from Pune. Helping agencies build end-to-end applications.",
    images: ["/og-image.png"], // Refers to public/og-image.png
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable} bg-[#000000] text-[#FAFAFA]`}>
      <body className="antialiased min-h-screen font-sans selection:bg-[#C8102E]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}