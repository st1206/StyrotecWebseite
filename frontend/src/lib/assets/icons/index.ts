import { LoaderCircle, Plus, type Icon as LucideIcon } from 'lucide-svelte';
import Logo from '$lib/assets/images/Logo_weiseSchrift_orange.png';

export type Icon = LucideIcon;

export const Icons = {
	logo: Logo,
	plus: Plus,
	spinner: LoaderCircle
};
