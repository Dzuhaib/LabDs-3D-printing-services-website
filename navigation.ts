import {createNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de'],
  defaultLocale: 'de',
  localePrefix: 'as-needed',

  pathnames: {
    '/': '/',
    '/products': '/produkte',
    '/request': '/anfrage',
    '/about': '/ueber-uns',
    '/contact': '/kontakt',
    '/imprint': '/impressum',
    '/privacy': '/datenschutz',
    '/products/[slug]': '/produkte/[slug]'
  }
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
