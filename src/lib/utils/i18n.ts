import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

// Register translation files
register('en', () => import('$lib/locales/en.json'));
register('fr', () => import('$lib/locales/fr.json'));

// Initialize the i18n library
init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
});
