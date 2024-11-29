export type Locale = (typeof locales)[number];

export const locales = ['EN', 'KM', 'MY', 'TH', 'ZH-CN'] as string[];
export const defaultLocale: Locale = 'EN';