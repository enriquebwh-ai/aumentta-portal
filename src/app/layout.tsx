import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portal Cliente | Aumentta",
  description: "Plataforma de gestión de proyectos y comunicación con Aumentta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
