import "./globals.css";
import { Inter } from "next/font/google";

import type { Metadata } from "next";

import { cookies } from "next/headers";
import QueryProvider from "./provider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <QueryProvider>
        <body className={inter.className}>
          <NavBar user={user} />
          {children}
        </body>
      </QueryProvider>
    </html>
  );
}
