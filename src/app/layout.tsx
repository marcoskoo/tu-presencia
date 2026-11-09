import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const serifDisplay = Cormorant_Garamond({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sansBody = Jost({
  variable: "--font-sans-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const SITE_URL = 'https://tu-presencia.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Presencia AQUÍ y AHORA · Espíritu de consciencia",
  description:
    "Un espacio para compartir y cultivar la espiritualidad: meditaciones guiadas con audio, práctica de la presencia consciente AQUÍ y AHORA, respiración consciente y más prácticas para habitar el momento presente.",
  keywords: [
    "espiritualidad",
    "meditación",
    "meditación guiada",
    "presencia consciente",
    "aquí y ahora",
    "respiración consciente",
    "mindfulness",
    "espiritual",
  ],
  authors: [{ name: "Presencia AQUÍ y AHORA" }],
  openGraph: {
    title: "Presencia AQUÍ y AHORA",
    description:
      "Meditaciones guiadas con audio, presencia consciente y respiración consciente. Un espacio para volver al instante presente.",
    url: SITE_URL,
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Presencia AQUÍ y AHORA",
    description:
      "Meditaciones guiadas con audio, presencia consciente y respiración consciente. Un espacio para volver al instante presente.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${serifDisplay.variable} ${sansBody.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
