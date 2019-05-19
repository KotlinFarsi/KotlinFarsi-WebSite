---
layout: post
title:  "استفاده از کاتلین به همراه npm، webpack و react"
date:   2017-04-18 00:00:00
categories: post
editlink: https://github.com/KotlinFarsi/KotlinFarsi-WebSite/edit/master/_post/2017-4-18-use-kotlin-with-npm-webpack-and-react/2017-4-18-use-kotlin-with-npm-webpack-and-react.md
author: "سینا درویشی"
---

<div dir="rtl" markdown="1">

> *این صفحه صرفا ترجمه شده [این مقاله](https://blog.jetbrains.com/kotlin/2017/04/use-kotlin-with-npm-webpack-and-react/) میباشد* 



همینطور که میدونید در نسخه 1.1 کاتلین، قابلیت نوشتن کد کاتلین و کامپایل به جاوا اسکریپت ممکن شد. البته که داشتن پشتیبانی کامپایلر به تنهایی نمیتونه مشکلاتی که در واقعیت بهش میخوریم رو برطرف کنه، بنابراین درنظر این شدیم که کاتلین رو به داخل اکوسیستم های بزرگتری وارد کنیم.

امروز مفتخریم که دو پروژه جدید رو برای شما پرزنت کنیم: یک پلاگین Gradle که کاتلین رو همراه npm و webpack و Karma کرده و یک برنامه نمونه full-stack که در بک اند از Kotlin/JVM استفاده میکنه و از Kotlin/JS برای React در فرانت اند استفاده میکنه.



**پلاگین فرانت اند کاتلین:**

[پلاگین فرانت اند کاتلین](https://github.com/Kotlin/kotlin-frontend-plugin) این امکان رو میده که بتونیم یک برنامه فرانت اند کاتلین رو به کمک webpack بسازیم و دیپلوی کنیم همچنین میتونیم پکیج های npm رو به صورت وابستگی یک برنامه اجرا کنیم و سپس پلاگین مسئولیت دانلود و به همراه کردن اونها برای ساختن فایل JS دلخواه به عهده میگیره. همچنین برای بهبود کاربری این پلاگین کامپایل های پشت سر هم و hot-reload رو نیز انجام میده که بتونیم همواره اخرین ورژن از برنامه رو در مرورگر خودمون ببینیم.

فایل [README](https://github.com/Kotlin/kotlin-frontend-plugin/blob/master/README.md) به شما نحوه استفاده از این پلاگین رو نشون میده و همچنین فولدر سمپیل شامل [نمونه های ساده](https://github.com/Kotlin/kotlin-frontend-plugin/tree/master/examples/frontend-only) است که به شما نحوه اجرا برروی برنامه های واقعی رو نشون میده.



**مثال Kotlin-React :**

[Thinkter](https://github.com/Kotlin/kotlin-fullstack-sample) یک نمونه برنامه full-stack هه که به صورت کامل با Kotlin پیاده سازی شده. بک اند تحت Jetty اجرا میشه و از [Ktor](https://github.com/kotlin/ktor) استفاده میکنه که یک فریمورک وب کاتلینه که توسط تیم کاتلین توسعه داده شده. فرانت اند از React استفاده میکنه. شما میتونید از این Wrapper ها استفاده کنید و یا به دلخواه خودتون تغییرشون بدین.

برای این که ببنید کد React-Kotlin چگونه کار میکنه، میتونید [یک کامپوننت](https://github.com/Kotlin/kotlin-fullstack-sample/blob/master/frontend/src/org/jetbrains/demo/thinkter/NewThoughtComponent.kt) برنامه رو ببینید.

برای آشنا شدن با نحوه عملکرد Kotlin/JS میتونید [دوره مرورگر کاتلین فارسی](https://kotlinfarsi.com/courses/) رو مشاهده کنید.

</div>
