# Layer Naming and Semantic Roles

## Naming format

Recommended pattern:

```text
role:descriptive-name
```

Examples:

```text
container:hero
heading:page-title
paragraph:introduction
button:browse-products
image:featured-product
caption:image-credit
```

Name একটি hint; geometry ও structure-এর বিকল্প নয়। FigmaKit শুধু page-specific শব্দ দেখে সিদ্ধান্ত নেবে না।

## Supported roles

| Role | Meaning | Elementor | Gutenberg |
|---|---|---|---|
| `container` | Layout wrapper | Container | Group/Columns |
| `heading` | Section/page heading | Heading | Heading |
| `paragraph` | Body copy | Text Editor | Paragraph |
| `caption` | Image/supporting caption | Text Editor | Paragraph/Figcaption |
| `image` | Raster media | Image | Image |
| `button` | Action/link | Button | Buttons → Button |

## Explicit plugin metadata

FigmaKit-এর preferred semantic source হলো plugin data:

```text
figmakit:role = button
figmakit:heading-level = 1
```

বর্তমান converter এই metadata read করতে পারে। UI tagging workflow planned; tagging UI না থাকলে stable role prefix ব্যবহার করুন।

## Heading levels

Heading hierarchy content meaning অনুযায়ী দিন:

```text
heading:h1:page-title
heading:h2:features
heading:h3:feature-card-title
```

শুধু font size দেখে heading level নির্ধারণ করবেন না। এক page-এ সাধারণত একটি primary H1 থাকবে।

## Naming rules

- lowercase kebab-case ব্যবহার করুন;
- role এবং name colon দিয়ে আলাদা করুন;
- name refactor করলেও role অপরিবর্তিত রাখুন;
- `button` role শুধু actual interactive action-এ ব্যবহার করুন;
- visual text যদি heading-এর মতো বড় হলেও semantic paragraph হয়, `paragraph:` দিন;
- decorative image-এ `image:decorative-*` এবং alt intent document করুন।

## Bad examples

```text
Browse our shop        # content, role নয়
Big black text         # visual description
Green rectangle        # semantic intent নেই
HERO FINAL FINAL 2     # unstable naming
```
