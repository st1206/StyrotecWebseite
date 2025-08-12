# AGENTS.md - SvelteKit Frontend Development Guide

## Build/Test/Lint Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run check` - Type check with svelte-check
- `npm run lint` - Run prettier check and eslint
- `npm run format` - Format code with prettier
- No test framework configured - verify changes manually

## Code Style & Conventions

- **Formatting**: Uses tabs, single quotes, no trailing commas, 100 char width
- **TypeScript**: Strict mode enabled, use proper types for all props and functions
- **Imports**: Use `$lib/` alias for library imports, relative imports for local files
- **Naming**: camelCase for variables/functions, PascalCase for components, kebab-case for files
- **Components**: Use Svelte 5 syntax with `$props()`, `$bindable()`, and `{@render children?.()}`
- **Styling**: TailwindCSS with tailwind-variants for component variants, use `cn()` utility
- **Error Handling**: Use SvelteKit's `error()` function, handle image errors with `handleImageError()`
- **i18n**: Use svelte-i18n with `$_()` for translations, support de/en locales
- **Forms**: Use sveltekit-superforms with Zod validation schemas
- **Icons**: Import from `$lib/assets/icons` index, use `getIconComponent()` helper

## Architecture Notes

- SvelteKit app with Vercel adapter, uses `+page.server.ts` for server-side logic
- CMS integration with Strapi, types in `src/lib/cmsTypes/`
- Internationalized routing with `[lang]` parameter
- Component library in `src/lib/components/ui/` following shadcn/ui patterns
