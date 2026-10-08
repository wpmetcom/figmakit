import type { FigmaNode } from '@/core/figma';
import { richTextHtml, styleString } from '../../blockUtils';
import type { GutenbergBlock } from '../../types';
import { mapFigmaParagraph } from './paragraphMapper';

export function createParagraphBlock(node: FigmaNode): GutenbergBlock {
	const mapping = mapFigmaParagraph(node);
	return {
		name: 'core/paragraph',
		attributes: mapping.attributes,
		serializedAttributes: Object.fromEntries(
			Object.entries(mapping.attributes).filter(
				([key]) => key !== 'content'
			)
		),
		innerBlocks: [],
		sourceNodeId: node.id,
		render: () => {
			const style = styleString(mapping.styles);
			const align =
				typeof mapping.attributes.align === 'string'
					? ` has-text-align-${mapping.attributes.align}`
					: '';
			const hasTextColor = Boolean(
				(
					mapping.attributes.style as
						| { color?: { text?: string } }
						| undefined
				)?.color?.text
			);
			const classes = [align.trim(), hasTextColor ? 'has-text-color' : '']
				.filter(Boolean)
				.join(' ');
			return `<p${classes ? ` class="${classes}"` : ''}${style ? ` style="${style}"` : ''}>${richTextHtml(node).replace(/\n/g, '<br>')}</p>`;
		},
	};
}
