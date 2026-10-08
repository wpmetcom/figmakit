export interface ElementorElement {
	id: string;
	settings: Record<string, unknown>;
	elements: ElementorElement[];
	isInner: boolean;
	widgetType?: string;
	elType: 'widget' | 'container';
}

export interface ElementorPage {
	content: ElementorElement[];
	page_settings: Record<string, unknown>;
	version: string;
	title: string;
	type: 'page';
}

export interface ElementorDimension {
	unit: string;
	size: number;
	sizes: unknown[];
}

export interface ElementorLink {
	url: string;
	is_external: string;
	nofollow: string;
}

export interface ElementorBox {
	unit: string;
	top: string;
	right: string;
	bottom: string;
	left: string;
	isLinked: boolean;
}

export interface HeadingWidgetSettings extends Record<string, unknown> {
	title?: string;
	link?: ElementorLink;
	size?: 'default' | 'small' | 'medium' | 'large' | 'xl' | 'xxl';
	header_size?: string;
	align?: string;
	typography_typography?: string;
	typography_font_family?: string;
	typography_font_size?: ElementorDimension;
	typography_font_weight?: string;
	typography_text_transform?: string;
	typography_font_style?: string;
	typography_text_decoration?: string;
	typography_line_height?: ElementorDimension;
	typography_letter_spacing?: ElementorDimension;
	title_color?: string;
	blend_mode?: string;
}

export interface ImageWidgetSettings extends Record<string, unknown> {
	image?: { url: string; id: string };
	image_size?: string;
	width?: ElementorDimension;
	height?: ElementorDimension;
	object_fit?: string;
	'object-fit'?: string;
	'object-position'?: string;
	align?: string;
	space?: ElementorDimension;
	image_border_radius?: ElementorBox;
	image_border_border?: string;
	image_border_width?: ElementorBox;
	image_border_color?: string;
	opacity?: ElementorDimension;
}

export interface TextEditorWidgetSettings extends Record<string, unknown> {
	editor?: string;
	align?: string;
	text_color?: string;
	typography_typography?: string;
	typography_font_family?: string;
	typography_font_size?: ElementorDimension;
	typography_font_weight?: string;
	typography_font_style?: string;
	typography_line_height?: ElementorDimension;
	typography_letter_spacing?: ElementorDimension;
}

export interface ButtonWidgetSettings extends Record<string, unknown> {
	text?: string;
	link?: ElementorLink;
	align?: string;
	button_text_color?: string;
	background_color?: string;
	border_radius?: ElementorBox;
	typography_typography?: string;
	typography_font_size?: ElementorDimension;
	typography_font_family?: string;
	typography_font_weight?: string;
	typography_line_height?: ElementorDimension;
	typography_letter_spacing?: ElementorDimension;
	text_padding?: ElementorBox;
	border_border?: string;
	border_width?: ElementorBox;
	border_color?: string;
}

export interface TextEditorWidgetSettings extends Record<string, unknown> {
	editor?: string;
	align?: string;
	text_color?: string;
	typography_typography?: string;
	typography_font_family?: string;
	typography_font_size?: ElementorDimension;
	typography_font_weight?: string;
}

export interface ButtonWidgetSettings extends Record<string, unknown> {
	text?: string;
	link?: ElementorLink;
	align?: string;
	button_text_color?: string;
	background_color?: string;
	border_radius?: ElementorBox;
	typography_typography?: string;
	typography_font_size?: ElementorDimension;
}

export interface ContainerWidgetSettings extends Record<string, unknown> {
	content_position?: string;
	content_width?: 'boxed' | 'full';
	width?: ElementorDimension;
	min_height?: ElementorDimension;
	flex_direction?: string;
	flex_wrap?: string;
	flex_align_items?: string;
	flex_justify_content?: string;
	flex_gap?: {
		size: number;
		column: string;
		row: string;
		unit: string;
		isLinked: boolean;
	};
	padding?: ElementorBox;
	background_background?: string;
	background_color?: string;
	border_radius?: ElementorBox;
	border_border?: string;
	border_width?: ElementorBox;
	border_color?: string;
	box_shadow_box_shadow_type?: 'yes';
	box_shadow_box_shadow?: {
		horizontal: number;
		vertical: number;
		blur: number;
		spread: number;
		color: string;
	};
	overflow?: 'hidden' | 'visible';
}

export type ElementorWidgetFactory = (
	data: unknown,
	depth?: number
) => ElementorElement;
