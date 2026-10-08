import type { FigmaNode } from '@/core/figma';
import type { ImageWidgetSettings } from '../../types';
import {
	box,
	dimension,
	firstSolidColor,
	nodeHeight,
	nodeRadius,
	nodeWidth,
} from '../mappingUtils';

const objectFitMap: Record<string, string> = {
	FILL: 'cover',
	FIT: 'contain',
	CROP: 'cover',
	TILE: 'fill',
};

export function mapFigmaImageToImage(
	node: FigmaNode
): Partial<ImageWidgetSettings> {
	const settings: Partial<ImageWidgetSettings> = {
		image_size: 'full',
		align: 'start',
	};
	const image = node.fills?.find((fill) => fill.type === 'IMAGE');
	if (image) {
		settings.image = {
			url:
				image.imageRef ??
				(image.imageHash ? `figma://image/${image.imageHash}` : ''),
			id: '',
		};
		settings['object-fit'] = objectFitMap[image.scaleMode ?? ''] ?? '';
		settings['object-position'] = 'center center';
	}

	const width = nodeWidth(node);
	const height = nodeHeight(node);
	if (width) {
		settings.width = dimension(Math.round(width));
		settings.space = dimension(Math.round(width));
	}
	if (height) settings.height = dimension(Math.round(height));

	const radius = nodeRadius(node);
	if (radius) settings.image_border_radius = radius;

	const borderColor = firstSolidColor(node.strokes);
	if (borderColor && node.strokeWeight) {
		settings.image_border_border = 'solid';
		settings.image_border_width = box(
			node.strokeWeight,
			node.strokeWeight,
			node.strokeWeight,
			node.strokeWeight
		);
		settings.image_border_color = borderColor;
	}
	if (node.opacity !== undefined && node.opacity < 1) {
		settings.opacity = dimension(node.opacity, '');
	}
	return settings;
}
