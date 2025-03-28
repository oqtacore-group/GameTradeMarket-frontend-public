import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { IMetaTags } from '../interfaces';

const HeadComponent = ({ metaTags }: { metaTags: IMetaTags }) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>
          {metaTags && metaTags.title
            ? `GameTradeMarket - ${t(metaTags.title)}`
            : 'GameTradeMarket'}
        </title>
        {metaTags && metaTags.description && (
          <meta key="description" name="description" content={t(metaTags.description)} />
        )}
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
        <link rel="manifest" href="site.webmanifest" />
        {metaTags && (
          <>
            <meta key="og:type" name="og:type" content={'website'} />
            <meta key="og:title" name="og:title" content={t(metaTags.ogTitle)} />
            <meta key="og:description" name="og:description" content={t(metaTags.ogDescription)} />
            <meta key="og:url" name="og:url" content={metaTags.ogUrl} />
            <meta key="og:image" name="og:image" content={metaTags.ogImage} />

            <meta key="twitter:type" name="og:type" content={'website'} />
            <meta key="twitter:title" name="og:title" content={t(metaTags.ogTitle)} />
            <meta
              key="twitter:description"
              name="og:description"
              content={t(metaTags.ogDescription)}
            />
            <meta key="twitter:url" name="og:url" content={metaTags.ogUrl} />
            <meta key="twitter:image" name="og:image" content={metaTags.ogImage} />
          </>
        )}
        {router &&
          router.locales &&
          router.locales.map((locale: string) => (
            <link
              key={locale}
              rel="alternate"
              hrefLang={locale}
              href={`${
                metaTags?.host ||
                `https://admin.${
                  process.env.NEXT_PUBLIC_PATHNAME_PREFIX
                    ? process.env.NEXT_PUBLIC_PATHNAME_PREFIX
                    : ''
                }gametrade.market`
              }/${locale}${router.pathname}`}
            />
          ))}
        {router && (
          <link
            rel="alternate"
            hrefLang="x-default"
            href={`${
              metaTags?.host ||
              `https://admin.${
                process.env.NEXT_PUBLIC_PATHNAME_PREFIX
                  ? process.env.NEXT_PUBLIC_PATHNAME_PREFIX
                  : ''
              }gametrade.market`
            }${router.pathname}`}
          />
        )}
      </Head>
      <Script
        id={'google-tag-manager'}
        strategy={'beforeInteractive'}
        dangerouslySetInnerHTML={{
          __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-KJCB6DD');
              `,
        }}
      />
    </>
  );
};

export default HeadComponent;
