import {
	ChevronLeft,
	ChevronRight,
	CircleAlert,
	CircleCheckBig,
	Clock,
	CopyrightIcon,
	Download,
	Globe,
	Instagram,
	Linkedin,
	LoaderCircle,
	Mail,
	Menu,
	Plus,
	Search,
	Send,
	ShoppingBag,
	Store,
	X,
	Youtube,
	type Icon as LucideIcon
} from 'lucide-svelte';
import LogoLight from './logo_light.png';
import LogoDark from './logo_dark.png';
import PrintingIcon from './3d-printing.svelte';
import ArtIndustryIcon from './creativity.svelte';
import AutomotiveIndustryIcon from './automotive.svelte';
import ModelMakingIndustryIcon from './3d.svelte';
import AerospaceIndustryIcon from './aerospace-industry.svelte';
import ConcreteIndustryIcon from './construction-truck.svelte';
import PlasticsIndustryIcon from './recycle.svelte';
import ShipBuildingIndustryIcon from './shipping.svelte';
import AlgoliaLogo from './algolia-logo.svelte';

export type Icon = LucideIcon;

export const Icons = {
	algoliaLogo: AlgoliaLogo,
	logoLight: LogoLight,
	logoDark: LogoDark,
	adIndustry: PrintingIcon,
	artIndustry: ArtIndustryIcon,
	automotiveIndustry: AutomotiveIndustryIcon,
	modelMakingIndustry: ModelMakingIndustryIcon,
	aerospaceIndustry: AerospaceIndustryIcon,
	concreteIndustry: ConcreteIndustryIcon,
	plasticsIndustry: PlasticsIndustryIcon,
	shipBuildingIndustry: ShipBuildingIndustryIcon,
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
	menu: Menu,
	chevronLeft: ChevronLeft,
	chevronRight: ChevronRight,
	download: Download,
	mail: Mail,
	send: Send,
	error: CircleAlert,
	check: CircleCheckBig,
	time: Clock
};
