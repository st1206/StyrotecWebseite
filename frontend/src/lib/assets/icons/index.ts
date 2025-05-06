import {
	CopyrightIcon,
	Globe,
	Instagram,
	Linkedin,
	LoaderCircle,
	Menu,
	Plus,
	Search,
	ShoppingBag,
	Store,
	X,
	Youtube,
	type Icon as LucideIcon
} from 'lucide-svelte';
import LogoLight from './logo_light.png';
import LogoDark from './logo_dark.png';
import printingIcon from './3d-printing.svelte';
import artIndustryIcon from './creativity.svelte';
import automotiveIndustryIcon from './automotive.svelte';
import modelMakingIndustryIcon from './3d.svelte';
import aerospaceIndustryIcon from './aerospace-industry.svelte';
import concreteIndustryIcon from './construction-truck.svelte';
import plasticsIndustryIcon from './recycle.svelte';
import shipBuildingIndustryIcon from './shipping.svelte';

export type Icon = LucideIcon;

export const Icons = {
	logoLight: LogoLight,
	logoDark: LogoDark,
	adIndustry: printingIcon,
	artIndustry: artIndustryIcon,
	automotiveIndustry: automotiveIndustryIcon,
	modelMakingIndustry: modelMakingIndustryIcon,
	aerospaceIndustry: aerospaceIndustryIcon,
	concreteIndustry: concreteIndustryIcon,
	plasticsIndustry: plasticsIndustryIcon,
	shipBuildingIndustry: shipBuildingIndustryIcon,
	plus: Plus,
	spinner: LoaderCircle,
	copyright: CopyrightIcon,
	bag: ShoppingBag,
	store: Store,
	globe: Globe,
	search: Search,
	instagram: Instagram,
	linkedIn: Linkedin,
	youtube: Youtube,
	X: X,
	menu: Menu
};
