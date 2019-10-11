---
layout: tutorial
title: "ساختن یک پروژه جدید"
category: android
permalink: /tutorials/android/creating-a-new-project
editlink: https://github.com/KotlinFarsi/OpenSourceTutorials-Android/edit/master/src/creating-a-new-project/README.md
---


<div dir="rtl" markdown="1">



اگه تا حالا از اندروید استودیو و گردل استفاده کرده باشین این قسمت براتون ساده­یه . من نمیخوام خیلی اطلاعات زیادی یا اسکرین شاتی براتون بذارم، چون به مرور زمان UI تغییر میکنه و اون موقع این خط­ها معنی پیدا نمیکنن.


<div dir="rtl" markdown="1" id="ساختن-پروژه-در-اندروید-استودیو" >

## ساختن پروژه در اندروید استودیو

</div>

در اولین قدم اندروید استدیو رو باز کنین و روی دکمه Create New Project کلیک کنید.

نیازمند تصویر

اون ازتون میخواد که نام اپ رو وارد کنین.

نیازمند تصویر

بعد ازتون میپرسه که company Domain رو وارد کنین. چون شما این اپ رو منتشر نمیکنین، مهم نیست که چه عبارتی میخواین اونجا وارد کنین. و بعدش مشخص کنین که کجا میخواین اپتون رو ذخیره کنین

نیازمند تصویر

در مرحله بعد ازتون درباره کمترین مقدار API سوال میشه.ما API 15 رو انتخاب میکنیم چون یکی از لایبری هایی که ازش استفاده میکنیم حداقل API 15  رو داره.فعلا پلتفرم دیگه به غیر از Phone and Tablet رو انتخاب نکنین

نیازمند تصویر

و در انتها از ما خواسته میشه که یک نمونه پیش ساخته از activity که میخوایم رو انتخاب کنیم. بهتره که Empty Activity رو انتخاب کنیم چراکه بعدا  میخوام در مورد یک ویژگی خاص پلاگین کاتلین صحبت کنم.

نیازمند تصویر



<div dir="rtl" markdown="1" id="تنظیمات-گردل" >

## تنظیمات گردل

</div>

پلاگین کاتلین شامل ابزار هایی میشه که تنضیمات gradle رو برامون انجام میدن ولی من ترجیح میدم که کنترلی بر چیزی که در فایل گردلم مینویسم داشته باشم در غیر این صورت ممکنه کمی بهم ریخته بشن. به هرصورت این ایده خوبیه که بدونیم چجوری کارها انجام میشن قبل از این که از ابزار های اتومات استفاده کنیم، بنابراین این دفعه دستی کارمون رو انجام میدیم.
اولین کار اینه که فایل build.gradle امون رو پیدا کنیم که تقریبا میشه گفت شبیه اینه :

</div>

```groovy
buildscript {
    ext.support_version = '23.1.1'
    ext.kotlin_version = '1.1.3'
    ext.anko_version = '0.8.2'
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:1.5.0'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}
allprojects {
    repositories {
        jcenter()
    }
}
```

<div dir="rtl" markdown="1">

همینطور که میبینین ما داریم یک متغیر ایجاد میکنیم که ورژن درحال حاظر کاتلینمون رو بگه. حتما چک کنید که این ورژن با ورژن در حال حاظر استفاده شما یکی باشه.سعی کنید همیشه از اخرین ورژن استفاده کنید.ما به این شماره ورژن در چندین جا نیاز داریم.به عنوان مثال وقتی که از kotlin standard library استفاده میکنیم باید مشخص کنیم که از چه ورژنی استفاده میشه.
عین همین کار رو برای لایبری support و anko انجام میدیم.این بهمون این مزیت رو میده که از شماره ورژن­هامون هرجایی استفاده کنیم.
ما بعدا وابستگی هایی مثل kotlin standard library و anko library رو مثل kotlin و kotlin android extensions رو به برناممون اضافه میکنیم.

</div>

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
android {
    …
}
dependencies {
    compile "com.android.support:appcompat-v7:$support_version"
    compile "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    compile "org.jetbrains.anko:anko-common:$anko_version"
}
buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath "org.jetbrains.kotlin:kotlin-android-extensions:$kotlin_version"
    }
}
```

<div dir="rtl" markdown="1">

درواقع Anko یک کتابخونه است که با استفاده از قدرت Kotlin بعضی کارهارو برامن ساده­تر میکنه.این کتابخونه به چندین قسمت مختلف تقسیم شده تا اگر از قسمتی استفاده نمیکنیم الکی اونو به پروژه اضافه نکنیم.


<div dir="rtl" markdown="1" id="تبدیل-MainActivity-به-کد-کاتلین" >

## تبدیل MainActivity به کد کاتلین

</div>

یکی از ویژگی های منحصر به فردی که همراه پلاگین کاتلین میاد اینه که میتونه فایل جاوا رو به فایل کاتلین تبدیل کنه. به مانند همه ی فرآیندهای اتومات این فرآیند عالی نیست ولی این خیلی میتونه کمکمون کنه، مخصوصا در روز اول که به زبون کاتلین عادت نکردیم.

خب ما از این برای تبدیل فایل MainActivity.java مون به یک فایل کاتلین استفاده میکنیم. وقتی فایل رو باز کردین از قسمت بالا Code رو پیدا کنین و تقریبا اون آخرا دنبال Convert Java File to Kotlin File بگردین. پرسه انجام میشه و در انتها شما فایل کاتلین مورد نظرتون رو دارین. به تفاوت ها دقت کنین و با این زبون آشناتر بشین.


<div dir="rtl" markdown="1" id="تست-کارکردن-همه-اجزا" >

## تست کارکردن همه اجزا

</div>

اول لازمه که به فایل `activity_main.xml` مراجعه کنین و یک `id` برای `TextView` تون انتخاب کنین.

</div>

```xml
<TextView
    android:id="@+id/message"
    android:text="@string/hello_world"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"/>
```
<div dir="rtl" markdown="1">

حالا کافیه برگردین به MainActivity.java و در قسمت `()onCreate` این تغییرات رو بدین:

</div>

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    message.text = "Hello Kotlin!"
}
```

<div dir="rtl" markdown="1">

به لطف همکاری کاتلین با جاوا ما میتونین متدهای `setter` و `getter` رو به صورت خصیصه ای انجام بدیم.حالا بعدا بیشتر درباره خصیصه¬ها صحبت میکنیم ولی اینجا اگه دقت کنین به جای `()message.setText` مستقیم مقدار جدید رو به `text` دادیم.درواقع کامپایلر خودش بعدا از متد جاوای واقعی استفاده میکنه و این عملکرد رو خراب نمیکنه! فقط خوبیش برای ما توسعه دهنده هاست که با راحتی بیشتر کارامون رو انجام میدیم.

یک چیز دیگه هم فراموش کردم بهتون بگم.کو `findViewById` ایمون؟ کاتلین در واقع این اجازه رو میده که ما نیازی به Bind کردن کد جاوامون با فایل xml نداشته باشیم و به صورت مستقیم و با استفاده از `id` به اون کامپوننت دسترسی داشته باشیم. اینجا هم تنها کاری که لازم بود انجام بدیم اینه که message رو صدا بزنیم.

حالا اگه برنامه رو اجرا کنیم متوجه خواهیم شد که برنامه به درستی کار میکنه و مقدار جدید رو نشون میده.

</div>

