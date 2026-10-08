# Auto Layout and Geometry

## Auto Layout first

WordPress builders Flexbox/Grid ব্যবহার করে। Figma Auto Layout তার সবচেয়ে কাছের source model। প্রতিটি meaningful section/container-এ Auto Layout দিন।

Map হওয়া properties:

| Figma | Elementor | Gutenberg |
|---|---|---|
| Horizontal | Row container | Columns/row Group |
| Vertical | Column container | Group |
| Padding | Container padding | Block spacing padding |
| Item spacing | Gap | Block gap |
| Primary alignment | Justify content | Layout justification |
| Counter alignment | Align items | Vertical alignment/layout |
| Wrap | Flex wrap | Responsive/group layout |

## Sizing

প্রতিটি child-এর sizing intention ঠিক করুন:

- Hug contents: buttons, badges, short labels
- Fill container: flexible columns এবং full-width content
- Fixed: intentional media/artboard size
- Min/max behavior: responsive design note বা variable দিয়ে প্রকাশ করুন

অপ্রয়োজনে fixed pixel width ব্যবহার করবেন না। Desktop frame-এর child responsive হতে হলে Fill অথবা proportional structure ব্যবহার করুন।

## Padding and gap

- spacing-এর জন্য parent padding এবং Auto Layout gap ব্যবহার করুন;
- empty spacer rectangle ব্যবহার করবেন না;
- unrelated gaps-এর জন্য nested container তৈরি করুন;
- negative spacing বা overlap intentional হলে layer name/metadata দিয়ে চিহ্নিত করুন।

## Columns

Horizontal layout-এ:

- parent padding বাদ দিয়ে available width বিবেচনা করুন;
- gap-সহ child widths 100% অতিক্রম করবে না;
- equal columns হলে সব child Fill ব্যবহার করুন;
- asymmetric columns হলে explicit fixed/proportional width দিন;
- mobile stacking order layer order-এর সঙ্গে মিলিয়ে রাখুন।

## Absolute positioning

শুধু এই ক্ষেত্রে ব্যবহার করুন:

- decorative overlay;
- badge;
- controlled image overlap;
- intentionally floating element।

Absolute child-এর parent অবশ্যই meaningful containing frame হবে। Page root-এর coordinate-এর ওপর নির্ভর করবেন না।

## Clipping and overflow

- image crop হলে mask/image fill ব্যবহার করুন;
- `Clip content` শুধু intentional হলে enable করুন;
- shadow clip হয়ে গেলে parent clipping off করুন;
- mobile overflow behavior আলাদা reference frame-এ পরীক্ষা করুন।

## Geometry checklist

- nested frames-এর bounds children ধারণ করে;
- no accidental 0×0 layers;
- rotation intentional;
- fractional pixels প্রয়োজন ছাড়া নেই;
- stroke position layout size পরিবর্তন করছে কি না পরীক্ষা করা;
- parent/child constraints logical।
