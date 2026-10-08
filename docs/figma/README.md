# Figma Authoring Guide for FigmaKit

এই folder-এর documentation অনুসরণ করে Figma design তৈরি করলে FigmaKit layout, content এবং component intent নির্ভরযোগ্যভাবে Elementor, Gutenberg, ElementsKit ও GutenKit-এ রূপান্তর করতে পারবে।

FigmaKit কোনো screenshot-to-code tool নয়। এটি Figma layer tree, Auto Layout, typography, fills, component structure এবং explicit semantic hints ব্যবহার করে native ও editable WordPress output তৈরি করে। তাই visual design-এর পাশাপাশি document structure-ও সঠিক হতে হবে।

## Documentation map

1. [File and page structure](01-FILE-STRUCTURE.md)
2. [Layer naming and semantic roles](02-LAYER-NAMING-AND-ROLES.md)
3. [Auto Layout and geometry](03-AUTO-LAYOUT-AND-GEOMETRY.md)
4. [Typography and rich text](04-TYPOGRAPHY.md)
5. [Images, icons and assets](05-ASSETS.md)
6. [Components and WordPress mappings](06-COMPONENTS-AND-MAPPINGS.md)
7. [Responsive design](07-RESPONSIVE-DESIGN.md)
8. [Styles, variables and design tokens](08-STYLES-AND-VARIABLES.md)
9. [Accessibility and content quality](09-ACCESSIBILITY-AND-SEO.md)
10. [Preflight checklist and troubleshooting](10-PREFLIGHT-AND-TROUBLESHOOTING.md)

## Three mandatory rules

1. একটি page বা section-এর জন্য একটি পরিষ্কার root Frame ব্যবহার করুন।
2. Layout wrapper-এ Auto Layout ব্যবহার করুন; intentional overlay ছাড়া arbitrary absolute positioning এড়িয়ে চলুন।
3. Ambiguous element-কে explicit semantic role দিন; layer name-কে visual description হিসেবে নয়, stable intent হিসেবে ব্যবহার করুন।

## Current implementation note

বর্তমান repository-তে Elementor Container, Heading, Text Editor, Image ও Button এবং Gutenberg Group, Columns, Column, Heading, Paragraph, Image, Buttons ও Button আছে। ElementsKit/GutenKit, WordPress media upload, visual QA এবং full responsive synthesis এখনো release gate। Documentation-এর planned feature-গুলো `Planned` হিসেবে চিহ্নিত করা হয়েছে।
