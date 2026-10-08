// This code runs in Figma's plugin sandbox
// It has access to the Figma API but no browser/DOM APIs

import { makePostMessageSafe, serializeNode } from './serializer';
import { resolveImageAssets } from './assets/resolveImageAssets';

figma.showUI(__html__, { width: 440, height: 720, themeColors: true });

// Listen for messages from the UI
figma.ui.onmessage = async (msg) => {
	if (msg.type === 'get-figma-nodes') {
		console.log('msg received in UI #1:', msg);
		try {
			// Get only selected nodes
			const selection = figma.currentPage.selection;
			console.log('selection:', selection);

			if (!selection || selection.length === 0) {
				figma.ui.postMessage({
					type: 'error',
					message:
						'No nodes selected. Please select one or more nodes.',
				});
				return;
			}

			const serializedNodes = selection.map((node) =>
				serializeNode(node)
			);
			await resolveImageAssets(serializedNodes);
			const nodes = makePostMessageSafe(serializedNodes);
			console.log('nodes serialized in UI #2:', selection);

			// Send back to UI
			figma.ui.postMessage({
				type: 'figma-nodes-data',
				nodes: nodes,
			});
		} catch (error) {
			figma.ui.postMessage({
				type: 'error',
				message:
					error instanceof Error
						? error.message
						: 'Failed to read nodes',
			});
		}
	}
};
