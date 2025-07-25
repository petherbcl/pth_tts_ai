
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector';

import langData from '../lang/lang.json';

let resources = {};
Object.keys(langData).forEach(lang => {
    resources[lang] = {
        translation: langData[lang]
    };
});

console.log("i18n resources:", resources);

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        // debug: true,
        resources: resources
    })
