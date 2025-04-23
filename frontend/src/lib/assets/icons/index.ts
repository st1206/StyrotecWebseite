import {
	CopyrightIcon,
	Globe,
	LoaderCircle,
	Plus,
	ShoppingBag,
	Store,
	type Icon as LucideIcon
} from 'lucide-svelte';
import LogoLight from './logo_light.png';
import LogoDark from './logo_dark.png';

export type Icon = LucideIcon;

export const Icons = {
	logoLight: LogoLight,
	logoDark: LogoDark,
	plus: Plus,
	spinner: LoaderCircle,
	copyright: CopyrightIcon,
	bag: ShoppingBag,
	store: Store,
	globe: Globe
};
