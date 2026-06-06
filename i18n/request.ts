import {getRequestConfig} from 'next-intl/server';
import {routing} from '../navigation';

export default getRequestConfig(async ({locale}) => {
  // Ensure we use the locale from the argument or the default
  const activeLocale = locale || routing.defaultLocale;

  return {
    locale: activeLocale,
    messages: (await import(`../messages/${activeLocale}.json`)).default
  };
});
