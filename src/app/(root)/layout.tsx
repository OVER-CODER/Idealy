import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, SignInButton, SignUpButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "../globals.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button"
import { Mail } from "lucide-react"

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
          <main className='flex items-center'>
            <section className='min-h-screen flex-1 flex-col bg-sky-950 max-md:pb-32 sm:px-10; flex'>
            <div>
            <Image
                    src="/assets/vector.svg"
                    alt='stars'
                    width={90}
                    height={90}
                    className='object-cover flex overflow-hidden'
                    />
            {/* <Image
                    src="/assets/vector.svg"
                    alt='stars'
                    width={90}
                    height={90}
                    className='object-cover flex overflow-hidden justify-end'
                    /> */}
            </div>
            <div className="flex justify-center items-center">
            <h1 className="text-xl text-white"> Let your ideas shine with Idealy.</h1>
            </div>
            <div className="flex justify-center">

            <Button  className=" items-center border-2 border-black w-52 text-white">
            <Mail className="mr-2 h-4 w-4" />
                <SignInButton />
            </Button>
            
            <Button  className=" items-center border-2 border-black w-52 text-white">
            <Mail className="mr-2 h-4 w-4" />
            <SignUpButton />
            </Button>
            </div>
            
            
            



              <div className='w-full max-w-4xl bg-background'>{children}</div>
            </section>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}