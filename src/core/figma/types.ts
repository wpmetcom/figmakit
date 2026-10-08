export interface FigmaColor {
	r: number;
	g: number;
	b: number;
}

export interface FigmaFill {
	type: string;
	color?: FigmaColor;
	imageRef?: string;
	imageHash?: string;
	scaleMode?: string;
}

export interface FigmaEffect {
	type: string;
	visible?: boolean;
	radius?: number;
	offset?: { x: number; y: number };
	spread?: number;
	color?: FigmaColor & { a?: number };
}

export interface FigmaTextData {
	characters: string;
	fontSize?: number | symbol;
	fontName?: { family: string; style: string } | symbol;
	fontWeight?: number | symbol;
	lineHeight?: { unit: string; value?: number } | symbol;
	letterSpacing?: { unit: string; value: number } | symbol;
	textAlignHorizontal?: string;
	textCase?: string | symbol;
	textDecoration?: string | symbol;
	hyperlink?: { type: string; value?: string } | null | symbol;
	fills?: FigmaFill[] | symbol;
	segments?: FigmaTextSegment[];
}

export interface FigmaTextSegment {
	characters: string;
	start: number;
	end: number;
	fontSize?: number;
	fontName?: { family: string; style: string };
	fontWeight?: number;
	textDecoration?: string;
	textCase?: string;
	fills?: FigmaFill[];
}

export interface FigmaFrameData {
	layoutMode?: string;
	layoutWrap?: string;
	primaryAxisSizingMode?: string;
	counterAxisSizingMode?: string;
	primaryAxisAlignItems?: string;
	counterAxisAlignItems?: string;
	paddingTop?: number;
	paddingRight?: number;
	paddingBottom?: number;
	paddingLeft?: number;
	itemSpacing?: number;
	clipsContent?: boolean;
	cornerRadius?: number | symbol;
	topLeftRadius?: number;
	topRightRadius?: number;
	bottomRightRadius?: number;
	bottomLeftRadius?: number;
}

export interface FigmaNode {
	id: string;
	type: string;
	name?: string;
	pluginData?: Record<string, string>;
	visible?: boolean;
	locked?: boolean;
	characters?: string;
	text?: FigmaTextData;
	frame?: FigmaFrameData;
	rectangle?: Pick<
		FigmaFrameData,
		| 'cornerRadius'
		| 'topLeftRadius'
		| 'topRightRadius'
		| 'bottomRightRadius'
		| 'bottomLeftRadius'
	>;
	style?: {
		fontSize?: number;
		fontFamily?: string;
		fontWeight?: number;
		textAlignHorizontal?: string;
		textCase?: string;
		lineHeightPx?: number;
		letterSpacing?: number;
		textDecoration?: string;
	};
	fontName?: { family: string; style: string };
	fontSize?: number;
	textAlignHorizontal?: string;
	textCase?: string;
	textDecoration?: string;
	lineHeight?: { unit: string; value: number };
	letterSpacing?: number;
	fills?: FigmaFill[];
	strokes?: FigmaFill[];
	strokeWeight?: number;
	opacity?: number;
	blendMode?: string;
	effects?: FigmaEffect[];
	absoluteBoundingBox?: { width?: number; height?: number };
	width?: number;
	height?: number;
	cornerRadius?: number;
	rectangleCornerRadii?: [number, number, number, number];
	paddingTop?: number;
	paddingRight?: number;
	paddingBottom?: number;
	paddingLeft?: number;
	layoutMode?: string;
	primaryAxisAlignItems?: string;
	counterAxisAlignItems?: string;
	itemSpacing?: number;
	children?: FigmaNode[];
}
