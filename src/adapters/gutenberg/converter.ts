import type { FigmaNode } from '@/core/figma';
import { nodeWidth } from './blockUtils';
import {
	createColumnBlock,
	createColumnsBlock,
	createButtonsBlock,
	createGroupBlock,
	createHeadingBlock,
	createImageBlock,
	createParagraphBlock,
} from './blocks';
import type { GutenbergBlock } from './types';

function isImage(node: FigmaNode): boolean {
	return (
		node.type === 'IMAGE' ||
		Boolean(node.fills?.some((fill) => fill.type === 'IMAGE'))
	);
}

function isHorizontal(node: FigmaNode): boolean {
	return (node.frame?.layoutMode ?? node.layoutMode) === 'HORIZONTAL';
}

export function convertFigmaNodeToGutenberg(node: FigmaNode): GutenbergBlock[] {
	if (node.visible === false) return [];
	const explicitRole = node.pluginData?.['figmakit:role'];
	const directChildren =
		node.children?.filter((child) => child.visible !== false) ?? [];
	const looksLikeButton =
		explicitRole === 'button' ||
		(directChildren.length === 1 &&
			directChildren[0]?.type === 'TEXT' &&
			Boolean(node.fills?.some((fill) => fill.type === 'SOLID')) &&
			Boolean(
				(node.frame?.paddingTop ?? node.paddingTop ?? 0) ||
				(node.frame?.paddingLeft ?? node.paddingLeft ?? 0)
			));
	if (looksLikeButton) return [createButtonsBlock(node)];
	if (node.type === 'TEXT') {
		const size =
			typeof node.text?.fontSize === 'number'
				? node.text.fontSize
				: node.fontSize;
		return [
			size && size > 18
				? createHeadingBlock(node)
				: createParagraphBlock(node),
		];
	}
	if (isImage(node)) return [createImageBlock(node)];

	const children =
		node.children?.filter((child) => child.visible !== false) ?? [];
	if (isHorizontal(node) && children.length) {
		const parentWidth = nodeWidth(node);
		const columns = children.map((child) =>
			createColumnBlock(
				child,
				convertFigmaNodeToGutenberg(child),
				parentWidth
			)
		);
		return [createColumnsBlock(node, columns)];
	}

	const blocks = children.flatMap(convertFigmaNodeToGutenberg);
	return blocks.length ? [createGroupBlock(node, blocks)] : [];
}

export function convertFigmaNodesToGutenberg(
	nodes: FigmaNode | FigmaNode[]
): GutenbergBlock[] {
	return (Array.isArray(nodes) ? nodes : [nodes]).flatMap(
		convertFigmaNodeToGutenberg
	);
}
