# FigmaKit Architecture

**Status:** Active architecture

**Stage:** Pre-release foundation
**Detailed research:** [RND.md](RND.md)

**Product flow:** [UI_UX_FLOW.md](UI_UX_FLOW.md)

**Figma authoring contract:** [figma/README.md](figma/README.md)

## Goals

FigmaKit converts one Figma selection into four native WordPress targets:

- Elementor
- Gutenberg
- ElementsKit
- GutenKit

The architecture keeps platform extraction, normalized design meaning, target serialization, AI assistance, validation, and UI separate. There is no legacy compatibility layer because the project has not been released.

## Dependency direction

```text
plugin ──► core ◄── ai
            │
            ▼
         adapters ──► validation
            │
            ▼
            ui
```

Rules:

1. `core` must not import from `adapters` or `ui`.
2. Each adapter owns its target types, schemas, factories, and mappers.
3. `ui` may orchestrate public adapter APIs but must not contain conversion logic.
4. AI may propose typed decisions but cannot generate unchecked final output.
5. Shared helpers must be platform-neutral.
6. Target-specific settings must never live in generic `src/types` or `src/ui` folders.

## Repository structure

```text
src/
  plugin/
    code.ts
    serializer/
  core/
    figma/
    targets/
    ir/                    # next milestone
    normalize/             # next milestone
    inference/             # next milestone
    diagnostics/           # next milestone
    assets/                # next milestone
  adapters/
    elementor/
      widgets/
        container/
        heading/
        image/
      adapter.ts
      config.ts
      converter.ts
      pageBuilder.ts
      types.ts
      widgetFactory.ts
    gutenberg/
      blocks/
        columns/
        column/
        image/
        paragraph/
      adapter.ts
      converter.ts
      serializer.ts
      validation.ts
    elementskit/           # planned
    gutenkit/              # planned
  ai/                      # planned
  validation/              # planned
  utils/
  ui/
    components/
    App.tsx
    App.css
    main.tsx
tests/                     # planned
wordpress-connector/       # planned
docs/
```

## Runtime boundaries

### Figma plugin main thread

`src/plugin` is the only layer that talks directly to the Figma Plugin API. It reads the current selection and serializes supported source properties. It does not know Elementor, Gutenberg, ElementsKit, GutenKit, React, or AI provider formats.

### React UI iframe

`src/ui` presents selection status, target choice, preflight diagnostics, AI controls, mapping review, progress, and output. It calls public application services/adapters and renders results. It must not implement mapping tables or target serialization.

### Backend and WordPress connector

Future AI requests and authenticated WordPress operations run outside the client bundle. Secrets must never be embedded in the Figma plugin. Direct WordPress delivery creates drafts by default and validates dependencies before import.

## Core contracts

### Figma source contract

`src/core/figma` is the typed boundary between the serializer and conversion pipeline. It represents captured Figma data only. It is not the future Design IR and must not gain Elementor or Gutenberg fields.

### Target adapter contract

Every output target implements:

```typescript
interface TargetAdapter<TInput, TOutput> {
	readonly target: ConversionTarget;
	preflight(input: TInput): ConversionDiagnostic[];
	transform(input: TInput): TOutput;
	validate(output: TOutput): ValidationResult;
	package(output: TOutput): ExportArtifact;
}
```

Responsibilities:

- `preflight`: report unsupported, ambiguous, or missing inputs before conversion;
- `transform`: create target-native output;
- `validate`: enforce structural and compatibility rules;
- `package`: produce the downloadable/importable artifact.

### Design IR milestone

The current Elementor adapter temporarily consumes typed Figma nodes directly. The next foundation milestone adds:

```text
FigmaNode[] → normalize() → DesignDocument → TargetAdapter
```

`DesignDocument` will contain semantic roles, normalized layout, visual styles, typography, tokens, responsive overrides, assets, children, inference evidence, and diagnostics. All four adapters will consume the same IR.

## Elementor adapter

The migrated Elementor prototype now lives completely in `src/adapters/elementor`.

```text
ElementorAdapter
  ├── config.ts
  ├── converter.ts
  ├── pageBuilder.ts
  ├── types.ts
  ├── widgetFactory.ts
  └── widgets/
      ├── container/
      │   ├── containerWidget.ts
      │   ├── containerMapper.ts
      │   └── index.ts
      ├── heading/
      │   ├── headingWidget.ts
      │   ├── headingMapper.ts
      │   └── index.ts
      └── image/
          ├── imageWidget.ts
          ├── imageMapper.ts
          └── index.ts
```

### Current flow

```text
typed Figma nodes
  → node-to-widget selection
  → Elementor widget mapper
  → recursive converter
  → page builder
  → adapter validation
  → JSON artifact
```

### Current support

- Container: Auto Layout direction/wrap/alignment/gap, padding, size, background, border, radius, shadow, clipping, and nested elements
- Heading: content, inferred HTML tag, font family/size/weight/style, alignment, color, case, decoration, line height, letter spacing, hyperlink, and blend mode
- Image-fill geometry → Image widget: media reference, size/max-width, height, object fit/position, border, radius, and opacity
- Nested conversion
- Elementor template version `0.4`
- Preflight diagnostics, recursive structural validation, and JSON packaging

### Known limitations

- All text still maps to Heading; semantic paragraph classification is pending.
- Image references identify Figma assets, but final WordPress media upload and URL replacement require the planned connector.
- Responsive breakpoint synthesis and global style binding are pending.
- Real WordPress import/edit/save/reload compatibility tests are pending.
- Element IDs are unique but not yet deterministic from source IDs.

## Gutenberg adapter

The initial Gutenberg base adapter owns four block folders matching the official block names. Horizontal Figma Auto Layout becomes `core/columns`; every direct child is wrapped in `core/column`. Text becomes `core/paragraph`, and image fills become `core/image`. Vertical and non-layout wrappers are flattened until Group support is added, preventing invalid orphan Column blocks.

```text
typed Figma nodes
  → deterministic block selection
  → Columns/Column/Image/Paragraph mappers
  → validated Gutenberg block tree
  → canonical comment-delimited post_content
```

The adapter separates full editor attributes from comment-serialized attributes so HTML-sourced values such as paragraph content and image URL/alt are not redundantly written into block comments. Real WordPress parser and edit/save/reload fixtures remain a release gate.

## Future adapter relationships

```text
Elementor base ──► ElementsKit extension
Gutenberg base ──► GutenKit extension
```

ElementsKit reuses verified Elementor layout behavior and adds versioned ElementsKit widget schemas. GutenKit reuses the Gutenberg block tree and serializer while adding verified GutenKit block schemas. Every addon component must define a core fallback.

## Adding an Elementor widget

Add target-specific code in a folder named after the widget, for example `src/adapters/elementor/widgets/button/`:

1. Add the settings contract to `src/adapters/elementor/types.ts`.
2. Add `{name}Widget.ts`, `{name}Mapper.ts`, and `index.ts` inside that folder.
3. Export and register the folder in `widgets/index.ts`.
4. Add its semantic mapping in `config.ts` or the future inference layer.
5. Add a real exported Elementor fixture.
6. Test import, edit, save, reload, and frontend rendering.

Example imports:

```typescript
import type { FigmaNode } from '@/core/figma';
import { createElementId } from '@/utils';
import type { ElementorElement } from '@/adapters/elementor';
```

Do not add widgets under `src/ui`, add target types under generic `src/types`, or recreate builder folders.

## AI boundary

AI receives only a compact normalized ambiguous subtree. It returns a typed semantic/mapping decision with confidence, alternatives, evidence codes, responsive intent, and warnings.

AI does not own:

- raw Figma extraction;
- exact unit/color conversion;
- final Elementor JSON or Gutenberg markup;
- schema validation;
- file packaging;
- publishing authorization.

When AI is unavailable, deterministic conversion remains functional.

## Validation strategy

Validation is layered:

1. Source validation
2. Design IR schema validation
3. Adapter output validation
4. Parser/schema validation
5. Real WordPress import
6. Editor edit/save/reload
7. Frontend render
8. Multi-breakpoint visual regression

Passing TypeScript compilation is necessary but not proof of WordPress compatibility.

## Import conventions

Use one root alias:

```typescript
import type { FigmaNode } from '@/core/figma';
import { elementorAdapter } from '@/adapters/elementor';
import { rgbToHex } from '@/utils';
```

Avoid aliases tied to obsolete folder ownership such as `@/builder`, `@/widgets`, `@/config`, or `@/utils`.

## Architectural release gates

Before calling the architecture production-ready:

- Design IR is the input to all target adapters.
- Elementor and Gutenberg base adapters pass real compatibility suites.
- ElementsKit and GutenKit mappings use verified versioned fixtures.
- AI has a typed schema, privacy controls, evaluation benchmark, and deterministic fallback.
- UI follows the Material 3 specification in [RND.md](RND.md).
- WordPress imports remain editable after save/reload.
- Every lossy mapping emits a user-facing diagnostic.
