import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n/context";
import { CommandPalette } from "@/components/command-palette";

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
    "Un espacio para compartir y cultivar la espiritualidad: melodías de meditación relajantes con campanas, práctica de la presencia consciente AQUÍ y AHORA, respiración consciente y más prácticas para habitar el momento presente.",
  keywords: [
    "espiritualidad",
    "meditación",
    "música de meditación",
    "melodías relajantes",
    "presencia consciente",
    "aquí y ahora",
    "respiración consciente",
    "mindfulness",
    "espiritual",
    "yoga nidra",
    "mantra",
    "gratitud",
  ],
  authors: [{ name: "Presencia AQUÍ y AHORA" }],
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Presencia AQUÍ y AHORA",
    description:
      "Melodías de meditación relajantes, presencia consciente y respiración consciente. Un espacio para volver al instante presente.",
    url: SITE_URL,
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Presencia AQUÍ y AHORA · melodías de meditación y presencia consciente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Presencia AQUÍ y AHORA",
    description:
      "Melodías de meditación relajantes, presencia consciente y respiración consciente. Un espacio para volver al instante presente.",
    images: ["/og-image.jpg"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Presencia",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1b18" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Datos estructurados para buscadores (schema.org) */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Presencia AQUÍ y AHORA",
      description:
        "Melodías de meditación, presencia consciente y respiración consciente para habitar el momento presente.",
      inLanguage: ["es", "en", "pt"],
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#app`,
      name: "Presencia AQUÍ y AHORA",
      url: SITE_URL,
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      browserRequirements: "Requiere JavaScript",
      inLanguage: ["es", "en", "pt"],
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        name: "Presencia+",
        description:
          "Prácticas ampliadas (retiro breve de presencia extendida) con pago único.",
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <I18nProvider>
            {children}
            <Toaster />
            <CommandPalette />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
