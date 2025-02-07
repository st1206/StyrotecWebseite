import { register, init, getLocaleFromNavigator} from "svelte-i18n";


register('en', () => import('./lib/translations/en.json'));
register('de', () => import('./lib/translations/de.json'));

init({
    fallbackLocale: 'de',
    initialLocale: getLocaleFromNavigator(),
  });