import type { ConversionDiagnostic, ValidationResult } from '@/core/targets';
import type { GutenbergBlock, GutenbergDocument } from './types';

const supported = new Set([
	'core/column',
	'core/columns',
	'core/image',
	'core/paragraph',
	'core/group',
	'core/heading',
	'core/buttons',
	'core/button',
]);

export function validateGutenbergDocument(
	document: GutenbergDocument
): ValidationResult {
	const diagnostics: ConversionDiagnostic[] = [];
	const visit = (block: GutenbergBlock, parent?: GutenbergBlock) => {
		if (!supported.has(block.name))
			diagnostics.push({
				code: 'gutenberg.unsupported-block',
				message: `${block.name} is not supported.`,
				severity: 'error',
				sourceNodeId: block.sourceNodeId,
			});
		if (block.name === 'core/column' && parent?.name !== 'core/columns')
			diagnostics.push({
				code: 'gutenberg.orphan-column',
				message: 'core/column must be a direct child of core/columns.',
				severity: 'error',
				sourceNodeId: block.sourceNodeId,
			});
		if (block.name === 'core/button' && parent?.name !== 'core/buttons')
			diagnostics.push({
				code: 'gutenberg.orphan-button',
				message: 'core/button must be a direct child of core/buttons.',
				severity: 'error',
				sourceNodeId: block.sourceNodeId,
			});
		if (
			block.name === 'core/columns' &&
			block.innerBlocks.some((child) => child.name !== 'core/column')
		)
			diagnostics.push({
				code: 'gutenberg.invalid-columns-child',
				message: 'core/columns may contain only core/column blocks.',
				severity: 'error',
				sourceNodeId: block.sourceNodeId,
			});
		if (
			block.name === 'core/buttons' &&
			block.innerBlocks.some((child) => child.name !== 'core/button')
		)
			diagnostics.push({
				code: 'gutenberg.invalid-buttons-child',
				message: 'core/buttons may contain only core/button blocks.',
				severity: 'error',
				sourceNodeId: block.sourceNodeId,
			});
		if (
			block.name === 'core/image' &&
			typeof block.attributes.url !== 'string'
		)
			diagnostics.push({
				code: 'gutenberg.image-url-invalid',
				message: 'core/image requires a string URL.',
				severity: 'error',
				sourceNodeId: block.sourceNodeId,
			});
		if (
			block.name === 'core/image' &&
			!/^(https?:|data:image\/)/.test(String(block.attributes.url ?? ''))
		)
			diagnostics.push({
				code: 'gutenberg.image-url-unusable',
				message:
					'core/image URL must be HTTP(S) or embedded image data.',
				severity: 'error',
				sourceNodeId: block.sourceNodeId,
			});
		if (
			block.name === 'core/heading' &&
			(typeof block.attributes.level !== 'number' ||
				block.attributes.level < 1 ||
				block.attributes.level > 6)
		)
			diagnostics.push({
				code: 'gutenberg.heading-level-invalid',
				message: 'core/heading level must be between 1 and 6.',
				severity: 'error',
				sourceNodeId: block.sourceNodeId,
			});
		if (
			block.name === 'core/paragraph' &&
			typeof block.attributes.content !== 'string'
		)
			diagnostics.push({
				code: 'gutenberg.paragraph-content-invalid',
				message: 'core/paragraph requires string content.',
				severity: 'error',
				sourceNodeId: block.sourceNodeId,
			});
		for (const child of block.innerBlocks) visit(child, block);
	};
	for (const block of document.blocks) visit(block);
	if (!document.markup.trim() && document.blocks.length)
		diagnostics.push({
			code: 'gutenberg.markup-empty',
			message: 'Serialized block markup is empty.',
			severity: 'error',
		});
	return {
		valid: !diagnostics.some(({ severity }) => severity === 'error'),
		diagnostics,
	};
}
