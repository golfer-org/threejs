import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Imagination Gallery | 3D Art Gallery",
  description: "Explore an interactive 3D art gallery.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
