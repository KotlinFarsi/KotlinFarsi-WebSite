---
layout: tutorial
title: "Overloading Operators"
category: android
permalink: /tutorials/android/operators-overloading
editlink: https://github.com/KotlinFarsi/OpenSourceTutorials-Android/edit/master/src/operators-overloading/README.md
---


<div dir="rtl" markdown="1">



کاتلین تعداد مشخصی از آوپراتور های نمادین دارد که میتونیم به راحتی بر روی هر کلاسی استفاده کنیم. روشش هم ایجاد یک تابع با نام رزرو شده و مپ کردن اون به سمبله. Overload کردن این اوپراتور ها ساده نویسی و خانایی کد رو بیشتر کنه.

اگر بخوایم کامپایلر رو آگاه کنیم که یک اوپراتور رو میخوایم overload کنیم، باید اون تابع رو با اصلاح کننده  `operator` مشخص کنیم.

<div dir="rtl" markdown="1" id="جدول-اوپراتور-ها" >

## جدول اوپراتور ها

</div>

در جدول زیر هم میتونید یک سری از جدول ها رو ببینید  که شامل اوپراتورها و دستور العمل های مطابق آن است. یک تابع که پیاده سازی شده باشد برای استفاده از آن اوپراتور در کلاس مشخص نیاز است.

</div>

**Unary Operations**

|                |                               |
|----------------|-------------------------------|
|`+a`            |`a.unaryPlus()`                |
|`-a`            |`a.unaryMinus()`               |
|`!a`            |`a.not()`                      |
|`a++`           |`a.inc()`                      |
|`a--`           |`a.dec()`                      |


**Binary Operations**

|                |                               |
|----------------|-------------------------------|
|`a + b`         |`a.plus(b)`                    |
|`a - b`         |`a.minus(b)`                   |
|`a * b`         |`a.times(b)`                   |
|`a / b`         |`a.div(b)`                     |
|`a % b`         |`a.mod(b)`                     |
|`a..b`          |`a.rangTo(b)`                  |
|`a in b`        |`b.contains(a)`                |
|`a !in b`       |`!b.contains(a)`               |
|`a += b`        |`a.plusAssign(b)`              |
|`a -= b`        |`a.minusAssign(b)`             |
|`a *= b`        |`a.timesAssign(b)`             |
|`a /= b`        |`a.divAssign(b)`               |
|`a %= b`        |`a.modAssign(b)`               |

**Array-like operations**

|                       |                               |
|-----------------------|-------------------------------|
|`a[i]`                 |`a.get(i)`                     |
|`a[i, j]`              |`a.get(i, j)`                  |
|`a[i_1,..., i_n]`      |`a.get(i_1,..., i_n)`          |
|`a[i] = b`             |`a.set(i, b)`                  |
|`a[i, j] = b`          |`a.set(i, j, b)`               |
|`a[i_1,..., i_n] = b`  |`a.set(i_1, …, i_n, b)`        |


**Equals operation**

|                       |                                    |
|-----------------------|------------------------------------|
|`a == b`               |`a?.equals(b) ?: b === null`        |
|`a != b`               |`!(a?.equals(b) ?: b === null)`     |




<div dir="rtl" markdown="1">
عملگرهای `equals` مقداری متفاوتند، زیرا برای بهتر چک کردن تساوی از ترجمه ی پیچیده تری استفاده میکند که در نتیجه تابع باید دقیقا به صورت زیر پیاده سازی شود.

</div>

````kotlin
operator fun equals(other: Any?): Boolean
````

**Function invocation**

|                       |                                    |
|-----------------------|------------------------------------|
|`a(i)`                 |`a.invoke(i)`                       |
|`a(i, j)`              |`a.invoke(i, j)`                    |
|`a(i_1, …, i_n)`       |`a.invoke(i_1,..., i_n)`            |

<div dir="rtl" markdown="1">

<div dir="rtl" markdown="1" id="یک-مثال" >

## یک مثال

</div>

همانطور که تصور میکنید لیست های کاتلینی عملگرهای array-like ای به مانند بالا که گفته شده را دارا میباشد که در نتیجه به مانند جاوا میتونیم به آیتم های یک لیست دسترسی داشته باشیم ولی این تنها به این محدود نمیشود و در لیست های mutable (تغییرپذیر)، هر آیتم میتونه به صورت مستقیم مقدار دهی بشه.

</div>

```kotlin
val x = myList[2]
myList[2] = 4
```

<div dir="rtl" markdown="1">

اگر به یاد داشته باشید، کلاس دیتایی به نام `ForecastList` داشتیم که تشکیل شده از یک لیست با مقداری اطلاعات اضافی بود. اگه به جای این که درخواستی به لیست های داخلی برای بدست آوردن یک آیتم از اون بکنیم، به آیتم ها مستقیما دسترسی داشته باشیم، جالب تر خواهد بود. در ضمن، یک تابع به نام `size()` رو هم پیاده سازی میکنیم که آداپتور فعلی را ساده تر خواهد کرد.

</div>

```kotlin
data class ForecastList(val city: String, val country: String,
                        val dailyForecast: List<Forecast>) {
    operator fun get(position: Int): Forecast = dailyForecast[position]
    fun size(): Int = dailyForecast.size
}
```

<div dir="rtl" markdown="1">

که این `onBindViewHolder` امون رو رو مقداری ساده تر خواهد کرد.

</div>

```kotlin
override fun onBindViewHolder(holder: ViewHolder, position: Int) {
    with(weekForecast[position]) {
        holder.textView.text = "$date - $description - $high/$low"
    }
}
```

<div dir="rtl" markdown="1">

همچنین `getItemCount()` نیز:

</div>

```kotlin
override fun getItemCount(): Int = weekForecast.size()
```
<div dir="rtl" markdown="1">

<div dir="rtl" markdown="1" id="عملگرها-در-توابع-الحاقی" >

## عملگرها در توابع الحاقی

</div>

لازم نیست که به کلاس های خودمون بسنده کنیم و میتونیم کلاس هامون رو با استفاده از توابع الحاقی گسترش بدیم. به عنوان مثال میتونیم مثل روش دستیابی به لیست ها، به `ViewGroup` هامون هم دستیابی داشته باشیم:

</div>

```kotlin
operator fun ViewGroup.get(position: Int): View
        = getChildAt(position)
```

<div dir="rtl" markdown="1">

حالا میتونیم خیلی ساده `View` مورد نظر رو از `ViewGroup` با استفاده از `position` به دست بیاریم.

</div>

```kotlin
val container: ViewGroup = find(R.id.container)
val view = container[2]
```







