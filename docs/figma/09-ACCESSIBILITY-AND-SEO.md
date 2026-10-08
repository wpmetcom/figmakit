# Accessibility and SEO

## Heading structure

- একটি logical page title/H1;
- section hierarchy maintain;
- শুধু visual size দিয়ে heading role নির্ধারণ নয়;
- heading level skip এড়িয়ে চলুন।

## Images

- informative image-এর meaningful alt text;
- decorative image-এর empty alt;
- image-এর ভিতরের text গুরুত্বপূর্ণ হলে HTML text হিসেবেও দিন;
- text-as-image এড়িয়ে চলুন।

## Links and buttons

- navigation-এর জন্য link, action-এর জন্য button intent;
- `Click here`-এর বদলে descriptive label;
- icon-only action-এর accessible name;
- focus ও hover state component variant হিসেবে design;
- minimum usable pointer target বজায় রাখা।

## Contrast

- text/background contrast পরীক্ষা করুন;
- status শুধু color দিয়ে প্রকাশ করবেন না;
- disabled state readable রাখুন;
- image background-এর ওপর text হলে সব crop-এ contrast পরীক্ষা করুন।

## Reading order

Figma layer order expected DOM reading order-এর সঙ্গে মিলবে। Visual positioning দিয়ে reading order উল্টাবেন না। Mobile stacking-এও logical order বজায় রাখুন।

## Content quality

- final বা realistic-length content দিয়ে test;
- long title এবং localization expansion বিবেচনা;
- button label concise;
- captions image-এর সঙ্গে একই semantic container-এ;
- form field label placeholder-এর বিকল্প নয়।
