# Images, Icons and Assets

## Raster images

Image একটি Rectangle/Frame-এর image fill হিসেবে রাখুন। Required:

- valid `imageHash`;
- intentional scale mode (`Fill`, `Fit`, `Crop`);
- stable frame dimensions;
- meaningful layer name;
- alt-text intent।

FigmaKit plugin image bytes resolve করে embedded data URL তৈরি করে। Direct WordPress publishing-এর সময় planned connector এগুলো media library-তে upload করে final media ID ও URL বসাবে।

## Crop and focal point

- Crop mode ব্যবহার করলে subject position ঠিক রাখুন;
- important subject center-এর বাইরে হলে focal point metadata প্রয়োজন;
- desktop/mobile crop আলাদা হলে breakpoint-specific image frame দিন;
- destructive crop-এর বদলে original asset preserve করুন।

## Alt text

Layer name alt text নয়। Recommended metadata/content field:

```text
role: image
name: farmers-harvesting
alt: Farmers harvesting leafy vegetables
```

Decorative image হলে empty alt প্রয়োজন; accessibility document দেখুন।

## Icons

- reusable icon-কে Component করুন;
- vector path পরিষ্কার রাখুন;
- icon এবং background shape আলাদা layer করুন;
- stroke-based icon outline/export-এ পরিবর্তিত হচ্ছে কি না পরীক্ষা করুন;
- semantic icon-এর accessible label দিন;
- decorative icon screen reader থেকে hidden থাকবে।

## SVG

SVG-এর জন্য:

- unsupported blend/effect flatten করুন;
- unnecessary nested boolean paths পরিষ্কার করুন;
- external raster fill embedded আছে কি না পরীক্ষা করুন;
- WordPress SVG policy/connector support ছাড়া raw upload ধরে নেবেন না।

## Asset quality

- source resolution rendered size-এর জন্য যথেষ্ট;
- অপ্রয়োজনীয় 4K asset এড়িয়ে চলুন;
- transparency intentional;
- color profile consistent;
- file licensing documented;
- duplicate image reuse করুন, duplicate bytes নয়।
