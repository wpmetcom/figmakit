# Preflight Checklist and Troubleshooting

## Before conversion

### Structure

- [ ] One intentional root frame selected
- [ ] Meaningful hierarchy and layer names
- [ ] Hidden drafts excluded
- [ ] Layout wrappers use Auto Layout
- [ ] No accidental empty layers

### Layout

- [ ] Padding and gap use Auto Layout controls
- [ ] Hug/Fill/Fixed sizing is intentional
- [ ] Columns account for gap and padding
- [ ] Absolute positioning is intentional
- [ ] Clip content is correct

### Typography

- [ ] Fonts and weights exist
- [ ] Line height is explicit where fidelity matters
- [ ] Heading levels are semantic
- [ ] Paragraphs and headings are separate layers
- [ ] Mixed runs contain supported styles

### Assets

- [ ] Image fills have a valid image hash
- [ ] Crop and fit are intentional
- [ ] Alt-text intent is documented
- [ ] Icons are reusable vectors/components
- [ ] Asset resolution is sufficient

### Responsive

- [ ] Desktop layout verified
- [ ] Tablet/mobile references supplied when important
- [ ] Stacking order is logical
- [ ] Text wrapping tested
- [ ] Overflow tested

## Common problems

### Image missing

Check image fill, image hash এবং plugin reload। Embedded data URL local export-এ থাকতে পারে; final WordPress media URL connector ছাড়া তৈরি হবে না।

### Wrong widget detected

Explicit role metadata বা stable role prefix দিন। Visual appearance alone ambiguous হলে auto inference-এর ওপর নির্ভর করবেন না।

### Layout too wide

Child fixed widths, parent padding এবং gaps পরীক্ষা করুন। Fill sizing ব্যবহার করুন এবং unnecessary root fixed width সরান।

### Text wraps differently

Font family/weight availability, text box width, line height এবং letter spacing পরীক্ষা করুন। Browser ও Figma font metrics পুরোপুরি একই নাও হতে পারে।

### Gutenberg invalid block

Generated markup official WordPress parser এবং current WordPress version দিয়ে পরীক্ষা করুন। Theme CSS problem এবং block validation problem আলাদা করে diagnose করুন।

### Elementor style ignored

Target Elementor version, control key prefix, responsive control shape এবং generated CSS regeneration পরীক্ষা করুন। Import-এর পরে Elementor CSS regenerate করুন।

## Release verification

প্রতিটি supported fixture-এর জন্য:

1. Figma selection serialize;
2. target conversion;
3. structural validation;
4. WordPress import;
5. editor open;
6. save and reload;
7. frontend render;
8. desktop/tablet/mobile screenshot;
9. Figma reference comparison;
10. regression fixture update।

TypeScript build pass করা compatibility proof নয়। Real import এবং edit/save/reload pass না করলে mapping production-ready নয়।
