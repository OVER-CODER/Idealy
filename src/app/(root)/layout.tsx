import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "../globals.css";


const inter = Inter({ subsets: ["latin"] });

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
        <body className={inter.className}>
          <main className='flex'>
            <section className='main-container'>
              <div className='w-full max-w-4xl bg-background'>{children}</div>
            </section>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}