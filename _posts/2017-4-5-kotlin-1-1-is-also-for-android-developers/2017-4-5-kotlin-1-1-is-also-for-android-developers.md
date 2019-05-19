---
layout: post
title:  "کاتلین 1.1 برای توسعه دهنده های اندروید"
date:   2017-04-05 00:00:00
categories: post
editlink: https://github.com/KotlinFarsi/KotlinFarsi-WebSite/edit/master/_post/2017-4-5-kotlin-1-1-is-also-for-android-developers/2017-4-5-kotlin-1-1-is-also-for-android-developers.md
author: "سینا درویشی"
---

<div dir="rtl" markdown="1">

>  _این صفحه صرفا ترجمه شده [این مقاله](https://blog.jetbrains.com/kotlin/2017/04/kotlin-1-1-is-also-for-android-developers/) میباشد_ 

همه ما بابت انتشار نسخه 1.1 کاتلین خوشحالیم. ویژگی هایی که این انتشار دربر داره برای توسعه دهنده های JAVA خیلی مفید میتونه باشه و میتونه مارو به جهان جدیدی از توانمندی های توسعه JVM راهنمایی کنه.

استفاده از ویژگی هایی به مانند Coroutines و یا  Type Aliases در توسعه برنامه های اندرویدی میتونه خیلی علمی تخیلی به نظر بیاد.

ما توسعه دهنده های اندروید هنوز درگیر JAVA 6 قدیمی هستیم که تنها کمی بهبود یافته و این مارو مجبور میکنه که برنامه هامون رو به روش هایی توسعه بدیم که در پلتفرم های دیگه فراموش شده باشه.

و سوال عاقلانه این به نظر میاد که "آیا تیم توسعه کاتلین تونستن تموم ویژگی های این زبون رو همراه با همکاری با JAVA 6 حفظ کنن؟" و جواب اینگونه است : "البته".

امروز میخوام بهتون بگم که چه طور تموم اون ویژگی های جدید زبان کاتلین به JAVA 6 پورت شده و چگونه بتونیم به راحتی هرچه تمام تر برنامه های اندروید رو توسعه بدیم.



**Type Aliases : میتونید listener هاتون رو خوانا تر بکنید**

البته که type aliases خیلی کاربردهای دیگه هم داره ولی اولین چیزی که به نظرم اومد که چه قدر میتونه listener هارو خواناتر کنه و همچنان از lambda ها بهره ببریم.

اگر تا حالا در مورد [type aliases](https://github.com/Kotlin/KEEP/issues/4) چیزی نشنیدین، باید بگم که در واقع یک روش هستش که تایپ های پیچیده خواناتر بشن.

به عنوان مثال، شما میتونید یک RecyclerViewadapter داشته باشین که یک listener قبول کنه و همینطور که میدونید RecyclerView یک روش استاندارد به مانند ListView برای کلیک برروی آیتم ها نداره، بنابراین ما باید روش خودمون رو پیاده سازی کنیم.

بذارین فرض کنیم که ما یک listener ای میخوایم که به view دسترسی داشته باشه. کلاس آداپتورمون میتونه اینجوری باشه :
</div>


```kotlin
class MyAdapter(val items: List<Item>, val listener: (View) -> Unit) : RecyclerView.Adapter<MyAdapter.ViewHolder>() {
    //...
}
```


<div dir="rtl" markdown="1">

و همچنین ViewHolder امون هم که اون listener رو دریافت کنه، که بتونه اونو به listener کلیکمون بده:

</div>


```kotlin
class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
    fun bind(item: Item, listener: (View) -> Unit) {
        itemView.setOnClickListener(listener)
    }
}
```

<div dir="rtl" markdown="1">

همینطور که میبینین خیلی کار پیچیده ای نیست، ولی ما باید اون عبارت Lambda رو تکرار کنیم که مقداری در خوانش ممکنه مارو دچار مشکل کنه.

ولی ما میتونیم یک type aliases تولید میکنیم که به عنوان یک listener برای هندل کردن کلیک میاد:

</div>

```kotlin
typealias ClickListener = (View) -> Unit
```

<div dir="rtl" markdown="1">

و هرجا که بخوایم میتونیم اون listener رو استفاده کنیم :

</div>

```kotlin
class MyAdapter(val items: List<Item>, val listener: ClickListener)
```
<div dir="rtl" markdown="1">

یا:

</div>

```kotlin
fun bind(item: Item, listener: ClickListener) { /*...*/ }
```

<div dir="rtl" markdown="1">

**کلاس های دیتا خیلی قدرتمند شدن:**

کلاس های دیتا در جایی که میخواین از بیهوده کدنویسی جلوگیری کنین خیلی مفیدن ولی در بعضی مواقع، یکسری قدرت هارو کم داشتن که باعث میشدن اونجاها نتونیم ازشون استفاده کنیم.

یکی از ویژگی های جدیدی که با کاتلین 1.1 وارد شد ارث پذیریه. حالا کلاس های دیتا میتونن از کلاس های دیگه ارث بری کننکه این اجازه رو به ما میده که کلاس های دیتامون بخشی از کلاس های sealed شدمون باشن:

</div>

```kotlin
sealed class UiOp {

    object Show : UiOp()

    object Hide : UiOp()

    data class Translate(val axis: Axis, val amount: Int): UiOp()

}
```
<div dir="rtl" markdown="1">

و حالا کلاس های sealed شدمون میتونن خارج از کلاس های پدرشون تعریف شن:

</div>


```kotlin
sealed class UiOp

object Show : UiOp()

object Hide : UiOp()

data class Translate(val axis: Axis, val amount: Int)
```


<div dir="rtl" markdown="1">

**تجزیه پذیری داخل عبارت های Lambda :**



به لطف تابع componentX() کلاس های دیتامون از همون ورژن های اولیه قابل تجزیه شدن بودن، شما میتونید مقادیر مختلف رو به متغیر های داخل کلاس دیتا بدین:

</div>

```kotlin
data class Item(val text: String, val url: String)



val (text, url) = item
```
<div dir="rtl" markdown="1">

قبلا شما نمیتونستید این عمل رو برروی توابع لاندا انجام بدین، این در حالی است که این کار ممکن شده :

</div>

```kotlin
fun bind(item: Item) = item.let { (text, url) ->

    textView.text = text

    imageView.loadUrl(url)

}
```

<div dir="rtl" markdown="1">

**متغیر های نماینده شده ی محلی (Local Delegated Properties):**

مطمعنا متغیر های نماینده شده یکی از قابلیت های عالی اضافه شده به کلاس هامون هستن.

به عنوان مثال میتونیم از Lazy Delegation نام ببریم که یکی از پرکاربرد ترین هاست  که مقدار دهی به متغیر رو تا اولین زمان استفاده ازش به تاخیر میندازه. و حالا این قابلیت رو میتونیم در برنامه نویسی اندروید استفاده کنیم. به عنوان مثال:

</div>


```kotlin
fun testLocalDelegation() {

    val database by lazy { createDatabase() }

    val cache by lazy { createMemoryCache() }



    if (mustUseDatabase()) {

        database.use { ... }

    } else {

        cache.use { ... }

    }

}
```

<div dir="rtl" markdown="1">

البته این مثال تنها برای اشاره به مفهوم بود و البته که میتونیم این مثال رو بدون این قابلیت هم انجام بدیم.

بعضی مواقع هست که ما متغیری داریم که مقدار دهی بهش خیلی زمان بره و یا فضای زیادی اشغال میکنه و یا به اصطلاح یک متغیر سنگین به حساب میاد و ما ندونیم که آیا این متغیر از همون ابتدا استفاده میشه یا نه، با استفاده از lazy ما میتونیم مطمئن باشیم زمانی که این متغیر استفاده میشه مقدار دهی شده.

دفعه اولی که استفاده میشه، کد داخل آکولاد ها اجرا میشه و مقدارش cache میشه برای زمانی که دفعه بعد بخواد استفاده بشه.

**تعریف کردن متغیر های بی استفاده در عبارت های Lambda رو فراموش کنید:**

این خیلی عادی بود که ما متغیر هایی رو در عبارت لاندا تعریف کنیم که در انتها هیچ استفاده ای ازشون نمیشه.

به عنوان مثال در این مقاله من زمانی که داشتم در مورد RecyclerView صحبت میکردم به این کد رسیدم:

</div>

```kotlin
var items: List<Content> by Delegates.observable(emptyList()) {

    prop, old, new ->

    autoNotify(old, new) { o, n -> o.id == n.id }

}
```
<div dir="rtl" markdown="1">

متغیر prop هیچ وقت استفاده نشد، حالا در ورژن جدید شما میتونید این متغیر رو تعریف نکنید:

</div>


```kotlin
var items: List<Content> by Delegates.observable(emptyList()) {

    _, old, new ->

    autoNotify(old, new) { o, n -> o.id == n.id }

}
```
<div dir="rtl" markdown="1">

و این زمانی به درد میخوره که گاهی ما تعداد بیشماری متغیر ورودی داشتیم و در انتها هیچ استفاده ای ازشون نمیشد، حالا ما میتونیم اینجوری ارشون استفاده کنیم:

</div>

```kotlin
var items: List<Item> by Delegates.observable(emptyList()) {

    _, _, _ ->

    notifyDataSetChanged()

}
```
<div dir="rtl" markdown="1">

این مورد نه تنها باعث میشه که کمتر کد بنویسیم، بلکه باعث میشه که کدمون خواناتر باشه.



**Coroutine ها:**

Coroutine ها یکی از هیجان انگیزترین خبرهایی بود که در کاتلین 1.1 استفاده شد.

Coroutine ها به ما این اجازه رو میده که کد های آسنکرون رو به صورت سنکرونی استفاده کنیم که این اجازه رو بهمون میده که بتونیم یک اجرا رو معلق کنیم و صبر کنیم تا نتیجه ای ظاهر شه، دقیقا به مانند کد های آسنکرون ولی در واقع ما یک کد سنکرون نوشتیم.

یک چیزی که شما ممکنه درباره coroutine های کاتلین بدونین اینه که این ویژگی یک کتابخونه نیست و لازم نیست که پیاده سازی خاصی رو داشته باشیم و این درحالیه که این ویژگی تنها یکی از قابلیت های این زبان حساب میشه که میتونیم کتابخانه ها زیادی رو براش بنویسیم.

و خوشبختانه کتابخانه های زیادی ساخته شده که این قابلیت رو برای اندروید شخصی سازی کرده اند به عنوان مثال کتابخانه های زیر رو در نظر بگیرین :

ابتدا کتابخانه های رسمی شرکت Jetbrains :

* [kotlinx-coroutines-android](https://github.com/Kotlin/kotlinx.coroutines/tree/master/ui/kotlinx-coroutines-android) : که این ویژگی رو آماده استفاده برای اندروید کرده است.

* [Anko](https://github.com/Kotlin/anko) : که این ویژگی درش استفاده شده.

و تعداد زیادی کتابخانه های افراد دیگه که پیاده سازی خاص خودشون رو داشتن :

* [AsyncAwait-Android by Niek Haarman](https://github.com/nhaarman/AsyncAwait-Android)

- [Async / Await by Metalab](https://github.com/metalabdesign/AsyncAwait)

* [kotlin-coroutines-retrofit by Andrey Mischenko](https://github.com/gildor/kotlin-coroutines-retrofit)

 

در انتها لازمه که اگر دوست داشتین برنامه نویسی کاتلین رو برای اندروید از ابتدا یاد بگیرین در این دوره شرکت کنین.

</div>
