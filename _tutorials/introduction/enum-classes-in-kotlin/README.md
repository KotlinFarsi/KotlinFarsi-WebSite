---
layout: tutorial
title: "کلاس های enum در کاتلین"
category: introduction
permalink: /tutorials/introduction/enum-classes-in-kotlin/
editlink: https://github.com/KotlinFarsi/OpenSourceTutorials-Introduction/edit/master/src/enum-classes-in-kotlin/README.md
---


<div dir="rtl" markdown="1">



رسیدم به بخش Enum که ساختشون راحت و استفاده ازشون راحت تر. به عنوان مثال کد زیر رو نگاه کنید.

</div>

```kotlin
enum class Priority {
    MINOR,
    NORMAL,
    MAJOR,
    CRITICAL
}

fun main(args: Array<String>) {
    val priority = Priority.NORMAL

    println(priority)
}
```

<div dir="rtl" markdown="1">

خب حالا اگه من بیام و priority رو پرینت کنم چی میشه؟ ( با فشار دادن دکمه اجرا میتونین نتیجه رو ببینین)

در اینجا کاتلین به صورت دیفالت میاد و مقدار اون enum رو به String تبدیل و چاپ میکنه.

<p style="width: calc(100% + 60px);">
<img src="/assets/img/introduction/enum-classes-in-kotlin/result-1.PNG" />
</p>

خب حالا فرض کنین میخوایم هر کدوم از enum هامون یک مقدار داشته باشن، یعنی یک خصیصه داشته باشیم به نام value و مثلا وقتی به NORMAL دسترسی پیدا کردیم، مقدار اونو بخونیم.

</div>

```kotlin
enum class Priority(val value : Int ) {
    MINOR(-1),
    NORMAL(0),
    MAJOR(1),
    CRITICAL(10)
}

fun main(args: Array<String>) {
    val priority = Priority.NORMAL

    println(priority.value)
}
```

<div dir="rtl" markdown="1">

همچنین ما میتونیم از کامپایلر بخوایم که بهمون بگه این enum ای که ما میخوایم بهش دسترسی داشته باشیم چندمین enum توی کلاس خودشه.

</div>

```kotlin
enum class Priority(val value : Int ) {
    MINOR(-1),
    NORMAL(0),
    MAJOR(1),
    CRITICAL(10)
}

fun main(args: Array<String>) {
    val priority = Priority.NORMAL

    println(priority)
    println(priority.value)

    println(priority.ordinal)
}
```

<div dir="rtl" markdown="1">

همچنین ما خصیصه name رو داریم

</div>

```kotlin
enum class Priority(val value : Int ) {
    MINOR(-1),
    NORMAL(0),
    MAJOR(1),
    CRITICAL(10)
}

fun main(args: Array<String>) {
    val priority = Priority.NORMAL

  println(Priority.CRITICAL.name)

}
```

<div dir="rtl" markdown="1">

که اگه برنامه ران بشه، بهمون CRITICAL رو برمیگردونه.

فرض کنین که میخوایم تموم enum های داخل کلاس رو لیست کنیم

</div>

```kotlin
enum class Priority(val value : Int ) {
    MINOR(-1),
    NORMAL(0),
    MAJOR(1),
    CRITICAL(10)
}

fun main(args: Array<String>) {

     for(priorityInList in Priority.values())
             println(priorityInList)
}
```

<div dir="rtl" markdown="1">

درواقع تابع values() میاد و یک لیست از تمومی مقدار های داخل کلاس Priority رو بهمون میده.

<p style="width: calc(100% + 60px);">
<img src="/assets/img/introduction/enum-classes-in-kotlin/result-3.PNG" />
</p>

اگه فرض کنیم بخوایم با استفاده از کلاس به مقدار یک enum دسترسی داشته باشیم از تابع valueOf() استفاده میکنیم

</div>

```kotlin
enum class Priority(val value : Int ) {
    MINOR(-1),
    NORMAL(0),
    MAJOR(1),
    CRITICAL(10)
}

fun main(args: Array<String>) {

     val p = Priority.valueOf("MAJOR")
     println(p)
}
```

<div dir="rtl" markdown="1">

خب همونطور که دیدید وقتی یکی از enum هارو پرینت میکنیم در واقع نام اون enum رو برامون پرینت میکنه، همون کاری که با متغیر name انجام میدیم، ولی من میتونم بیام و تابع toString رو override کنم

</div>

```kotlin
enum class Priority(val value : Int ) {
    MINOR(-1){
        override fun toString(): String {
            return "Minor priority"
        }
    },
    NORMAL(0),
    MAJOR(1),
    CRITICAL(10)
}

fun main(args: Array<String>) {

     val priority = Priority. MINOR

    println(priority)
}
```

<div dir="rtl" markdown="1">

خب، تا اینجا یاد گرفتیم چگونه از توابع و خصیصه های enum استفاده کنیم، حالا بیایم و یک تابع داخل enum بنویسیم

ابتدا بیایم یک abstract داخل enum درست کنیم.

</div>

```kotlin
enum class Priority(val value : Int ) {
    MINOR(-1){
        override fun toString(): String {
            return "Minor priority"
        }
    },
    NORMAL(0),
    MAJOR(1),
    CRITICAL(10)    // بر روی این خط، هشداری دریافت خواهید کرد

    abstract fun text(): String
}

fun main(args: Array<String>) {

     val priority = Priority. MINOR

    priority.text()
}
```

<div dir="rtl" markdown="1">

خب اگه این کد رو بزنید متوجه میشید که کامپایلر بهتون ارور میده. یادتونه که گفتم یک جا هست که شما نیاز به نقطه ویرگول دارین ؟ اون اینجاست، بعد از اخرین enum یک نقطه ویرگول بذارین.

</div>

```kotlin
enum class Priority(val value : Int ) {
    MINOR(-1){
        override fun toString(): String {
            return "Minor priority"
        }
    },
    NORMAL(0),
    MAJOR(1),
    CRITICAL(10);

    abstract fun text(): String
}
```

<div dir="rtl" markdown="1">

درواقع وقتی شما حتی این نقطه ویرگول رو هم بذارید بازم کامپایلر بهتون ارور میده، البته نه این که ما کار اشتباهی کردیم، بلکه خب اینجا ما دوتا ارور داشتیم. توجه کنین که ما متد abstract رو درست کردیم، پس باید برای همه ی enum های داخل این کلاس این متد رو override کنیم.

</div>

```kotlin
enum class Priority(val value : Int ) {
    MINOR(-1){
        override fun text(): String {
            TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
        }

        override fun toString(): String {
            return "Minor priority"
        }
    },
    NORMAL(0) {
        override fun text(): String {
            TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
        }
    },
    MAJOR(1) {
        override fun text(): String {
            TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
        }
    },
    CRITICAL(10) {
        override fun text(): String {
            TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
        }
    };

    abstract fun text(): String
}
```

<div dir="rtl" markdown="1">

خب حالا تنها کاری که باید بکنید اینه که برای هر enum بگید تابع مورد نظرتون میخواد چیکار انجام بده و تمام

</div>

