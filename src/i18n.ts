import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import english from './locales/en/translation.json';
import romanian from './locales/ro/translation.json';
import ukrainian from './locales/ua/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
    resources: {
      en: {
        translation: english
      },
      ua: {
        translation: ukrainian
      },
      ro: {
        translation: romanian
      }
    },
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;