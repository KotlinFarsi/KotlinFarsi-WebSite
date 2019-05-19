---
layout: post
title:  "ورژن Kotlin/Native 0.3 بیرون آمد!"
date:   2017-06-22 00:00:00
categories: post
editlink: https://github.com/KotlinFarsi/KotlinFarsi-WebSite/edit/master/_post/2017-6-22-kotlin-native-v0-3/2017-6-22-kotlin-native-v0-3.md
author: "سینا درویشی"
---

<div dir="rtl" markdown="1">

> *این صفحه صرفا ترجمه شده [این مقاله](https://blog.jetbrains.com/kotlin/2017/06/kotlinnative-v0-3-is-out/) میباشد* 

>  *یادآور شویم که در حال حاضر Kotlin/Native [ورژن بالاتری](https://github.com/JetBrains/kotlin-native/releases) را دارا است* 


ما خوشحالیم که اعلام کنیم نسخه 0.3 Kotlin/Native انتشار پیدا کرده است. ما میخوایم بر روی سرزمین دیگه فرود بیایم! با انتشار نسخه 0.3 ویندوز به عنوان هم نسخه ای که میتونیم بر روش کامپایل رو انجام بدیم و هم نسخه ای که میتونیم بر روش اجرا کنیم پشتیبانی میشه و هم چنین دستگاه های اندروید گوگل برای اجرای activity های Native هم پشتیبانی میشه. به عنوان مثال Hello, KotlinFarsi! رو میتونیم در کاتلین اینجوری نشون بدیم:

</div>

```kotlin
import win32.*
fun main(args: Array<String>) {
    MessageBoxW(null, "Hello, KotlinFarsi!","ok", MB_YESNOCANCEL or MB_ICONQUESTION)
}
```

<div dir="rtl" markdown="1">

و همچنین پردازش یک activity ی Native در اندروید اینجوری به نظر میاد:

</div>

```kotlin
if (AInputQueue_getEvent(queue, event.ptr) < 0) {
    logError("Failure reading input event")
    return
}
if (AInputEvent_getType(event.value) == AINPUT_EVENT_TYPE_MOTION) {
    when (AKeyEvent_getAction(event.value) and AMOTION_EVENT_ACTION_MASK) {
        AMOTION_EVENT_ACTION_DOWN -> {
            animating = false
            currentPoint = getEventPoint(event.value, 0)
            startTime = getEventTime(event.value)
            startPoint = currentPoint
        }
        AMOTION_EVENT_ACTION_UP -> {
            val endPoint = getEventPoint(event.value, 0)
            val endTime = getEventTime(event.value)
            ....
        }
        AMOTION_EVENT_ACTION_MOVE -> {
            val numberOfPointers = AMotionEvent_getPointerCount(event.value).toInt()
            for (i in 0 until numberOfPointers)
                move(getEventPoint(event.value, i))
        }
    }
    AInputQueue_finishEvent(queue, event.value, 1)
```

<div dir="rtl" markdown="1">

**دیباگ کردن:**

در این ورژن ما source level debugging (single-stepping only) رو پشتیبانی میکنیم. به عنوان مثال این رو امتحان کنید:

</div>

```powershell
$ bin/konanc string0.kt  -g -o string0
$ lldb ./string0.kexe
(lldb) target create "string0.kexe"
Current executable set to 'string0.kexe' (x86_64).
(lldb) b string0.kt:1
Breakpoint 1: where = string0.kexe`kfun:main(kotlin.Array<kotlin.String>) + 4 at string0.kt:1, address = 0x0000000100001344
(lldb) r
Process 12288 launched: '/Users/jetbrains/kotlin/kotlin-native-release/kotlin-native/string0.kexe' (x86_64)
Process 12288 stopped
* thread #1, queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
frame #0: 0x0000000100001344 string0.kexe`kfun:main(kotlin.Array<kotlin.String>) at string0.kt:1
-> 1       fun main(args: Array<String>) {
    2           val str = "hello"
    3           println(str.equals("HElLo", true))
    4           val strI18n = "Привет"
    5           println(strI18n.equals("прИВет", true))
    6           println(strI18n.toUpperCase())
    7           println(strI18n.toLowerCase())
    (lldb) s
            Process 12288 stopped
    * thread #1, queue = 'com.apple.main-thread', stop reason = step in
    frame #0: 0x0000000100001354 string0.kexe`kfun:main(kotlin.Array<kotlin.String>) at string0.kt:3
    1       fun main(args: Array<String>) {
        2           val str = "hello"
        -> 3           println(str.equals("HElLo", true))
        4           val strI18n = "Привет"
        5           println(strI18n.equals("прИВет", true))
        6           println(strI18n.toUpperCase())
        7           println(strI18n.toLowerCase())

```

<div dir="rtl" markdown="1">

**کتابخانه ها :**

خب در اخر ما میخوایم بهتون فرمت جدیدی از کتابخونه ها به نام .klib رو معرفی کنیم که قراره فرمت پیشفرض کتابخانه های Kotlin/Native باشه. کتابخانه های Native و فریمورک های دیگه میتونن به سادگی با فایل های .klib همکاری کنند و کامپایلر Kotlin/Native تنها با استفاده از کامند –library library و یا آپشن library در پلاگین Gradle قابل استفاده است. برای اطلاعات بیشتر در مورد فرمت کتابخانه [اینجا](https://github.com/JetBrains/kotlin-native/blob/master/LIBRARIES.md) رو مطالعه کنید.

**دانلود فایل های باینری :**

فایل های باینری از طریق زیر قابل دسترس اند

·         [x86-64 Linux](http://download.jetbrains.com/kotlin/native/kotlin-native-linux-0.3.tar.gz)

·         [x86-64 MacOS](http://download.jetbrains.com/kotlin/native/kotlin-native-macos-0.3.tar.gz)

·         [x86-64 Windows](http://download.jetbrains.com/kotlin/native/kotlin-native-windows-0.3.zip)

باگ ها و مشکلات میتونن از [طریق زیر](http://kotl.in/issue) ریپورت شوند.

</div>
