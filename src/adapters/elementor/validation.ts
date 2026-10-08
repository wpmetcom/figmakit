import type { ConversionDiagnostic, ValidationResult } from '@/core/targets';
import type { ElementorElement, ElementorPage } from './types';

const elementIdPattern = /^[a-f0-9]{8}$/;
const supportedWidgets = new Set(['heading', 'image', 'button', 'text-editor']);

function validateElement(
	element: ElementorElement,
	seenIds: Set<string>,
	diagnostics: ConversionDiagnostic[]
): void {
	if (!elementIdPattern.test(element.id)) {
		diagnostics.push({
			code: 'elementor.invalid-element-id',
			message: `Element ID "${element.id}" must be eight hexadecimal characters.`,
			severity: 'error',
		});
	}
	if (seenIds.has(element.id)) {
		diagnostics.push({
			code: 'elementor.duplicate-element-id',
			message: `Element ID "${element.id}" is duplicated.`,
			severity: 'error',
		});
	}
	seenIds.add(element.id);

	if (element.elType === 'widget' && !element.widgetType) {
		diagnostics.push({
			code: 'elementor.missing-widget-type',
			message: `Widget "${element.id}" has no widgetType.`,
			severity: 'error',
		});
	}
	if (element.widgetType && !supportedWidgets.has(element.widgetType)) {
		diagnostics.push({
			code: 'elementor.unsupported-widget',
			message: `Widget type "${element.widgetType}" is not registered.`,
			severity: 'error',
		});
	}
	if (element.elType === 'container' && element.widgetType) {
		diagnostics.push({
			code: 'elementor.container-widget-type',
			message: `Container "${element.id}" must not define widgetType.`,
			severity: 'error',
		});
	}

	if (element.widgetType === 'heading') {
		if (typeof element.settings.title !== 'string') {
			diagnostics.push({
				code: 'elementor.heading-title-required',
				message: `Heading "${element.id}" requires a string title.`,
				severity: 'error',
			});
		}
		const tag = element.settings.header_size;
		if (typeof tag !== 'string' || !/^(h[1-6]|div|span|p)$/.test(tag)) {
			diagnostics.push({
				code: 'elementor.heading-tag-invalid',
				message: `Heading "${element.id}" has an invalid HTML tag.`,
				severity: 'error',
			});
		}
	}

	if (element.widgetType === 'image') {
		const image = element.settings.image;
		if (!image || typeof image !== 'object' || !('url' in image)) {
			diagnostics.push({
				code: 'elementor.image-source-required',
				message: `Image "${element.id}" requires an image source.`,
				severity: 'error',
			});
		}
		const url =
			image && typeof image === 'object' && 'url' in image
				? image.url
				: undefined;
		if (typeof url !== 'string' || !/^(https?:|data:image\/)/.test(url)) {
			diagnostics.push({
				code: 'elementor.image-url-invalid',
				message: `Image "${element.id}" requires an HTTP(S) or embedded image URL.`,
				severity: 'error',
			});
		}
	}
	if (
		element.widgetType === 'button' &&
		typeof element.settings.text !== 'string'
	)
		diagnostics.push({
			code: 'elementor.button-text-required',
			message: `Button "${element.id}" requires text.`,
			severity: 'error',
		});
	if (
		element.widgetType === 'text-editor' &&
		typeof element.settings.editor !== 'string'
	)
		diagnostics.push({
			code: 'elementor.text-editor-content-required',
			message: `Text Editor "${element.id}" requires editor content.`,
			severity: 'error',
		});

	for (const child of element.elements) {
		validateElement(child, seenIds, diagnostics);
	}
}

export function validateElementorPage(output: ElementorPage): ValidationResult {
	const diagnostics: ConversionDiagnostic[] = [];
	if (output.version !== '0.4') {
		diagnostics.push({
			code: 'elementor.unsupported-version',
			message: `Unsupported Elementor template version: ${output.version}`,
			severity: 'error',
		});
	}
	if (output.type !== 'page') {
		diagnostics.push({
			code: 'elementor.invalid-document-type',
			message: 'Elementor export type must be "page".',
			severity: 'error',
		});
	}
	const ids = new Set<string>();
	for (const element of output.content) {
		validateElement(element, ids, diagnostics);
	}
	return {
		valid: !diagnostics.some(({ severity }) => severity === 'error'),
		diagnostics,
	};
}
