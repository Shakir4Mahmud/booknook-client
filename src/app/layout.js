import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import "./glass.css";
import "./effects.css";
import "./navbar.css";
import ThemeProvider from "@/components/layout/ThemeProvider";
import MotionProvider from "@/components/layout/MotionProvider";
import BackgroundOrbs from "@/components/layout/BackgroundOrbs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: {
    default: "BookNook | Add, Borrow, Return",
    template: "BookNook | %s",
  },
  description:
    "BookNook is a small online library. Add a book, borrow a book, return a book.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col overflow-x-clip antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <MotionProvider>
            <BackgroundOrbs />
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
            <Toaster position="top-center" richColors />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}