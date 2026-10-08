import type { FigmaNode } from '@/core/figma';
import { escapeAttribute, styleString } from '../../blockUtils';
import type { GutenbergBlock } from '../../types';
import { mapFigmaImage } from './imageMapper';

export function createImageBlock(node: FigmaNode): GutenbergBlock {
	const image = mapFigmaImage(node);
	return {
		name: 'core/image',
		attributes: image.attributes,
		serializedAttributes: Object.fromEntries(
			Object.entries(image.attributes).filter(
				([key]) => !['url', 'alt'].includes(key)
			)
		),
		innerBlocks: [],
		sourceNodeId: node.id,
		render: () => {
			const style = styleString({
				width: image.width ? `${Math.round(image.width)}px` : undefined,
				height: image.height
					? `${Math.round(image.height)}px`
					: undefined,
			});
			return `<figure class="wp-block-image"><img src="${escapeAttribute(image.url)}" alt="${escapeAttribute(image.alt)}"${style ? ` style="${style}"` : ''}/></figure>`;
		},
	};
}
