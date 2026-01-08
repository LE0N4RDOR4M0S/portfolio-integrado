import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-integrado.up.railway.app"),
  title: {
    default: "Leonardo Ramos | Desenvolvedor e Entusiasta",
    template: "%s | Leonardo Ramos",
  },
  description:
    "Portfólio de Leonardo Ramos - Projetos, habilidades e métricas em tempo real.",
  openGraph: {
    title: "Leonardo Ramos - Portfolio",
    description: "Veja meus projetos e métricas de código em tempo real.",
    url: "/",
    siteName: "Leonardo Ramos",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-200`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
