import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const BASE_URL = "https://portfolio-integrado.up.railway.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Leonardo Ramos | Desenvolvedor Full Stack e Entusiasta",
    template: "%s | Leonardo Ramos",
  },
  description: "Explore um portfólio data-driven com métricas reais de código. Projetos de Engenharia de Software, Back-end e Inteligência Artificial auditados em tempo real.",
  keywords: ["Desenvolvedor Fullstack", "Engenheiro de Software", "Next.js", "React", "IA", "Data Driven", "Portfolio", "Leonardo Ramos", "Back-end"],
  openGraph: {
    title: "Leonardo Ramos | Desenvolvedor de Software Full Stack & Soluções de IA",
    description: "Portfólio data-driven. Veja métricas reais de projetos e análises de IA.",
    url: BASE_URL,
    siteName: "Leonardo Ramos Portfolio",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Preview do Portfolio de Leonardo Ramos",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/perfil.jpg" as="image" type="image/jpeg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-200`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
