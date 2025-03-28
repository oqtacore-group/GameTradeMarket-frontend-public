import { NextResponse, NextRequest } from 'next/server';
const PUBLIC_FILE = /\.(.*)$/;
export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('api') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return NextResponse.next();
  }

  // if (req.nextUrl.pathname.startsWith('/blog')) {
  //   const blogPath = req.nextUrl.pathname.replace('/blog', '');
  //   console.log('blogPath', blogPath);
  //   console.log('req.nextUrl.search', req.nextUrl.search);
  //
  //   const wordpressURL = new URL(`http://52.0.128.24${blogPath}${req.nextUrl.search}`);
  //
  //   console.log('wordpressURL', wordpressURL);
  //   const wordpressResponse = await fetch(wordpressURL.toString());
  //
  //   return new NextResponse(wordpressResponse.body, {
  //     status: wordpressResponse.status,
  //     headers: {
  //       ...Object.fromEntries(wordpressResponse.headers),
  //       'Content-Location': `https://gametrade.market/blog${req.nextUrl.pathname}${req.nextUrl.search}`,
  //     },
  //   });
  // }
  // if (req.nextUrl.locale === 'default') {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en';
  //
  //   return NextResponse.redirect(
  //     new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
  //   );
  // }
}
