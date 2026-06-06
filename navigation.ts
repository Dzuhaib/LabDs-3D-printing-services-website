import {createNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de'],

  // Used when no locale matches
  defaultLocale: 'de',
  localePrefix: 'always',

  pathnames: {
    '/': '/',
    '/products': {
      en: '/products',
      de: '/produkte'
    },
    '/request': {
      en: '/request',
      de: '/anfrage'
    },
    '/about': {
      en: '/about',
      de: '/ueber-uns'
    },
    '/contact': {
      en: '/contact',
      de: '/kontakt'
    }
  }
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
