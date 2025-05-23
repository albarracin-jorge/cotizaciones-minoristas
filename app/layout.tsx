import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dolar Bancos Hoy",
  description: "Cotizacion del dolar minorista de los distintos bancos publicado diariamente por el Banco Central de la República Argentina",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script async strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-GR675ZTCLW"></Script>
      <Script id="" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-GR675ZTCLW');
        `}
      </Script>
      <body
        className={
          `${geistSans.variable} ${geistMono.variable} 
          antialiased 
          flex flex-col justify-between h-screen
          bg-emerald-50 dark:bg-gray-900
          text-gray-950 dark:text-emerald-50
          `}
      >
        <header className="
          flex items-center justify-start px-4 lg:px-52
          bg-emerald-200 dark:bg-gray-950
          shadow-xl font-bold
        ">
          <Link href="/"
            className="hover:bg-emerald-300 dark:hover:bg-gray-800 p-4 lg:p-6"
          >
            Dolar Bancos Hoy
          </Link>
          <Link href="/about"
            className="hover:bg-emerald-300 dark:hover:bg-gray-800 p-4 lg:p-6"
          >
            Sobre el proyecto
          </Link>
        </header>
          {children}
        <footer className="flex items-center justify-center p-4">
          <p>
            Hecho por <Link href="https://github.com/albarracin-jorge">Jorge Albarracín.</Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
