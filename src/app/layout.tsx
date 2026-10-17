import type { Metadata } from "next";
import { Oswald, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Clásicos del 98 | Peluquería y Barbería en Querétaro",
    template: "%s | Clásicos del 98",
  },
  description:
    "Barbería de barrio en Querétaro: corte, barba, estilo y buena plática en Calle Química #42.",
  keywords: [
    "barbería Querétaro",
    "peluquería Querétaro",
    "Clásicos del 98",
    "corte de cabello",
    "barbería tradicional",
  ],
  openGraph: {
    title: "Clásicos del 98",
    description: "Buen corte. Buena plática. Buenos momentos.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${oswald.variable} ${libre.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
