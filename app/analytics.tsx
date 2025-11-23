'use client';

import Script from "next/script";


export default function Analytics() {
   

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
