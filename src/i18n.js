import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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
        translation: import('../public/locales/en/translation.json')
      },
      ua: {
        translation: import('../public/locales/ua/translation.json')
      },
      ro: {
        translation: import('../public/locales/ro/translation.json')
      }
    },
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;