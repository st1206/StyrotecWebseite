// See https://kit.svelte.dev/docs/types#app
declare global {
  namespace App {
    interface Locals {
      /** URL language prefix, e.g. 'de' — from the Directus languages registry */
      lang: string;
      /** full Directus language code, e.g. 'de-DE' */
      directusLang: string;
      preview?: boolean;
    }
    // interface Error {}
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
