import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavBar from "./components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import ContextContainer from "@/components/ContextContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "會議簽到系統",
  description: "會議簽到系統",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ContextContainer>
            <NavBar />
            {children}
            <Toaster />
          </ContextContainer>
        </ThemeProvider>
      </body>
    </html>
  );
}
