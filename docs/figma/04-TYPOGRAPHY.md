# Typography and Rich Text

## Required properties

প্রতিটি text layer-এ যাচাই করুন:

- font family;
- font style and weight;
- font size;
- line height;
- letter spacing;
- alignment;
- text case;
- decoration;
- text box width এবং resize mode।

`Auto` line height visually convenient হলেও cross-platform output deterministic করতে explicit line height recommended।

## Semantic text layers

এক layer-এ একটি semantic block রাখুন:

- heading;
- paragraph;
- caption;
- button label।

এক text layer-এর মধ্যে heading এবং paragraph মেশাবেন না। Paragraph-এর মধ্যে italic, bold বা link run থাকতে পারে।

## Mixed text runs

FigmaKit `getStyledTextSegments()` থেকে mixed runs সংগ্রহ করে। Supported intent:

- italic;
- underline;
- font weight;
- font family;
- font size;
- color;
- hyperlink;
- letter spacing।

Complex OpenType feature, baseline shift এবং unsupported decoration lossless নাও হতে পারে; preflight warning প্রয়োজন।

## Font availability

Figma font WordPress website-এ না থাকলে exact wrapping হবে না। Production workflow:

1. font license যাচাই;
2. WordPress/global font-এ install;
3. exact family এবং weight map;
4. fallback stack define;
5. screenshot comparison।

## Text wrapping

- Figma text box width intentional রাখুন;
- fixed line break শুধুমাত্র editorial requirement হলে দিন;
- visual wrap বানাতে manual newline ব্যবহার করবেন না;
- button label single semantic run রাখুন;
- content পরিবর্তন করলে overflow হবে কি না পরীক্ষা করুন।

## Heading hierarchy

- page title: H1;
- major section: H2;
- subsection/card: H3;
- hierarchy skip না করা recommended;
- font size hierarchy এবং semantic hierarchy আলাদা হতে পারে।
