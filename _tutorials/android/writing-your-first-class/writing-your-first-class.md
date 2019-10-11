---
layout: tutorial
title: "نوشتن اولین کلاس"
category: android
permalink: /tutorials/android/writing-your-first-class
editlink: https://github.com/KotlinFarsi/OpenSourceTutorials-Android/edit/master/src/writing-your-first-class/README.md
---


<div dir="rtl" markdown="1">



خب ما تا الان فایل `MainActivity.kt` مون رو درست کردیم.ولی اگه یادتون باشه قرار بود یک اپ پیشبینی آب و هوا درست کنیم و باید توی صفحمون از پیشبینی آب و هوای هفته بعد گفته بشه پس نیاز به یک سری تغییرات داریم.

<div dir="rtl" markdown="1" id="ساختن-layout" >

## ساختن layout

</div>

بهترین `view` که میتونه لیست پیش بینی آب و هوا بسازه یک `RecyclerView` هه و بنابراین به یک وابستگی نیازمنده.بنابراین نیاز داریم که `build.gradle` رو تغییر بدیم:


</div>

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile "com.android.support:appcompat-v7:$support_version"
    compile "com.android.support:recyclerview-v7:$support_version"
    // ...
}
```

<div dir="rtl" markdown="1">

و حالا بریم سر `activity_main.xml` و اونو تغییر بدیم:

</div>

```xml
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <android.support.v7.widget.RecyclerView
        android:id="@+id/forecast_list"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>
</FrameLayout>
```
<div dir="rtl" markdown="1">

داخل `MainActivity.kt` اون خط کدی که نوشتیم برای تست رو پاک میکنیم.همینطور که گفتیم اگه بخوایم کامپوننتی رو از توی `xml` صدا بزنیم کافیه از `id`یش استفاده کنیم.ولی فعلا به همون روش قدیمی استفاده از `findViewById` ادامه میدیم:

</div>

```kotlin
val forecastList = findViewById(R.id.forecast_list) as RecyclerView
forecastList.layoutManager = LinearLayoutManager(this)
```

<div dir="rtl" markdown="1">

همینطور که میبینین ما یک متغیر تعریف کردیم و به RecyclerView کستش کردیم.و همچنین به جای setter خودمون مستقیم به layoutManager دسترسی پیداکردیم.یک لیست برای این layout کافیه پس به استفاده از یک LinearLayoutManager بسنده کردیم.

_**نمونه سازی:** اگه دقت کنین اینجا دیگه از کلیدواژه `new` استفاده نشد! در واقع برای ساختن یک شی دیگه نیازی به استفاده از `new` نیست تنها کافیه از نام کلاس و سازنده اش استفاده بشه._

<div dir="rtl" markdown="1" id="آداپتور-Recycler" >

## آداپتور Recycler

</div>

همینطور که متوجه شدین اینجا نیازمند یک اداپتور برای `RecyclerView` مون هستیم.فعلا تنها از یک `TextView` برای `RecyclerView` استفاده میکنیم. یک لیست ساده از `text` ها چیزیه که فعلا بهش نیاز داریم.لازمه که یک فایل کاتلین به نام `ForecastListAdapter.kt` باز کنیم و کدهای زیر رو داخلش بزنیم:

</div>

```kotlin
class ForecastListAdapter(val items: List<String>) :
        RecyclerView.Adapter<ForecastListAdapter.ViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int):
            ViewHolder {
        return ViewHolder(TextView(parent.context))
    }
    override fun onBindViewHolder(holder: ViewHolder,
                                  position: Int) {
        holder.textView.text = items[position]
    }
    override fun getItemCount(): Int = items.size
    class ViewHolder(val textView: TextView) : RecyclerView.ViewHolder(textView)
}
```

<div dir="rtl" markdown="1">

برگردیم به `MainActivity`، حالا لازمه که یک لیست از رشته ها درست کنیم و بعدا به آداپتورمون بدیم:

</div>

```kotlin
private val items = listOf(
        "Mon 6/23 - Sunny - 31/17",
        "Tue 6/24 - Foggy - 21/8",
        "Wed 6/25 - Cloudy - 22/17",
        "Thurs 6/26 - Rainy - 18/11",
        "Fri 6/27 - Foggy - 21/10",
        "Sat 6/28 - TRAPPED IN WEATHERSTATION - 23/18",
        "Sun 6/29 - Sunny - 20/7"
)
override fun onCreate(savedInstanceState: Bundle?) {
    // ...
    val forecastList = findViewById(R.id.forecast_list) as RecyclerView
    forecastList.layoutManager = LinearLayoutManager(this)
    forecastList.adapter = ForecastListAdapter(items)
}
```

<div dir="rtl" markdown="1">

اگر مفهومی رو از کالکشن و لیستمون متوجه نشدین نگران نباشین، بعدا راجع بهش صحبت میکنیم.فعلا فقط بدونین که یک لیست غیرقابل تغییر رو با استفاده از تابع `listOf()` میتونیم درست کنیم.اون ازمون یک آرایه از ورودی ها میگیره و برامون لیست رو درست میکنه.تابع های دیگه ای هم هستن که تقریبا همین کار رو انجام میدن  ولی خب بعدا راجبشون صحبت میکنیم.

</div>




