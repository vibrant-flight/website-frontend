import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import AuthAdminProvider from "@/components/AuthAdminProvider";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
export const metadata: Metadata = {
  title: "Vibrant Flights-Elevate your jouney",
  description: "Vibrant Flights clothing store",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-neutral-900`}>
        <Analytics/>
        <SpeedInsights />
        <AuthAdminProvider>
          <AuthProvider>
            <NavbarWrapper/>
            {children}
            <Footer/>
          </AuthProvider>
        </AuthAdminProvider>
      </body>
    </html>
  );
}
