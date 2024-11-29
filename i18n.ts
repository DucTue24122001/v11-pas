import {getRequestConfig} from 'next-intl/server';
import { getUserLocale } from './translations/services/locale';
import { defaultLocale, locales } from './config';
 
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await getUserLocale();

  if (!locales.includes(locale as any)) return {
    locale: defaultLocale,
    messages: (await import(`./translations/${defaultLocale}.json`)).default
  }
 
  return {
    locale,
    messages: (await import(`./translations/${locale}.json`)).default,
  };
});