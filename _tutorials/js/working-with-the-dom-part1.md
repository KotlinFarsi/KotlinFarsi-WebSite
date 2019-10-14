---
layout: tutorial
title: "کار با DOM - بخش اول"
category: js
unit: 2
chapter: 1
---


<div dir="rtl" markdown="1">



امروز بهتون یادمیدم که چطور بتونین با `DOM` از داخل برنامه جاوااسکریپتتون کارکنین.

اگه یادتون باشه یک برانامه نوشتیم که کنسول رو صدا میزد و `Hello, World` رو داخلش چاپ میکرد و همینطور یک فایل `index.html` ساختیم که بتونیم نتیجه رو نمایش بدیم. خب حالا به قسمتی رسیدیم که میخوایم با `DOM` ارتباط برقرار کنیم. قبل از این که داخل `Main.kt` کدی بزنیم لازمه که یک سری تغییرات توی فایل `index.html` بدیم:

</div>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Working With DOM</title>
</head>
<body>
    <div id="root"></div>

    <script src="out/production/KotlinJSHelloWorld/lib/kotlin.js"></script>
    <script src="out/production/KotlinJSHelloWorld/KotlinJSHelloWorld.js"></script>
</body>
</html>
```

<div dir="rtl" markdown="1">

خب کاری که کردیم درواقع تنها اضافه کردن یک `div` به فایل html­ امون بود که بتونیم از طریق کد جاوا اسکریپتمون باهاش ارتباط برقرار کنیم.

حالا میتونیم از طریق کد کاتلین باهاش ارتباط برقرار کنیم. برگردیم به `Main.kt` و کد زیر رو اضافه کنیم:

</div>

```kotlin
document.getElementById("root")
```

<div dir="rtl" markdown="1">


درواقع کدی که زدیم میاد عنصری که با ای دی `root` وجود داره رو صدا میزنه که بعدا میتونیم ازش استفاده کنیم.

ولی یه سوال.... اینجا داریم با پاس دادن یه رشته یک عنصر رو صدا میزنیم.اگه اشتباه تایپی داشته باشیم و یا اصا به هر دلیلی یک عنصر `null` رو صدا بزنیم چه اتفاقی میفته.

درواقع موقع صدازندش اتفاقی نمیفته، وقع استفاده کردنش منجر به بروز اتفاق میشه.مثلا کد زیر رو نگاه کنین:


</div>

```kotlin
val root = document.getElementById("root1")
root.innerHTML = "<h1>Hello, World again!</h1>"
```

<div dir="rtl" markdown="1">

توی کاتلین اگه همچین کدی رو بنویسین، کامپایلر توی خط دوم بهتون ارور میده! دلیلش هم اینه کا کاتلین امنه! کاتلین(اگه درست ازش استفاده کنین) امنه! اجازه نمیده از عنصری که ممکنه `null` باشه استفاده کنین. برای حل این مشکل چندین راه حل دارین. اولیش اینه که از روش قدیمی استفاده کنیم، یعنی :

</div>

```kotlin
fun main(args: Array<String>) {
    println("Hello, World!")

    val root = document.getElementById("root")
    if (root != null) {
        root.innerHTML = "<h1>Hello, World again!</h1>"
    }

    println("The end")
}
```
<div dir="rtl" markdown="1">

الان اگه این کد رو بیلد کنین، نتیجه رو توی مرورگر اینجوری میبینین:

<p style="width: calc(100% + 60px);">
<img src="/assets/img/js/working-with-the-dom-part1/output1.png" />
</p>

اگه root به root1 تغییر کنه، یعنی مثلا کد زیر:

</div>

```kotlin
val root = document.getElementById("root1")
```

<div dir="rtl" markdown="1">

نتیجه اینجوری ظاهر میشه:

<p style="width: calc(100% + 60px);">
<img src="/assets/img/js/working-with-the-dom-part1/output2.png" />
</p>

همینطور که میبینین چون عنصری رو صدا زدیم که `null` بود مقدارش چاپ نشد. ولی این خوبه اگه یادمون باشه که قبلش `null` رو چک کنیم و دقیقا زمان هایی به وجود میاد که یادمون میره همچین کاری انجام بدیم.

راه حل دیگه استفاده از عملگر `!!` هه. درواقع این عملگر درکاتلین اومده که تنها ارور در زمان کامپایلرو از بین ببره و در واقع توسعه دهنده با صدازدن همچین عملگری به کامپایلر میگه: " تو کاریت نباشه، من میدونم چیکار دارم میکنم". بیاین ازش استفاده کنیم و نتیجه هارو ببینیم :

</div>


```kotlin
fun main(args: Array<String>) {
    println("Hello, World!")

    val root = document.getElementById("root")
    root!!.innerHTML = "<h1>Hello, World again!</h1>"

    println("The end")
}
```

<div dir="rtl" markdown="1">

و نتیجه :

<p style="width: calc(100% + 60px);">
<img src="/assets/img/js/working-with-the-dom-part1/output3.png" />
</p>

همینطور که میبینین وقتی عنصر درستی رو صدا بزنیم، برنامه درست کار میکنه. ولی وقتی root1 رو صدا بزنیم:



متوجه میشیم که به `NullPointerException` میخوریم و متاسفانه این مسئله خیلی از موقع ها پیش میاد و باعث بروز مشکل در سیستم میشه. به همین خاطر به این ارور ها، ارورهای میلیون دلاری هم گفته میشه.

ولی راه حل درستی که کاتلین پیشنهاد میکنه استفاده از عملگر `?` هه . کد زیر رو نگاه کنین:


<p style="width: calc(100% + 60px);">
<img src="/assets/img/js/working-with-the-dom-part1/output4.png" />
</p>


در واقع وقتی کامپایلر به اون نقطه میرسه نگاه میکنه، اگه عنصری که داره ازش استفاده میشه `null` نبود، عمل لازم رو روش انجام میده، ولی اگر `null` بود از روی اون خط رد میشه.

خب معلومه که اگه این کد رو اجرا کنیم نتیجه درست و دلخواهمون رو میگیریم.بذارین با `root1` اجرا کنیم و نتیجه رو ببینیم:


<p style="width: calc(100% + 60px);">
<img src="/assets/img/js/working-with-the-dom-part1/output5.png" />
</p>


خب همینطور که میبنین، همون نتیجه که میخواستیم رو گرفتیم و علاوه بر اون چون کامپایلر بهمون موقع کدنویسی ارور میده، خودمون قبل از اجرا متوجه میشیم و با استفاده از این عملگر از اجراش جلوگیری میکنیم.

حالا اگه توسعه­دهنده که ما باشیم بخواد اگه `null` دریافت کرد کار دیگه ای رو انجام بده(مثلا موقعی که `null` دریافت کرد یک رشته رو چاپ کنه) اون موقع باید چیکار کنه. کاتلین اینجا هم راه حل داره. کد زیر رو نگاه کنین:

</div>


```kotlin
fun main(args: Array<String>) {
    println("Hello, World!")

    val root = document.getElementById("root1")
    println("root is $root")
    root?.innerHTML = "<h1>Hello, World again!</h1>"

    println("The end")
}
```

<div dir="rtl" markdown="1">

در واقع یکی از خوبیای کاتلین اینه! کاتلین وقتی یک شی `null` رو برای `print` دریافت میکنه، مقدار `null` رو هم چاپ میکنه.یعنی میتونین نه تنها ارور `error` نمیده، بلکه میتونین ازش استفاده کنین.الان اگه این کد رو اجرا کنین نتیجه زیر رو میبینین:

<p style="width: calc(100% + 60px);">
<img src="/assets/img/js/working-with-the-dom-part1/output6.png" />
</p>

همینطور که میبینین مقدار `null` رو چاپ میکنه.

حالا بیاین کد `html` ای که میخوایم به `div` اضافه کنیم رو یکم مشکل­تر کنیم، یک کد چندخطی استفاده کنیم.

</div>


```kotlin
fun main(args: Array<String>) {
    println("Hello, World!")

    val message = "KotlinFarsi"

    val html = """
    <h1>Hello, World again!</h1>
    <p>KotlinFarsi contains ${message.length} letters</p>
                """
    val root = document.getElementById("root")
    root?.innerHTML = html

    println("The end")
}
```

<div dir="rtl" markdown="1">

توی این کد چندتا نکته جدید داریم. یکی این که از یک متغییر برای نوشتن کد چندخطی `html` استفاده کردیم و برای این که به کامپایلر بفهمونیم کدمون چندخطیه، کد `html` رو داخل یک جفت `"""` قرار دادیم. و همینطور فهمیدیم که اگه بخوایم میتونیم داخل رشته هم از مقدار یک متغیر استفاده کنیم. درواقع زمانی که از `{}$` استفاده میکنیم، کامپایلر هرچی داخل اکولادها بنویسین رو به عنوان یک کد حساب میکنه، نه رشته، و در انتها مقدار اون کدی که نوشتیم رو به صورت رشته چاپ میکنه.

خروجی کد بالا :

<p style="width: calc(100% + 60px);">
<img src="/assets/img/js/working-with-the-dom-part1/output7.png" />
</p>

حالا بیاین یک دکمه به html اضافه کنیم. دکمه ای که وقتی روش کلیک شد یک عبارت رو چاپ کنه


</div>

```kotlin
fun main(args: Array<String>) {
    println("Hello, World!")

    val message = "KotlinFarsi"

    val html = """
    <h1>Hello, World again!</h1>
    <p>KotlinFarsi contains ${message.length} letters</p>
    <button id="btn">Click Me</button>
                """
    val root = document.getElementById("root")
    root?.innerHTML = html
    val btn = document.getElementById("btn")
    btn?.addEventListener("click",{ println("Clicked") })

    println("The end")
}
```

<div dir="rtl" markdown="1">

اومدیم به متغییر html یک دکمه اضافه کردیم و توی کدمون یک `EventListener` و زمانی که برروی دکمه کلیک میشه “Clicked” توی کنسول به نمایش در میاد.

قبل از فشار دادن دکمه:

<p style="width: calc(100% + 60px);">
<img src="/assets/img/js/working-with-the-dom-part1/output8.png" />
</p>


و بعد از فشار دادن دکمه :


<p style="width: calc(100% + 60px);">
<img src="/assets/img/js/working-with-the-dom-part1/output9.png" />
</p>


همینطور که میبینین وقتی دکمه رو فشار دادیم Clicked چاپ شد.

</div>
