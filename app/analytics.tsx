'use client';
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function Analytics() {
    const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      window.gtag?.("config", "G-C9LWPQ44H7", {
        page_path: pathname + searchParams.toString(),
      });
    }
  }, [pathname, searchParams]);

  return (
    <>
      {/* Script Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-C9LWPQ44H7`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-C9LWPQ44H7', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
