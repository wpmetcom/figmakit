import type { FigmaNode } from '@/core/figma';
import { richTextHtml, styleString } from '../../blockUtils';
import type { GutenbergBlock } from '../../types';
import { mapFigmaParagraph } from '../paragraph';
export function createHeadingBlock(node: FigmaNode): GutenbergBlock {
	const content = node.text?.characters ?? node.characters ?? '';
	const mapped = mapFigmaParagraph(node);
	const explicitLevel = node.pluginData?.['figmakit:heading-level'];
	const nameLevel = /(?:^|:)h([1-6])(?:[:]|$)/i.exec(node.name ?? '')?.[1];
	const level = Number(explicitLevel ?? nameLevel ?? 2);
	const attributes = { ...mapped.attributes, content, level };
	return {
		name: 'core/heading',
		attributes,
		serializedAttributes: Object.fromEntries(
			Object.entries(attributes).filter(
				([key, value]) =>
					key !== 'content' && !(key === 'level' && value === 2)
			)
		),
		innerBlocks: [],
		sourceNodeId: node.id,
		render: () => {
			const style = styleString(mapped.styles);
			const classes = ['wp-block-heading'];
			if (mapped.attributes.align)
				classes.push(`has-text-align-${mapped.attributes.align}`);
			if (
				(
					mapped.attributes.style as
						| { color?: { text?: string } }
						| undefined
				)?.color?.text
			)
				classes.push('has-text-color');
			return `<h${level} class="${classes.join(' ')}"${style ? ` style="${style}"` : ''}>${richTextHtml(node)}</h${level}>`;
		},
	};
}
