import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import zh from './locales/zh.json';
import hi from './locales/hi.json';

// Define the fallback language and the supported languages
const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  fr: {
    translation: fr,
  },
  zh: {
    translation: zh,
  },
  hi: {
    translation: hi,
  },
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: 'en', // Initial language
    fallbackLng: 'en', // Fallback language
    resources,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Load language from AsyncStorage
i18n.on('languageChanged', async (lng) => {
  try {
    await AsyncStorage.setItem('language', lng);
  } catch (error) {
    console.error('Failed to save language preference', error);
  }
});

const loadLanguage = async () => {
  try {
    const language = await AsyncStorage.getItem('language');
    if (language) {
      i18n.changeLanguage(language);
    }
  } catch (error) {
    console.error('Failed to load language preference', error);
  }
};

loadLanguage();

export default i18n;
