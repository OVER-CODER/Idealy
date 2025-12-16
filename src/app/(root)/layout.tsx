import React from "react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "../globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Idealy",
  description: "A platform to share your ideas and get feedback",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang='en'>
        <body className={outfit.className}>
          <main className='flex items-center justify-center w-full'>
            <section className='min-h-screen w-full flex-col bg-[#F5F5DC] flex'>
              {children}
            </section>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}