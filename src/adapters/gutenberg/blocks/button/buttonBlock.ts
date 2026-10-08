import type { FigmaNode } from '@/core/figma';
import {
	escapeAttribute,
	escapeHtml,
	firstSolidColor,
	styleString,
} from '../../blockUtils';
import type { GutenbergBlock } from '../../types';
export function createButtonBlock(node: FigmaNode): GutenbergBlock {
	const child = node.children?.find(({ type }) => type === 'TEXT');
	const text =
		child?.text?.characters ?? child?.characters ?? node.name ?? 'Button';
	const background = firstSolidColor(node.fills);
	const textColor = firstSolidColor(child?.text?.fills ?? child?.fills);
	const radius =
		typeof node.frame?.cornerRadius === 'number'
			? node.frame.cornerRadius
			: node.cornerRadius;
	const hyperlink = child?.text?.hyperlink;
	const url =
		hyperlink && typeof hyperlink === 'object' && hyperlink.type === 'URL'
			? (hyperlink.value ?? '')
			: '';
	const styleAttribute: Record<string, unknown> = {};
	if (background || textColor)
		styleAttribute.color = { background, text: textColor };
	if (radius !== undefined) styleAttribute.border = { radius: `${radius}px` };
	return {
		name: 'core/button',
		attributes: {
			text,
			url,
			...(Object.keys(styleAttribute).length
				? { style: styleAttribute }
				: {}),
		},
		serializedAttributes: Object.keys(styleAttribute).length
			? { style: styleAttribute }
			: {},
		innerBlocks: [],
		sourceNodeId: node.id,
		render: () => {
			const style = styleString({
				'background-color': background,
				color: textColor,
				'border-radius':
					radius !== undefined ? `${radius}px` : undefined,
			});
			const classes = [
				'wp-block-button__link',
				'wp-element-button',
				background ? 'has-background' : '',
				textColor ? 'has-text-color' : '',
			]
				.filter(Boolean)
				.join(' ');
			return `<div class="wp-block-button"><a class="${classes}"${url ? ` href="${escapeAttribute(url)}"` : ''}${style ? ` style="${style}"` : ''}>${escapeHtml(text)}</a></div>`;
		},
	};
}
export function createButtonsBlock(node: FigmaNode): GutenbergBlock {
	return {
		name: 'core/buttons',
		attributes: {},
		innerBlocks: [createButtonBlock(node)],
		sourceNodeId: node.id,
		render: (inner) => `<div class="wp-block-buttons">\n${inner}\n</div>`,
	};
}
