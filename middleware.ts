import createMiddleware from 'next-intl/middleware';
import {routing} from './navigation';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - api routes
    // - _next (build artifacts)
    // - _vercel (Vercel specific)
    // - static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Match all pathnames that start with a locale
    '/',
    '/(de|en)/:path*'
  ]
};
