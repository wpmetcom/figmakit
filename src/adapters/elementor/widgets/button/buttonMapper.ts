import type { FigmaNode } from '@/core/figma';
import type { ButtonWidgetSettings } from '../../types';
import { box, dimension, firstSolidColor, nodeRadius } from '../mappingUtils';

export function mapFigmaButton(node: FigmaNode): Partial<ButtonWidgetSettings> {
	const label = node.children?.find((child) => child.type === 'TEXT');
	const size =
		typeof label?.text?.fontSize === 'number' ? label.text.fontSize : 14;
	const frame = node.frame;
	const fontName =
		typeof label?.text?.fontName === 'object'
			? label.text.fontName
			: undefined;
	const lineHeight =
		typeof label?.text?.lineHeight === 'object'
			? label.text.lineHeight
			: undefined;
	const letterSpacing =
		typeof label?.text?.letterSpacing === 'object'
			? label.text.letterSpacing
			: undefined;
	const borderColor = firstSolidColor(node.strokes);
	return {
		text:
			label?.text?.characters ??
			label?.characters ??
			node.name ??
			'Button',
		link: { url: '', is_external: '', nofollow: '' },
		align: undefined,
		background_color: firstSolidColor(node.fills),
		button_text_color: firstSolidColor(label?.text?.fills ?? label?.fills),
		border_radius: nodeRadius(node),
		typography_typography: 'custom',
		typography_font_size: dimension(size),
		typography_font_family: fontName?.family,
		typography_font_weight:
			typeof label?.text?.fontWeight === 'number'
				? String(label.text.fontWeight)
				: undefined,
		typography_line_height:
			lineHeight?.value !== undefined
				? dimension(
						lineHeight.unit === 'PERCENT'
							? lineHeight.value / 100
							: lineHeight.value,
						lineHeight.unit === 'PERCENT' ? 'em' : 'px'
					)
				: undefined,
		typography_letter_spacing: letterSpacing
			? dimension(
					letterSpacing.value,
					letterSpacing.unit === 'PERCENT' ? '%' : 'px'
				)
			: undefined,
		text_padding: box(
			frame?.paddingTop ?? node.paddingTop ?? 0,
			frame?.paddingRight ?? node.paddingRight ?? 0,
			frame?.paddingBottom ?? node.paddingBottom ?? 0,
			frame?.paddingLeft ?? node.paddingLeft ?? 0
		),
		border_border: borderColor && node.strokeWeight ? 'solid' : undefined,
		border_width:
			borderColor && node.strokeWeight
				? box(
						node.strokeWeight,
						node.strokeWeight,
						node.strokeWeight,
						node.strokeWeight
					)
				: undefined,
		border_color: borderColor,
	};
}
