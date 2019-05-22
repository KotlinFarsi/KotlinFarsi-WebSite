---
layout: tutorial
title: "توابع الحاقی کاتلین از جاوا"
category: introduction
permalink: /tutorials/introduction/extension-functions-from-java/
editlink: https://github.com/KotlinFarsi/OpenSourceTutorials-Introduction/edit/master/src/extension-functions-from-java/README.md
---


<div dir="rtl" markdown="1">



اخرین موردی که میخوایم توی این بخش در موردش صحبت کنیم استفاده، صدازدن توابع الحاقی کاتلین از جاوا است. بیاین به فایل CustomerKotlin مراجعه کنیم و یک تابع الحاقی بهش اضافه کنیم

</div>

```kotlin
fun CustomerKotlin.extention(){
    
}
```

<div dir="rtl" markdown="1">

و حالا اگه به فایل جاوامون مراجعه کنیم تنها به این روش میتونیم از این تابعمون استفاده کنیم:

</div>

```java
CustomerKotlinKt.extention(customerKotlin);
```

<div dir="rtl" markdown="1">

درواقع ما اینجا از همون فایل استفاده میکنیم و چون میخوایم روی یک کلاس شی خاصمون این تابع رو اعمال کنیم، این شی رو به تابع پاس بدیم و در نهایت همون فرآیند که میخوایم روی اون شی به عمل میاد.

</div>
