import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Product, WithContext } from 'schema-dts';

import { IMetaTags } from '../interfaces';

const HeadComponent = ({
  metaTags,
  googleProductInformationJSONLD,
}: {
  metaTags: IMetaTags;
  googleProductInformationJSONLD?: WithContext<Product>;
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const lang = router.locale === router.defaultLocale ? '' : '/' + router.locale;
  return (
    <Head>
      {/* eslint-disable-next-line */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KJCB6DD');`,
        }}
      />
      <title>
        {metaTags && metaTags.title
          ? `GameTradeMarket | ${t(metaTags.title)}`
          : 'GameTradeMarket | NFT in-game items marketplace'}
        {lang ? ' (' + router.locale?.toUpperCase() + ')' : ''}
      </title>
      <meta
        key="description"
        name="description"
        content={
          metaTags && metaTags.description
            ? t(metaTags.description)
            : 'Discover, buy, sell and trade in-game NFTs. GameTrade is a specialized and convenient marketplace for trading virtual in-game NFTs.'
        }
      />
      {process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === '1' ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        ''
      )}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/x-icon" href="https://gametrade.market/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://gametrade.market/apple-touch-icon.png"
      />
      <link rel="manifest" href="https://gametrade.market/site.webmanifest" />
      {metaTags && (
        <>
          <meta key="og:type" property="og:type" content={'website'} />
          <meta key="og:title" property="og:title" content={t(metaTags.ogTitle)} />
          <meta
            key="og:description"
            property="og:description"
            content={t(metaTags.ogDescription)}
          />
          <meta
            key="og:url"
            property="og:url"
            content={`https://gametrade.market${lang}${
              metaTags?.host?.split('&')[0] || router.pathname
            }`}
          />
          <meta key="og:image" property="og:image" content={metaTags.ogImage} />
          <meta key="og:locale" property="og:locale" content={router.locale} />
          <meta key="og:site_name" property="og:site_name" content="Gametrade Market" />
          <meta key="twitter:type" name="twitter:type" content={'website'} />
          <meta key="twitter:title" name="twitter:title" content={t(metaTags.ogTitle)} />
          <meta
            key="twitter:description"
            name="twitter:description"
            content={t(metaTags.ogDescription)}
          />
          <meta
            key="twitter:url"
            name="twitter:url"
            content={`https://gametrade.market${lang}${
              metaTags?.host?.split('&')[0] || router.pathname
            }`}
          />
          <meta key="twitter:image" name="twitter:image" content={metaTags.ogImage} />
          <meta key="twitter:card" name="twitter:card" content={'summary'} />
        </>
      )}
      <link
        rel="canonical"
        href={`https://gametrade.market${lang}${metaTags?.host?.split('&')[0] || router.pathname}`}
      />
      {router && (
        <>
          <meta httpEquiv="content-language" content={router.locale} />
          <link
            rel="alternate"
            hrefLang="x-default"
            href={`https://${
              process.env.NEXT_PUBLIC_PATHNAME_PREFIX ? process.env.NEXT_PUBLIC_PATHNAME_PREFIX : ''
            }gametrade.market${lang}${metaTags?.host?.split('&')[0] || router.pathname}`}
          />
        </>
      )}
      {router &&
        router.locales &&
        router.locales.map((locale: string) => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={`https://${
              process.env.NEXT_PUBLIC_PATHNAME_PREFIX ? process.env.NEXT_PUBLIC_PATHNAME_PREFIX : ''
            }gametrade.market/${locale}${metaTags?.host?.split('&')[0] || router.pathname}`}
          />
        ))}
      {googleProductInformationJSONLD && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `${JSON.stringify(googleProductInformationJSONLD)}`,
          }}
        />
      )}
      <meta name="google-site-verification" content="b81f3sOC6yK94uq-Vd7OjlW23d6TyvjLKPC1cRgd5p8" />
      {/*<Script*/}
      {/*  id={'google-tag-manager'}*/}
      {/*  strategy={'beforeInteractive'}*/}
      {/*  dangerouslySetInnerHTML={{*/}
      {/*    __html: `*/}
      {/*          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':*/}
      {/*          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],*/}
      {/*          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=*/}
      {/*          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);*/}
      {/*          })(window,document,'script','dataLayer','GTM-KJCB6DD');*/}
      {/*        `,*/}
      {/*  }}*/}
      {/*/>*/}
    </Head>
  );
};

export default HeadComponent;
