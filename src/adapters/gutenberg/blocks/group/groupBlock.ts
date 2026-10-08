import type { FigmaNode } from '@/core/figma';
import type { GutenbergBlock } from '../../types';
export function createGroupBlock(
	node: FigmaNode,
	blocks: GutenbergBlock[]
): GutenbergBlock {
	return {
		name: 'core/group',
		attributes: {},
		innerBlocks: blocks,
		sourceNodeId: node.id,
		render: (inner) =>
			`<div class="wp-block-group">${inner ? `\n${inner}\n` : ''}</div>`,
	};
}
