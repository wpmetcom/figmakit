# FigmaKit

FigmaKit is an AI-assisted Figma-to-WordPress conversion platform. It turns a structured Figma selection into editable, native page-builder content instead of a screenshot, flattened HTML, or an unmaintainable code dump.

The initial launch targets are:

1. Figma → Elementor
2. Figma → Gutenberg
3. Figma → ElementsKit
4. Figma → GutenKit

> **Project status:** early development. The repository contains a working Figma node serializer, Elementor container/heading/image support, and a Gutenberg adapter for Columns, Column, Image, and Paragraph. ElementsKit, GutenKit, AI services, WordPress delivery, and production compatibility validation remain planned.

## Product vision

FigmaKit should reduce repetitive page rebuilding while preserving the visual intent of the Figma design and native, editable WordPress builder elements after conversion.

The proposed position is:

> **Figma to native Elementor, Gutenberg, ElementsKit, and GutenKit content with AI-assisted component mapping, responsive inference, and visual QA.**

The detailed evidence, platform contracts, experiments, AI strategy, Material 3 UX direction, test matrix, and release gates live in [docs/RND.md](docs/RND.md).

The complete user journey, website connection, direct import, live publishing, verification, and rollback experience is defined in [docs/UI_UX_FLOW.md](docs/UI_UX_FLOW.md).

Designers should prepare conversion-ready Figma files using the complete [Figma Authoring Guide](docs/figma/README.md), covering structure, semantic roles, Auto Layout, typography, assets, components, responsive references, variables, accessibility, and preflight checks.

## Initial launch scope

### Supported output targets

| Target      | Output                                             | Required WordPress dependency | Launch priority |
| ----------- | -------------------------------------------------- | ----------------------------- | --------------- |
| Elementor   | Importable Elementor template JSON                 | Elementor                     | P0              |
| Gutenberg   | Valid serialized core-block markup                 | WordPress Block Editor        | P0              |
| ElementsKit | Elementor JSON using supported ElementsKit widgets | Elementor + ElementsKit       | P1              |
| GutenKit    | Serialized markup using supported GutenKit blocks  | WordPress + GutenKit          | P1              |

### MVP Figma inputs

- A selected top-level frame or section
- Auto Layout frames and nested frames
- Text, images, rectangles, vectors, lines, groups, components, and instances
- Solid colors, gradients, borders, shadows, opacity, and corner radius
- Typography, spacing, alignment, sizing, and basic constraints
- Desktop plus optional tablet/mobile reference frames
- Local styles and variables where the Figma Plugin API exposes them

### MVP native mappings

| Design intent       | Elementor                    | Gutenberg                | ElementsKit                            | GutenKit                        |
| ------------------- | ---------------------------- | ------------------------ | -------------------------------------- | ------------------------------- |
| Layout wrapper      | Container                    | Group/Columns            | Elementor Container                    | GutenKit Container              |
| Heading             | Heading                      | Heading                  | ElementsKit Heading when useful        | GutenKit Heading                |
| Paragraph           | Text Editor                  | Paragraph                | Native Elementor fallback              | Advanced Paragraph              |
| Image               | Image                        | Image                    | ElementsKit Image/appropriate fallback | Advanced Image                  |
| Button              | Button                       | Buttons/Button           | ElementsKit Button                     | GutenKit Button                 |
| Icon + content card | Container composition        | Group composition        | Icon Box                               | Icon Box                        |
| Accordion/FAQ       | Accordion or nested fallback | Details blocks/fallback  | ElementsKit Accordion/FAQ              | GutenKit Advanced Accordion/FAQ |
| Tabs                | Tabs when available/fallback | Core-compatible fallback | ElementsKit Advanced Tab               | GutenKit Advanced Tab           |

The first release should prefer a reliable core element over an uncertain addon mapping. A conversion must never silently invent an unsupported widget.

## R&D findings

### Market

Direct competitors prove that demand exists, but they also establish a high baseline:

- [UiChemy](https://wordpress.org/plugins/uichemy/) maps Figma content to editable Elementor widgets and also promotes Gutenberg and Bricks output.
- [Essential Addons Figma to Elementor](https://essential-addons.com/figma-to-elementor-converter/) converts copied Figma layers into editable Elementor containers and core widgets.
- [Figmentor](https://docs.figmentor.io/) exports Figma frames as importable Elementor templates, but depends heavily on structured layers and naming rules.
- [ready→made](https://wpconverters.com/figma-to-elementor) focuses on deterministic, native layout output for Elementor and other targets.
- [UpBuilder](https://upbuilder.ai/platforms) positions AI-assisted Figma conversion across Elementor and multiple development platforms.
- [Yotako](https://yotako.io/product) is an indirect competitor focused on complete Figma-to-WordPress websites and themes rather than Elementor-native output.

FigmaKit's strongest defensible position is its first-party understanding of the WPMet ecosystem: intelligently choose between core Elementor/Gutenberg elements and richer ElementsKit/GutenKit components, while keeping the result editable.

### Technical constraints

- Elementor stores page content as structured JSON containing containers, widgets, settings, responsive values, and global-style references. Its documented [data structure](https://developers.elementor.com/docs/data-structure/) should be treated as a versioned export contract.
- Gutenberg content is a tree of blocks serialized into `post_content` with HTML comment delimiters. Output must round-trip through the official WordPress parser without a block validation error. See the [WordPress block data flow](https://developer.wordpress.org/block-editor/explanations/architecture/data-flow/) and [default parser](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-serialization-default-parser/).
- ElementsKit widgets must be enabled on the destination website before Elementor can render them. Its official catalogue contains many specialized widgets, so FigmaKit needs a controlled compatibility matrix rather than one generic mapping. See the [ElementsKit widget catalogue](https://wpmet.com/plugin/elementskit/elements/).
- GutenKit exposes a large collection of layout and content blocks. Its schemas and saved markup must be captured and version-tested for each supported block. See the [GutenKit block catalogue](https://wpmet.com/plugin/gutenkit/blocks/).
- Figma's plugin sandbox can read the document scene while the UI iframe handles browser APIs; the two communicate via messages. External API domains must be declared in `manifest.json`. See [How plugins run](https://developers.figma.com/docs/plugins/how-plugins-run/) and the [plugin manifest reference](https://developers.figma.com/docs/plugins/manifest/).

### Main product risks

| Risk                                        | Impact                      | Mitigation                                                 |
| ------------------------------------------- | --------------------------- | ---------------------------------------------------------- |
| Visual layers do not reveal semantic intent | Wrong widget selection      | Rules, optional naming hints, AI confidence, review UI     |
| Figma and WordPress layout engines differ   | Visual drift                | Auto Layout-first mapping, breakpoint rules, screenshot QA |
| Addon widget schemas change                 | Broken imports              | Versioned adapters and fixtures from real exports          |
| Gutenberg markup and attributes disagree    | Invalid-block errors        | Known schemas and parser round-trip tests                  |
| AI output is inconsistent                   | Unreliable conversion       | Typed AI decisions; deterministic final exporters          |
| Fonts and remote images are unavailable     | Missing assets/layout shift | Preflight report, media pipeline, fallback warnings        |
| Very large selections exceed limits         | Failed conversion           | Incremental serialization, limits, progress, server jobs   |

## Proposed architecture

```text
Figma selection
    │
    ▼
Figma serializer
    │
    ▼
Normalized Design IR
    ├── semantic inference
    ├── design tokens
    ├── responsive rules
    ├── assets
    └── diagnostics
    │
    ├──────────────┬──────────────┬────────────────┬───────────────┐
    ▼              ▼              ▼                ▼
Elementor       Gutenberg      ElementsKit       GutenKit
adapter         adapter        adapter           adapter
    │              │              │                │
    └──────────────┴──────────────┴────────────────┴───────────────┘
                                   │
                                   ▼
                    validate → preview → export/publish
```

### Figma serializer

The plugin sandbox reads only selected nodes and serializes the properties required by the conversion engine. It should preserve stable node IDs, hierarchy, component metadata, Auto Layout, constraints, style references, fills, strokes, effects, text runs, and image references.

### Normalized Design IR

Elementor's `WidgetBase` should not remain the shared internal model. Introduce a target-neutral representation:

```typescript
type DesignNode = {
	id: string;
	sourceNodeId: string;
	kind:
		| 'page'
		| 'section'
		| 'container'
		| 'heading'
		| 'text'
		| 'image'
		| 'button'
		| 'icon'
		| 'list'
		| 'card'
		| 'accordion'
		| 'tabs'
		| 'unknown';
	name?: string;
	content?: unknown;
	layout: LayoutStyle;
	visual: VisualStyle;
	responsive?: ResponsiveOverrides;
	children: DesignNode[];
	mappingHint?: MappingHint;
	confidence?: number;
};
```

Each target adapter converts this IR into its own versioned schema. This prevents Gutenberg requirements from leaking into Elementor logic and allows a single AI decision to benefit every target.

### Target adapters

Each adapter should expose the same interface:

```typescript
interface TargetAdapter<TOutput> {
	target: 'elementor' | 'gutenberg' | 'elementskit' | 'gutenkit';
	preflight(document: DesignDocument): Diagnostic[];
	transform(document: DesignDocument): TOutput;
	validate(output: TOutput): ValidationResult;
	package(output: TOutput): ExportArtifact;
}
```

- **Elementor adapter:** versioned JSON serializer for native containers and widgets.
- **Gutenberg adapter:** core block tree plus canonical serialized markup.
- **ElementsKit adapter:** Elementor serializer with an ElementsKit widget registry and core Elementor fallbacks.
- **GutenKit adapter:** Gutenberg serializer with GutenKit block schemas and core block fallbacks.

### WordPress connector

The safest MVP is file export: Elementor JSON and Gutenberg-compatible content/package files. Direct publishing should be a later, authenticated connector with:

- a small companion WordPress plugin;
- short-lived connection tokens;
- capability and dependency checks;
- media sideloading and URL replacement;
- draft-only page creation by default;
- explicit confirmation before publishing or overwriting content.

## AI design

AI is an assistant to the conversion engine, not the source of truth.

### AI responsibilities

- Infer semantic intent: button, pricing card, testimonial, FAQ, tabs, navigation, and repeated list.
- Recommend core versus ElementsKit/GutenKit components.
- Infer tablet/mobile behavior when only a desktop frame exists.
- Match repeated Figma components to reusable conversion recipes.
- Detect overflow, clipped text, spacing drift, and low contrast.
- Compare Figma and WordPress screenshots and propose bounded corrections.
- Explain unsupported properties and recommend a fallback.

### AI must not

- Generate unrestricted final JSON or markup without schema validation.
- Silently replace an uncertain component.
- Invent plugin widgets or attributes.
- Publish a page or upload assets without an explicit user action.
- Receive the entire Figma file when a compact, redacted feature summary is enough.

### AI pipeline

1. Deterministic rules classify obvious nodes.
2. Only ambiguous subtrees are reduced to a compact feature payload.
3. AI returns a typed component decision, confidence, responsive intent, and fallback.
4. A policy layer accepts safe high-confidence mappings and surfaces low-confidence choices.
5. The selected adapter generates final output.
6. Schema and round-trip validation run before download or publishing.
7. Optional visual QA suggests small bounded fixes.

### Suggested AI response contract

```json
{
	"sourceNodeId": "123:456",
	"semanticRole": "pricing-card",
	"targetComponent": "elementskit/pricing-table",
	"confidence": 0.91,
	"fallback": "elementor/container-composition",
	"responsiveIntent": {
		"desktop": "row",
		"tablet": "two-column",
		"mobile": "stack"
	},
	"warnings": []
}
```

The backend must enforce a JSON schema, rate limits, timeouts, model-version logging, prompt-version logging, and a deterministic fallback when AI is unavailable.

## Development plan

### Phase 0 — Research fixtures and contracts

- Build a reference Figma file covering layout, typography, media, buttons, cards, FAQ, tabs, responsive frames, components, and variables.
- Manually build equivalent pages in all four targets.
- Export and sanitize real JSON/markup into versioned golden fixtures.
- Record WordPress and plugin versions for each fixture.
- Define the support matrix and visual tolerances.
- Review privacy and licensing for AI processing.

**Exit:** at least one verified fixture and schema note for every target; no guessed addon field names in production mappings.

### Phase 1 — Core conversion platform

- Expand the serializer and reduce unnecessary `any` usage.
- Add Design IR, tokens, assets, diagnostics, and mapping metadata.
- Normalize Auto Layout, positioning, visual styles, typography, and responsive references.
- Add the adapter interface and deterministic IDs.
- Add unit and snapshot tests.

**Exit:** fixtures produce deterministic, schema-valid Design IR without uncaught errors.

### Phase 2 — Elementor MVP

- Refactor the existing builder into a versioned adapter.
- Support container, heading, text editor, image, button, icon, divider, spacer, and compositions.
- Map layout, sizing, background, border, shadow, and typography controls.
- Add image collection and import placeholders.
- Import-test every fixture in supported Elementor versions.

**Exit:** supported fixtures import without error, remain editable, and meet agreed visual tolerances.

### Phase 3 — Gutenberg MVP

- Implement group, columns, column, heading, paragraph, image, buttons/button, list, separator, and spacer.
- Generate canonical comment-delimited markup.
- Parse output with the WordPress block parser and compare semantic trees.
- Test with a clean WordPress site and common `theme.json` configurations.

**Exit:** no invalid-block warnings; content remains editable after save and reload.

### Phase 4 — ElementsKit and GutenKit

- Start with heading, button, icon box, image box, FAQ/accordion, tabs, testimonial, pricing table, and team.
- Create one versioned schema module per widget/block.
- Detect required plugins and enabled features.
- Provide a native Elementor/Gutenberg fallback for every addon component.
- Add import, render, edit, save, and reload tests.

**Exit:** advertised mappings pass against declared plugin versions and fail safely when an addon is missing.

### Phase 5 — AI mapping and responsive assistant

- Implement backend API, typed contract, privacy controls, quotas, and observability.
- Add semantic mapping for repeated component patterns.
- Add confidence thresholds and an in-plugin review screen.
- Add responsive suggestions and privacy-safe caching.
- Measure acceptance rate, correction rate, latency, and token cost.

**Exit:** AI improves a held-out benchmark, never bypasses validation, and conversion still works when AI is disabled.

### Phase 6 — Visual QA and WordPress delivery

- Build the companion WordPress connector.
- Add dependency/version checks, draft creation, import, and media handling.
- Capture target screenshots at desktop, tablet, and mobile widths.
- Compare them with Figma references using perceptual and layout metrics.
- Allow bounded auto-fixes with a visible change log and undo data.

**Exit:** users can convert, review, import as draft, compare, and correct a supported page end to end.

### Phase 7 — Private beta and launch

- Test with internal WPMet design and support teams.
- Run a private beta with real agency files.
- Publish an exact compatibility matrix and known limitations.
- Add onboarding, sample files, diagnostics export, analytics consent, and support workflow.
- Set pricing limits only after cost and success-rate data are available.

## Recommended delivery order

```text
Design IR
  → Elementor core
  → Gutenberg core
  → ElementsKit
  → GutenKit
  → AI semantic mapping
  → AI responsive assistance
  → visual QA
  → direct WordPress publishing
```

Elementor and Gutenberg should be stable before the addon adapters. ElementsKit builds on Elementor, while GutenKit builds on Gutenberg; this order avoids duplicating foundational bugs.

## Quality strategy

### Automated tests

- Serializer tests per Figma node type
- Design IR schema and snapshots
- Token normalization and responsive rules
- Target adapter tests
- Elementor JSON fixtures
- Gutenberg parser round trips
- Addon compatibility fixtures by plugin version
- AI timeout, malformed response, and deterministic fallback tests
- Golden visual regression tests at defined breakpoints

### End-to-end matrix

Every supported component must pass:

1. Create in Figma.
2. Convert with AI off.
3. Convert with AI on when applicable.
4. Import into a clean WordPress test site.
5. Render desktop, tablet, and mobile.
6. Edit content and styling in the destination builder.
7. Save, reload, and verify validity.

### Initial success metrics

- At least 95% successful import rate for supported fixtures
- Zero invalid Gutenberg blocks in the compatibility suite
- Zero fatal errors when an addon is absent or disabled
- At least 90% deterministic mapping accuracy for basic elements
- Measurable AI improvement for ambiguous composite components
- Median conversion under 10 seconds, excluding upload and visual QA
- A clear warning for every unsupported or lossy conversion

## Repository structure

```text
src/
  plugin/
    code.ts                 # Figma sandbox and selection orchestration
    serializer/             # Figma API node extraction
  core/
    figma/                  # Typed source-node contract
    targets/                # Adapter, diagnostic, validation, artifact contracts
    ir/                     # Target-neutral Design IR (next milestone)
    normalize/              # Figma → Design IR (next milestone)
    inference/              # Deterministic semantics (next milestone)
    diagnostics/            # Shared preflight diagnostics (next milestone)
    assets/                 # Shared asset model (next milestone)
  adapters/
    elementor/
      widgets/
        container/          # Container factory, mapper, and exports
        heading/            # Heading factory, mapper, and exports
        image/              # Image factory, mapper, and exports
      adapter.ts            # TargetAdapter implementation
      converter.ts          # Recursive conversion
      pageBuilder.ts        # Elementor template assembly
      config.ts             # Version and mapping configuration
      types.ts              # Elementor-only contracts
    gutenberg/
      blocks/
        columns/            # Core Columns factory and mapper
        column/             # Core Column factory and mapper
        image/              # Core Image factory and mapper
        paragraph/          # Core Paragraph factory and mapper
      adapter.ts            # TargetAdapter implementation
      converter.ts          # Recursive Figma-to-block conversion
      serializer.ts         # Comment-delimited post_content markup
      validation.ts         # Block-tree contract validation
    elementskit/            # Planned target adapter
    gutenkit/               # Planned target adapter
  ai/                       # Planned AI contracts, client, and policy
  validation/               # Planned cross-target validation
  utils/                    # Target-independent helpers
  ui/                       # React presentation only
tests/                      # Planned fixtures, unit, integration, and visual tests
wordpress-connector/        # Planned authenticated WordPress integration
docs/
```

## Immediate engineering backlog

- [ ] Create target-neutral Design IR types.
- [x] Move the current Elementor builder behind `TargetAdapter`.
- [ ] Add text-editor and button support to Elementor.
- [x] Add Gutenberg Columns, Column, Image, and Paragraph serialization.
- [ ] Collect real ElementsKit and GutenKit export fixtures.
- [ ] Add fixture version metadata and compatibility tests.
- [ ] Add Vitest or an equivalent TypeScript test runner.
- [ ] Add diagnostics for unsupported nodes, missing fonts, and responsive references.
- [ ] Design and mock the AI JSON contract before connecting a model.
- [ ] Update `manifest.json` only when the backend domain exists; keep the allowlist minimal.
- [ ] Build an export screen with target, compatibility report, AI toggle, confidence warnings, and download.

## Local development

### Requirements

- Node.js and npm
- Figma Desktop
- Local WordPress test sites for import verification

### Install

```bash
npm install
```

### Develop

```bash
npm run dev
```

### Build

```bash
npm run build
```

Production artifacts are written to `dist/`.

### Load in Figma

1. Open Figma Desktop.
2. Go to **Plugins → Development → Import plugin from manifest**.
3. Select this repository's `manifest.json`.
4. Select a frame and run FigmaKit.

## Current limitations

- The current adapter still consumes raw Figma nodes; a target-neutral Design IR is the next migration step.
- Elementor container, heading, and image mappings are implemented against the official source controls; real WordPress compatibility fixtures are still required.
- Text nodes currently map to headings; paragraph semantics are not implemented.
- ElementsKit and GutenKit adapters do not exist yet; Gutenberg currently supports Columns, Column, Image, and Paragraph.
- Gutenberg output still needs parser round-trip and real WordPress edit/save/reload fixtures before production claims.
- There is no AI backend or AI contract.
- There is no WordPress connector, asset pipeline, schema validation, automated test suite, or visual comparison.
- Output must not be called production-ready until real import and edit/reload tests pass.

## Product principles

1. Native and editable output over visual hacks.
2. Deterministic conversion first; AI for ambiguity and improvement.
3. Honest compatibility reporting instead of silent degradation.
4. Core Elementor/Gutenberg fallback for every addon mapping.
5. Versioned schemas and real exported fixtures.
6. Privacy by minimization: send only necessary normalized features to AI.
7. User review before publishing or overwriting WordPress content.

## License

License, contribution policy, supported WordPress versions, and data-processing terms must be finalized before public beta.
