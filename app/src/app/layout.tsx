import "~/styles/globals.css";

import { type Metadata } from "next";
import { Lato } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
  title: "🏮 Lantern Service Portal",
  description: "Service management solution created by Lantern.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const serif = Lato({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} bg-copper-100 fg-copper-950`}>
      <body>
        <TRPCReactProvider>
          <HydrateClient>{children}</HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
