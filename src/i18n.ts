import { createI18n } from 'vue-i18n';
import es from './locales/es.json';

const messages = {
    en: { },
    es: {...es},
};

const i18n = createI18n({
    locale: 'es',
    fallbackLocale: 'es',
    messages,
});

export default i18n;