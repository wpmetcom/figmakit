# Components and WordPress Mappings

## Component design

Repeated UI pattern-কে Figma Component বানান। Component properties content এবং behavior প্রকাশ করবে:

```text
Button
├── label: text
├── icon: boolean/instance swap
├── style: primary | secondary | outline
├── size: small | medium | large
└── state: default | hover | disabled
```

## Basic mappings

### Container / Group

- Figma: Frame + Auto Layout
- Elementor: Container
- Gutenberg: Group বা Columns

### Heading

- Figma: Text with heading role/level
- Elementor: Heading
- Gutenberg: Heading

### Paragraph

- Figma: Text with paragraph/caption role
- Elementor: Text Editor
- Gutenberg: Paragraph

### Image

- Figma: image fill
- Elementor: Image
- Gutenberg: Image

### Button

- Figma: Auto Layout frame, one label, optional icon, explicit action/link
- Elementor: Button
- Gutenberg: Buttons containing Button

## Button requirements

- Auto Layout enabled;
- Hug contents sizing;
- real padding, not oversized rectangle;
- one label text layer;
- optional icon instance;
- URL metadata where available;
- fill, text color, radius, border and typography defined;
- hover/disabled variants component properties দিয়ে প্রকাশ করা।

## Composite components

Cards, testimonials, pricing blocks ও hero sections সরাসরি এক widget ধরে নেবেন না। এগুলো হতে পারে:

- native container composition;
- verified ElementsKit/GutenKit component;
- reusable mapping recipe;
- manual review-required mapping।

## Variants

Variant property names stable রাখুন:

```text
style=primary
size=medium
icon=none
state=default
```

`Variant2`, `Property 1`, `Yes/No 3` এড়িয়ে চলুন।

## Current versus planned

Current basic components deterministicভাবে map হয়। Accordion, tabs, forms, navigation, carousel, dynamic content এবং addon widgets-এর জন্য versioned fixtures এবং explicit tagging প্রয়োজন; এগুলোকে generic Frame হিসেবে silently misclassify করা যাবে না।
