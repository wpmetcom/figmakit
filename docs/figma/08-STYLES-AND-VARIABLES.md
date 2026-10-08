# Styles, Variables and Design Tokens

## Use semantic tokens

Recommended collections:

```text
Color
  surface/default
  surface/subtle
  text/primary
  text/secondary
  action/primary
  border/default

Spacing
  space/1 = 4
  space/2 = 8
  space/3 = 12
  space/4 = 16
  space/6 = 24
  space/8 = 32

Radius
  radius/small
  radius/medium
  radius/large
```

`green-500`-এর বদলে `action/primary` semantic binding target global styles-এর সঙ্গে ভালো map হয়।

## Figma styles

- text styles heading/body/caption role অনুযায়ী;
- color styles semanticভাবে;
- effect styles reusable shadow অনুযায়ী;
- grid styles layout reference হিসেবে;
- duplicate near-identical styles merge করুন।

## Variables and modes

Modes ব্যবহার করা যায়:

- light/dark;
- desktop/mobile spacing;
- brand themes।

Mode-এর অর্থ পরিষ্কার রাখুন। `Mode 1`, `Mode 2` ব্যবহার করবেন না।

## WordPress mapping

Planned token pipeline:

```text
Figma variables
  → Design IR tokens
  → Elementor global colors/fonts
  → Gutenberg theme.json presets
```

Token binding পাওয়া না গেলে literal fallback থাকবে এবং diagnostic তৈরি হবে।

## Gradients and effects

- reusable gradient style ব্যবহার করুন;
- supported gradient stop count বজায় রাখুন;
- multiple shadows conversion-loss warning পেতে পারে;
- layer blur এবং background blur আলাদা intent;
- unsupported blend mode-এর fallback review করুন।
