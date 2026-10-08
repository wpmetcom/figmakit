# Responsive Design

## Preferred workflow

তিনটি reference frame দিন:

```text
page:home/desktop  1440px
page:home/tablet    768px
page:home/mobile    390px
```

একই semantic component-এর layer/component identity যতটা সম্ভব preserve করুন। সম্পূর্ণ unrelated duplicate tree বানাবেন না।

## What must be designed

- container direction;
- column count;
- stacking order;
- gap এবং padding;
- typography size/line-height;
- image crop;
- element visibility;
- button width;
- navigation behavior;
- overflow behavior।

## Constraints

- flexible element-এ Left & Right/Fill behavior দিন;
- centered fixed content-এ Center constraint ব্যবহার করুন;
- image aspect ratio preserve করুন;
- absolute overlay parent-relative constraint ব্যবহার করবে;
- mobile order layer order দিয়ে পরিষ্কার করুন।

## Breakpoint differences

শুধু frame ছোট করা responsive design নয়। Explicitly পরীক্ষা করুন:

- horizontal row mobile-এ column হবে কি না;
- image আগে না content আগে;
- button full width হবে কি না;
- long heading wrap;
- tap target size;
- hidden decorative media;
- padding scale।

## Without reference frames

শুধু desktop frame দিলে FigmaKit constraints ও Auto Layout থেকে suggestion দিতে পারে, কিন্তু সেটি inference—source truth নয়। Review UI-তে inferred value confirm করতে হবে।

## Do not

- mobile layout বোঝাতে layers hide করে একই frame-এ conflicting states রাখা;
- breakpoint প্রতি unrelated layer naming;
- responsive spacing-এর জন্য arbitrary X/Y movement;
- text ছোট করে overflow লুকানো;
- desktop-only hover-কে primary interaction করা।
