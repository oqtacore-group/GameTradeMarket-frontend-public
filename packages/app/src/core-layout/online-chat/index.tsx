import React from 'react';
import Script from 'next/script';

export const OnlineChat = () => {
  return (
    <Script
      id={'tawk-script-js'}
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/61a0c8e253b398095a663837/1fle11da1';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
                })();
              `,
      }}
    />
  );
};
