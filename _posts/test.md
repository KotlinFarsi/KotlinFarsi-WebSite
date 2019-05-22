---
layout: post
date:   2019-05-08 18:36:08 +0430
categories: jekyll update
---

<div dir="rtl">

# کلاس ها و توابع

کلاس ها در کاتلین ساختار خیلی ساده ای دارن و البته یکسری تفاوت¬ها بین جاوا و این زبون وجود داره که بهتره قبل از این که به برنامه نویسی اندروید ادامه بدیم کمی راجع بهشون بدونیم. در ضمن شما میتونین از سایت try.kotlinlang.org استفاده کنین و مثال هارو امتحان کنین، بدون این که پروژه ای بسازین


## روش تعریف کلاس


اگه میخواین یک کلاس تعریف کنین، این عمل تنها با استفاده از کلیدواژه `class` انجام میشه، یک کلاس ساده به اینصورت تعریف میشه:

</div>

```kotlin
class MainActivity{
    
}
```

<div dir="rtl">

کلاس ها سازنده های خاص خودشون رو دارن. بعدا میبینیم که برای بعضی مواقع نیاز به سازنده اضافه پیدا میکنیم و این عمل در کاتلین شدنیه، ولی بیشتر شرایط که باهاش روبرو میشیم یک سازنده نیاز مارو برطرف میکنه.پارامتر ها مستقیمن بعد از نام کلاس تعریف میشن و در ضمن اگه کلاسمون بدنه ای نداشته باشه نیازی به اکولاد هم نداره.

</div>

```kotlin
class Person(name: String, surname: String)
```

<div dir="rtl">

بدنه سازنده کجا تعریف میشه ؟ شما میتونین با استفاده از بلاک `init` بدنه سازنده رو بنوسین:

</div>

```kotlin
class Person(name: String, surname: String) {
    init {
        // …
    }
}
```

<div dir="rtl">

## ارث بری

به صورت پیشفرض یک کلاس از Any ارث¬بری شده(مثل Object در جاوا) ولی ما میتونیم از کلاس¬های دیگه هم ارث¬بری کنیم.کلاس ها به صورت پیشفرض بسته اند( مثل final class در جاوا) بنابراین ما زمانی میتونیم از یک کلاس ارث¬بری کنیم که اون کلاس با کلیدواژه open یا abstract به صورت باز معرفی شده باشه.

</div>

```kotlin
open class Animal(name: String)
class Person(name: String, surname: String) : Animal(name)
```

<div dir="rtl">


فقط یک نکته:

    ترجمه نشده


</div>


<div dir="rtl">

## توابع

توابع(متد ها در جاوا) توسط کلیدواژه fun معرفی میشن:

</div>

```kotlin
fun onCreate(savedInstanceState: Bundle?) {

}
```

<div dir="rtl">

اگر مقدار بازگشتی یک تابع مشخص نشه، اون تابع مقدار Unit برمیگردونه، به مانند void در جاوا با این تفاوت که اینجا Unit واقعا یک object هه. البته که میتونین هر تایپ دلخواهی رو به عنوان خروجی برگردونین.

</div>

```kotlin
fun add(x: Int, y: Int) : Int {
    return x + y
}
```
<div dir="rtl">

    •	نکته: نیازی به نقطه ویرگول نیست!
    همینطور که در مثال بالا دیدین، نیازی به استفاده از نقطه ویرگول در پایان جمله نیست.وقتی شما به این روش عادت کنید متجه میشین که خیلی توی وقتتون صرفه¬جویی میشه.

اگر مقدار بازگشتی رو بتونیم توی یک خط بنویسیم میتونیم از شر آکولادها راحت شیم و کدمون رو خلاصه تر بنویسیم.

</div>

```kotlin
fun add(x: Int, y: Int) : Int = x + y
```

<div dir="rtl">

## کانستراکتور و پارامترها

پارامتر ها در کاتلین کمی متفاوته، همینطور که میبینین اول نامش رو مینویسیم بعد تایپش.

</div>

```kotlin
fun add(x: Int, y: Int) : Int {
    return x + y
}
```

<div dir="rtl">

یکی از ویژگی¬های واقعا عالی کاتلین اینه که توابعمون میتونن به صورت دلخواه مقدار پیشفرض داشته باشن. به عنوان مثال این یک تابع سادس که میتونین توی هر activity تون داشته باشین:

</div>

```kotlin
fun toast(message: String, length: Int = Toast.LENGTH_SHORT) {
    Toast.makeText(this, message, length).show()
}
```

<div dir="rtl">

همینطور که میبینین پارامتر دوم (length) یک مقدار پیشفرض داره، به این معنی که شما میتونین برای پارامتر دوم مقدار داشته باشین یا نه که این از بازنویسی بیجای تابع جلوگیری کنه.

</div>

```kotlin
toast("Hello")
toast("Hello", Toast.LENGTH_LONG)
```

<div dir="rtl">

این مساویه کد جاوای زیره:

</div>

```java
void toast(String message){
    toast(message, Toast.LENGTH_SHORT);
}

void toast(String message, int length){
    Toast.makeText(this, message, length).show();
}
```

<div dir="rtl">

حتی اگه بخواین میتونین این تابع رو پیچیده تر هم کنین:

</div>

```kotlin
fun niceToast(message: String,
              tag: String = MainActivity::class.java.simpleName,
              length: Int = Toast.LENGTH_SHORT) {
    Toast.makeText(this, "[$tag] $message", length).show()
}
```

<div dir="rtl">

در کاتلین شما حتی میتونین به پارامتر¬هایی که پاس میدین نام بدین و مشخص کنین چه مقداری رو به چه پارامتری دارین میدین.

</div>

```kotlin
toast(message = "Hello", length = Toast.LENGTH_SHORT)
```

<div dir="rtl">

    •	نکته: رشته¬های نمونه
    شما میتونین از نمونه ها برای رشته هاتون استفاده کنین. این کار رو زمانی که با یک رشته مشکل کار میکنین راحت تر میکنه.به عنوان مثال : "Your name is ${user.name}”

</div>
