---
layout: tutorial
title: "کار با DOM - بخش دوم"
category: js
unit: 
chapter: 
---


<div dir="rtl" markdown="1">



این قسمت کوتاهه و مثل قسمت قبل طولانی نیست. توی این قسمت میخوایم همین کد قبلی رو بنویسیم منتهی به یک روش دیگه. کد زیر رو نگاه کنین:

</div>

```kotlin
fun main(args: Array<String>) {
    println("Hello, World!")

    val root = document.getElementById("root")

    val div = document.createElement("div")
    val h1 = document.createElement("h1")
    val btn = document.createElement("button")

    h1.textContent = "KotlinFarsi"
    btn.textContent = "Click on Me"
    btn.addEventListener("click", { println("Clicked 2") })

    div.appendChild(h1)
    div.appendChild(btn)

    root?.appendChild(div)

    println("The end")
}
```

<div dir="rtl" markdown="1">


فکر نمیکنم نیاز زیادی به توضیح باشه، ولی اینجا همون کاری که دفعه قبل انجام دادیم رو به یک روش دیگه انجام میدیم. با استفاده مستقیم از خصیصه textContent مستقیما مقدار text رو بهش دادیم و بعدش هم با استفاده از تابع appendChild دوتا عنصر رو به div دادیم و در انتها هم اون div رو به root دادیم. همین.

خب تا اینجا با دو روش آشنا شدیم که چجوری بتونیم از html داخل کدمون استفاده کنیم. توی قسمت بعد روش سومی رو میگم که از روش های قبلی باحال­تر و استفاده ازش توی ide راحت تره.

</div>
