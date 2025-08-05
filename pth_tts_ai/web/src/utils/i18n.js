import i18next from 'i18next';
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        debug: false,
        // resources: resources
    })

export const i18nStart = (lang, langData) => {
    Object.keys(langData).forEach(lang => {
        i18next.addResources(lang, 'translation', langData[lang]);
    });

    i18next.changeLanguage(lang);
}