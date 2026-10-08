# File and Page Structure

## Root frame

প্রতিটি conversion job-এ একটি top-level Frame নির্বাচন করুন। Frame-এর নাম page বা section intent বোঝাবে:

```text
page:home
page:pricing
section:hero
section:testimonials
```

একসঙ্গে unrelated একাধিক root frame select করবেন না। Desktop, tablet ও mobile reference থাকলে সেগুলো sibling frame হতে পারে, কিন্তু পরিষ্কার breakpoint suffix ব্যবহার করুন।

```text
page:home/desktop
page:home/tablet
page:home/mobile
```

## Recommended hierarchy

```text
page:home
├── section:header
├── section:hero
│   ├── container:hero-copy
│   │   ├── heading:hero-title
│   │   ├── paragraph:hero-description
│   │   └── button:primary-cta
│   └── image:hero-product
├── section:features
└── section:footer
```

## Rules

- Frame দিয়ে meaningful layout boundaries তৈরি করুন।
- Group শুধু organizational grouping-এর জন্য ব্যবহার করুন; layout control প্রয়োজন হলে Frame + Auto Layout ব্যবহার করুন।
- Hidden draft layers conversion root-এর বাইরে রাখুন অথবা visibility off রাখুন।
- Mask, helper rectangle ও annotation layer-এর নাম পরিষ্কার রাখুন।
- একটি visible element-এর duplicate hidden copy রাখলে তা কেন আছে documentation দিন।
- Deep nesting প্রয়োজন ছাড়া করবেন না। সাধারণত 3–7 levels যথেষ্ট।

## Avoid

- `Frame 123`, `Group 9`, `Rectangle 44`-এর মতো অর্থহীন নাম
- একই visual section-এর children page root-এ ছড়িয়ে রাখা
- spacing তৈরির জন্য invisible rectangle
- layout gap তৈরির জন্য empty text layer
- একটি giant flattened image দিয়ে সম্পূর্ণ page তৈরি
- root frame-এর বাইরে visible child রেখে conversion আশা করা

## Selection requirements

Conversion-এর আগে নিশ্চিত করুন:

- root frame visible;
- width ও height valid;
- child hierarchy complete;
- required fonts available;
- image fills resolvable;
- locked layer প্রয়োজন হলে readable;
- clipping intentional।
