import { LoaderCircle, Plus, type Icon as LucideIcon } from 'lucide-svelte';

import Logo from '$lib/assets/images/Logo_weiseSchrift_orange.png';
import deDE from './de-DE.svelte';
import enUS from './en-US.svelte';

export type Icon = LucideIcon;

export const Icons = {
	logo: Logo,
	deDE: deDE,
	enUS: enUS,
	plus: Plus,
	spinner: LoaderCircle
};
