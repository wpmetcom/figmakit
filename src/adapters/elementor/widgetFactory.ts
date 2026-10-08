import type { FigmaNode } from '@/core/figma';
import type { ElementorElement } from './types';
import {
	createContainerWidget,
	createHeadingWidget,
	createImageWidget,
	createButtonWidget,
	createTextEditorWidget,
	elementorWidgets,
	figmaMappers,
} from './widgets';
import { getWidgetTypeFromFigmaNode } from './config';

export function createWidgetFromFigmaNode(
	figmaNode: FigmaNode,
	depth = 0
): ElementorElement | null {
	const widgetType = isButtonNode(figmaNode)
		? 'button'
		: figmaNode.type === 'TEXT' && isBodyText(figmaNode)
			? 'textEditor'
			: getWidgetTypeFromFigmaNode(figmaNode.type);
	if (!widgetType || !(widgetType in elementorWidgets)) return null;

	const settings = figmaMappers[widgetType](figmaNode);

	switch (widgetType) {
		case 'heading':
			return createHeadingWidget(
				figmaNode.text?.characters ?? figmaNode.characters ?? 'Heading',
				settings,
				depth
			);
		case 'image':
			return createImageWidget(
				extractImageUrl(figmaNode),
				settings,
				depth
			);
		case 'container':
			return createContainerWidget(settings, depth);
		case 'button':
			return createButtonWidget(settings, depth);
		case 'textEditor':
			return createTextEditorWidget(settings, depth);
		default:
			return null;
	}
}

export function isButtonNode(node: FigmaNode): boolean {
	const explicitRole = node.pluginData?.['figmakit:role'];
	if (explicitRole) return explicitRole === 'button';
	const visibleChildren =
		node.children?.filter((child) => child.visible !== false) ?? [];
	const frame = node.frame;
	return (
		['FRAME', 'GROUP', 'COMPONENT', 'INSTANCE'].includes(node.type) &&
		visibleChildren.length === 1 &&
		visibleChildren[0]?.type === 'TEXT' &&
		Boolean(node.fills?.some((fill) => fill.type === 'SOLID')) &&
		Boolean(
			(frame?.paddingTop ?? node.paddingTop ?? 0) ||
			(frame?.paddingLeft ?? node.paddingLeft ?? 0)
		)
	);
}

function isBodyText(node: FigmaNode): boolean {
	const explicitRole = node.pluginData?.['figmakit:role'];
	if (explicitRole)
		return explicitRole === 'paragraph' || explicitRole === 'caption';
	const fontSize =
		typeof node.text?.fontSize === 'number'
			? node.text.fontSize
			: node.fontSize;
	return (
		/(^|:)(paragraph|body|caption|description|copy)(:|$)/i.test(
			node.name ?? ''
		) || Boolean(fontSize && fontSize <= 18)
	);
}

export function hasImageFill(figmaNode: FigmaNode): boolean {
	return Boolean(figmaNode.fills?.some((fill) => fill.type === 'IMAGE'));
}

export function extractImageUrl(figmaNode: FigmaNode): string {
	const imageFill = figmaNode.fills?.find((fill) => fill.type === 'IMAGE');
	return (
		imageFill?.imageRef ??
		(imageFill?.imageHash ? `figma-asset://${imageFill.imageHash}` : '')
	);
}
