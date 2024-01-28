import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Canvas Helper v1.0.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AntdRegistry>
        <body className={inter.className}>{children}</body>
      </AntdRegistry>
    </html>
  );
}
