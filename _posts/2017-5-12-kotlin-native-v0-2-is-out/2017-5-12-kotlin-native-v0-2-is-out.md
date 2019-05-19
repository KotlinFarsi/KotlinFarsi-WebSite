---
layout: post
title:  "کاتلین/نیتیو v0.2 بیرون آمد!"
date:   2017-05-12 00:00:00
categories: post
editlink: https://github.com/KotlinFarsi/KotlinFarsi-WebSite/edit/master/_post/2017-5-12-kotlin-native-v0-2-is-out/2017-5-12-kotlin-native-v0-2-is-out.md
author: "سینا درویشی"
---

<div dir="rtl" markdown="1">

> *این صفحه صرفا ترجمه شده [این مقاله](https://blog.jetbrains.com/kotlin/2017/05/kotlinnative-v0-2-is-out/) میباشد* 


> *یادآور شویم که در حال حاضر کاتلین نیتیو ورژن بالاتری را دارا است* 



ما خیلی خوشحالیم که اعلام کنیم کاتلین/نیتیو 0.2 منتشر شده است که به همراه یک ویژگی و فیکس شدن باگ های [بررسی تکنولوژی کاتلین نیتیو]() آمده است. در این آپدیت coroutines و توابع بین خطی cross-module ساپورت شده است و همچنین بسیاری از باگ ها اصلاح شده و بسیاری بهبود سازی صورت گرفته است.

این انتشار شامل تعدادی مثال مفید است که به عنوان مثال نحوه استفاده از coroutine ها در concourent non-blocking I/O توضیح داده شده و یا سورس [یک برنامه با رابط کاربری ساخته شده با GTK](https://github.com/JetBrains/kotlin-native/tree/master/samples/gtk) مثال زده شده است و همچنین [یک کلاینت یادگیری ماشین TensorFlow](https://github.com/JetBrains/kotlin-native/tree/master/samples/tensorflow) نیز مثال زده شده است.

به عنوان مثال، کد ساده ای مثل زیر:

</div>

```kotlin
var connectionId = 0
acceptClientsAndRun(listenFd) {
    memScoped {
        val bufferLength = 100L
        val buffer = allocArray<ByteVar>(bufferLength)
        val connectionIdString = "#${++connectionId}: ".cstr
        val connectionIdBytes = connectionIdString.getPointer(this)
        try {
            while (true) {
                val length = read(buffer, bufferLength)
                if (length == 0L) break
                write(connectionIdBytes, connectionIdString.size.toLong())
                write(buffer, length)
            }
        } catch (e: IOException) {
            println("I/O error occurred: ${e.message}")
        }
    }
}
```

<div dir="rtl" markdown="1">

میتونه در پردازش چندین Socket I/O ی همزمان با استفاده از coroutine ها و خدمت دادن به همه کلاینت ها به صورت کاملا مستقل و همزمان استفاده بشه!

و همچنین برای ساختن یک دکمه GTK به همراه یک event Listener، میشه اینجوری کد زد:

</div>


```kotlin
val button = gtk_button_new_with_label("Click me!")!!
g_signal_connect(button, "clicked",
staticCFunction { _: CPointer<GtkWidget>?, _: gpointer? -> println("Hi from Kotlin")}
)
```

<div dir="rtl" markdown="1">

بنابراین با استفاده از ورژن 0.2 میشه برنامه های ساده نوشته شده با کاتلین رو پیاده سازی کنید.

هم زمان تایم کامپایل و هم عملکرد در زمان اجرا به شدت بهبود پیدا کرده است و همچنین سایز بازنشردهنده (redistributable) نیز کاهش پیدا کرده است.

لیست تغییرات این انتشار رو میتونید در [changelog](https://github.com/JetBrains/kotlin-native/blob/v0.2.0/CHANGELOG.md) ببینید.

همچنین فایل های باینری از قبل کامپایل شده برای [Linux](http://download.jetbrains.com/kotlin/native/kotlin-native-linux-0.2.tar.gz) و [MacOS](http://download.jetbrains.com/kotlin/native/kotlin-native-macos-0.2.tar.gz) نیز در دسترس است.

</div>
