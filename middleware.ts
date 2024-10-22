/////////////////////////////////
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// import {routing} from "@/i18n/routing";
// import createMiddleware from "next-intl/middleware";
//
//
//
// export async function middleware(req: NextRequest) {
//   const secret = process.env.NEXTAUTH_SECRET as string;
//   const salt = process.env.NEXTAUTH_SALT as string;
//
//   // Get the token with the salt for secure authentication
//   const token = await getToken({ req, secret, salt });
//   const { pathname } = req.nextUrl;
//
//   // Supported locales for internationalization
//   const supportedLocales = ['en', 'ru']; // Added 'de' to match the existing locales in the i18n configuration
//   const [locale] = pathname.split('/')[1];
//   const isIntlRoute = supportedLocales.includes([locale]);
//   const adjustedPathname = isIntlRoute ? pathname.slice([locale].length + 1) : pathname;
//
//   // Authorization checks for admin and customer routes
//   if (adjustedPathname.startsWith(`${[locale]}/admin`) && token?.role !== 'Administrator') {
//     return NextResponse.rewrite(
//         new URL(`/${[locale]}/auth/login?message=You Are Not Authorized!`, req.url)
//     );
//   }
//
//   if (adjustedPathname.startsWith(`${[locale]}/customer`) && token?.role !== 'Customer') {
//     return NextResponse.rewrite(
//         new URL(`/${[locale]}/auth/login?message=You Are Not Authorized!`, req.url)
//     );
//   }
//
//   return createMiddleware(routing)(req);
// }
//
// export const config = {
//   matcher: [
//     '/',
//     '/(en/|ru)/:path*',
//     '/((?!_next|_vercel|.*\\..*).*)'
//   ]
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';

export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET as string;
  const salt = process.env.NEXTAUTH_SALT as string;

  try {
    // Get the token with the salt for secure authentication
    const token = await getToken({ req, secret, salt });
    const { pathname } = req.nextUrl;

    // Supported locales for internationalization
    const supportedLocales = ['en', 'ru'];
    const locale = pathname.split('/')[1];
    const isIntlRoute = supportedLocales.includes(locale);
    const adjustedPathname = isIntlRoute
      ? pathname.slice(locale.length + 1)
      : pathname;

    // Ensure adjustedPathname is a string
    if (typeof adjustedPathname !== 'string') {
      throw new TypeError('adjustedPathname is not a string');
    }

    // Authorization checks for admin and customer routes
    if (
      adjustedPathname.startsWith(`${locale}/admin`) &&
      token?.role !== 'Administrator'
    ) {
      return NextResponse.rewrite(
        new URL(
          `/${locale}/auth/login?message=You Are Not Authorized!`,
          req.url
        )
      );
    }

    if (
      adjustedPathname.startsWith(`${locale}/customer`) &&
      token?.role !== 'Customer'
    ) {
      return NextResponse.rewrite(
        new URL(
          `/${locale}/auth/login?message=You Are Not Authorized!`,
          req.url
        )
      );
    }

    return createMiddleware(routing)(req);
  } catch (error) {
    return NextResponse.redirect(new URL('/error', req.url)); // Redirect to a custom error page
  }
}

export const config = {
  matcher: ['/', '/(en|ru)/:path*', '/((?!_next|_vercel|api|.*\\..*).*)']
};
