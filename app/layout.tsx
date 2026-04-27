import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    // Allows per-page titles with a default suffix
    default: "PRINCE KAY – Software Developer Portfolio",
    template: "%s | PRINCE KAY",
  },
  description:
    "Welcome to the portfolio of Prince Kay, a passionate software developer specializing in React, Next.js, and TypeScript. Explore my projects, skills, and experience in building modern web applications.",
  keywords: [
    "Prince Kay",
    "software developer",
    "frontend developer",
    "React",
    "Next.js",
    "TypeScript",
    "portfolio",
    "web development",
  ],
  authors: [{ name: "Prince Kay", url: "https://my-portfolio-neon-seven-87.vercel.app" }],
  creator: "Prince Kay",
  openGraph: {
    title: "PRINCE KAY – Software Developer Portfolio",
    description:
      "Building digital experiences with React, Next.js, and TypeScript. View my projects and get in touch.",
    url: "https://my-portfolio-neon-seven-87.vercel.app",
    siteName: "Prince Kay Portfolio",
    images: [
      {
        url: "/og-image.png", // Create an OG image (1200x630) 
        width: 1200,
        height: 630,
        alt: "Prince Kay Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRINCE KAY – Software Developer Portfolio",
    description:
      "Building digital experiences with React, Next.js, and TypeScript. View my projects and get in touch.",
    images: ["/og-image.png"],
    creator: "@", 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F5FC" },
    { media: "(prefers-color-scheme: dark)", color: "#050510" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // The 'dark' class will be set by the script below and by your Portfolio component
      suppressHydrationWarning // Prevents hydration mismatch because of the script
    >
      <head>
        {/* Prevents flash of wrong theme – runs before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const isDark = storedTheme === 'dark' || (storedTheme === null && prefersDark);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col m-0 p-0">
        {/* Skip to main content – for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-[#00D4FF] text-black px-4 py-2 rounded font-mono text-sm focus:outline-none"
        >
          Skip to main content
        </a>
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}