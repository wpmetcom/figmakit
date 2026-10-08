import type { FigmaNode } from '@/core/figma';

function detectMimeType(bytes: Uint8Array): string {
	if (bytes[0] === 0xff && bytes[1] === 0xd8) return 'image/jpeg';
	if (bytes[0] === 0x89 && bytes[1] === 0x50) return 'image/png';
	if (String.fromCharCode(...bytes.slice(0, 4)) === 'GIF8')
		return 'image/gif';
	if (String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP')
		return 'image/webp';
	return 'application/octet-stream';
}

export async function resolveImageAssets(nodes: FigmaNode[]): Promise<void> {
	const cache = new Map<string, string>();
	const visit = async (node: FigmaNode): Promise<void> => {
		for (const fill of node.fills ?? []) {
			if (fill.type !== 'IMAGE' || !fill.imageHash) continue;
			let dataUrl = cache.get(fill.imageHash);
			if (!dataUrl) {
				const image = figma.getImageByHash(fill.imageHash);
				if (!image) continue;
				const bytes = await image.getBytesAsync();
				dataUrl = `data:${detectMimeType(bytes)};base64,${figma.base64Encode(bytes)}`;
				cache.set(fill.imageHash, dataUrl);
			}
			fill.imageRef = dataUrl;
		}
		await Promise.all((node.children ?? []).map(visit));
	};
	await Promise.all(nodes.map(visit));
}
