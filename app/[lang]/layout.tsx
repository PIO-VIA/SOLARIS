import type { Metadata } from "next";
import "../globals.css";
import Analytics from "../analytics";
import { languages } from '../i18n/settings'

export const metadata: Metadata = {
  title: "SOLARIS",
  description: "Explore the Solar System and Beyond",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lang: lng }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params
  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <script async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2993050670240470"
          crossOrigin="anonymous">

        </script>
      </head >
      <body
        className={`antialiased font-sans`}
      >
        {children}
        <Analytics />

      </body>
    </html>
  );
}
