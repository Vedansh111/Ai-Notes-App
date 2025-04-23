import type { Metadata } from "next";
import "./index.css";
import ClientProvider from "@/components/ClientProvider";

export const metadata: Metadata = {
  title: "AI Notes App",
  description: "An AI-Powered notes taking app!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      </head>
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
