---
layout: post
title:  "راه اندازی API های Restful با استفاده از Spring Boot و کاتلین"
date:   2018-05-1 00:00:00
categories: post
editlink: https://github.com/KotlinFarsi/KotlinFarsi-WebSite/edit/master/_post/2018-5-01-running-restful-app-with-spring-boot-and-kotlin/2018-5-01-running-restful-app-with-spring-boot-and-kotlin.md
author: "سینا درویشی"
---

<p style="width: calc(100% + 60px);">
<img src="\assets\img\posts\2018-5-1-running-restful-app-with-spring-boot-and-kotlin\kotlin-spring-boot-restful-web-service.jpg" />
</p>

<div dir="rtl" markdown="1">

خب اگه این متن رو دارین میخونین احتمالاً به این معنیه که شما با Restful آشنا هستید ولی خب به هر حال لازمه که من قبل از اینکه ادامه بدم، یک اشاره به موضوعی که میخوام در موردش صحبت کنم بگم.

خیلی از شما ممکنه بخواین یک API سمت Back-End بنویسین. خیلیاتون از PHP استفاده میکنید. خیلی‌ها هم ممکنه برن سمت NodeJS و بعضی‌ها هم شاید دوست داشته باشن از JVM استفاده کنن. واقعیتش زیاد مهم نیست از چی استفاده میکنید، چون به هر حال هممون میدونیم که به خواسته‌ای که از API امون میخوایم میرسیم، حالا توسط هر زبونی یا هر ماشینی ولی خب کسی که کاتلین یاد داره، مسلماً دلش میخواد حتی بتونه API هایی که برای اپلیکیشنش طراحی میکنه رو با کاتلین بزنه. اینجا هم قصد داریم به این هدفمون برسیم.

**تهش چی خواهیم داشت ؟**

فرض کنید یک برنامه داریم که در اون کاربران برای دسترسی به مطالب باید ثبت نام کنن. مسلماً هر کاربر یک id و username و یک email داره.

اطلاعات باید سمت سرور ذخیره بشن پس میتونیم از mysql برای منبع ذخیره اطلاعات و از JPA برای دسترسی به اطلاعات استفاده کنیم.

**مایحتاج برنامه مون ؟**

\- کاتلین روی سیستمتون نصب باشه.

\- چون از MySQL استفاده میکنیم روی سیستمون MySQL نصب باشه.

\- IntelliJ IDEA به عنوان IDE

همین!

**شروع به کار:**

من مراحل رو سعی میکنم همراه با عکس و مرحله به مرحله نشون بدم. در ابتدا بگم که من از IntelliJ IDEA Ultimate ۲۰۱۸.۱ استفاده میکنم. ممکنه بر روی سیستم شما مقداری فرق داشته باشه.

میتونید با ساختن یک پروژه ساده با استفاده از Gradle کار رو شروع کنید ولی خب راه‌های ساده‌تر هم هست. مثلاً استفاده از خود IntellJ IDEA برای ساختن پایه ی برنامه یا اصلاً استفاده از سایت [استارتر](http://start.spring.io/) spring . هر دور روش تقریباً مثل همن پس من از روش داخل IntelliJ میرم و اگر شما قادر به انجام این روش نبودین از لینک بالا استفاده کنید و بعد از اون پروژه رو در IntelliJ وارد کنید.

وقتی بر روی Create New Project کلیک میکنید صفحه‌ای براتون ظاهر میشه از سمت چپ Spring Initializer رو انتخاب کنید و از سمت راست اگر تنظیمات پیشفرض درست است بر روی Next کلیک کنید.

</div>

<p style="width: calc(100% + 60px);">
<img src="\assets\img\posts\2018-5-1-running-restful-app-with-spring-boot-and-kotlin\new-project.png" />
</p>

<div dir="rtl" markdown="1">

توی صفحه‌ای که ظاهر میشه میتونید تنظیمات رو مثل من انجام بدین. یادتون باشه که این پروژه رو با استفاده از Gradle و کاتلین میخوایم انجام بدیم.

</div>

<p style="width: calc(100% + 60px);">
<img src="\assets\img\posts\2018-5-1-running-restful-app-with-spring-boot-and-kotlin\new-project2.png" />
</p>

<div dir="rtl" markdown="1">

حال وقتی بر رویNext کلیک کنیم صفحه‌ای برامون ظاهر میشه که توش باید کتابخونه هایی که میخوایم ازشون استفاده کنیم رو ذکر کنیم. از قسمت Web خود Web رو انتخاب کنید و از قسمت SQL باید MySQL و JPA رو انتخاب کنیم. یادمون باشه که ORM کار با MySQL در پکیج JPA موجوده و نیازی به اضافه کردن چیز دیگه ای نیست.

</div>

<p style="width: calc(100% + 60px);">
<img src="\assets\img\posts\2018-5-1-running-restful-app-with-spring-boot-and-kotlin\new-project3.png" />
</p>


<div dir="rtl" markdown="1">

حالا اگه روی Next کلیک کنید وارد صفحه‌ای میشید که محل دلخواه برای ایجاد پروژه رو ازتون میپرسه و بعدش اگه دکمه Finish رو بزنید شروع میکنه به ساختن پروژه متناسب با پکیج های دلخواهمون. یکم اگه صبر کنید پروژه آماده کدزنی میشه. در ضمن متأسفانه به دلیل تحریم باید از نرم‌افزار های تغییر IP استفاده کنید که گردل بتونه فایل‌های لازم رو دانلود کنه.

اگه ساختار برنامه رو نگاه کنید در داخل فولدر resources فایلی رو به نام application.properties میبینید. در اون فایل ما باید تنظیمات مربوط به MySQL و تنظیمات مربوط ‌به JPA رو ست کنیم.

</div>

<p style="width: calc(100% + 60px);">
<img src="\assets\img\posts\2018-5-1-running-restful-app-with-spring-boot-and-kotlin\tree.png" />
</p>

<div dir="rtl" markdown="1">

فایل رو باز کنید و کد زیر رو داخلش بزنین:

</div>

```properties
spring.datasource.url = jdbc:mysql://localhost:3306/kotlin_demo_app?autoReconnect=true&useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true&useSSL=false
spring.datasource.username = root
spring.datasource.password = root
spring.jpa.hibernate.ddl-auto = update
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQL5InnoDBDialect
```

<div dir="rtl" markdown="1">

یادتون باشه که باید یک دیتابیس به نام kotlin_demo_app در سیستمتون داشته باشید و یوزرنیم و پسوردش رو در اینجا نیز وارد کنید. دو خط بعد هم درواقع دارن میگن اگه دامین مدلمون تغییر کرد دیتابیس رو آپدیت کن.

حالا میتونیم دامین مدل User امون رو بسازیم. کافیه یک کلاس به نام User بسازین و کد زیر رو داخلش بزنید:

</div>

```kotlin
package com.darvishi.sina.springbootkotlintest

import javax.persistence.*
import javax.validation.constraints.NotBlank

@Entity
data class User(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        @get: NotBlank
        val userName: String = "",
        @get: NotBlank
        val email: String = ""
)
```

<div dir="rtl" markdown="1">

و حالا میتونیم یک مخزن از یوزر ها بسازیم و اطلاعاتمون رو داخلش ذخیره کنیم.یک کلاس به نام UserRepository میسازیم و کد زیر رو داخلش میزنیم:

</div>

```kotlin
package com.darvishi.sina.springbootkotlintest

import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Long>
```

<div dir="rtl" markdown="1">

مرحله بعدی هم ساختن یک کنترلر برای User هاست که در واقع توی این قسمت ما توابع CRUD ای که قراره بر روی منبعمون فعالیت انجام بدن رو تعریف و پیاده سازی میکنیم. کافیه یک کلاس کاتلین به اسم UserController بسازیم و کد زیر رو داخلش پیاده کنیم:

</div>

```kotlin
package com.darvishi.sina.springbootkotlintest

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping("/")
class UserController(private val userRepository: UserRepository) {
    @GetMapping("/users")
    fun getAllUsers(): List<User> = userRepository.findAll()
    @PostMapping("/users")
    fun createNewUser(@Valid @RequestBody user: User): User = userRepository.save(user)
    @GetMapping("/users/{id}")
    fun getUserById(@PathVariable(value = "id") userId: Long): ResponseEntity<User>{
        return userRepository.findById(userId).map { user ->
            ResponseEntity.ok(user)
        }.orElse(ResponseEntity.notFound().build())
    }
    @PutMapping("/users/{id}")
    fun updateArticleById(@PathVariable(value = "id") userId: Long,
                          @Valid @RequestBody newUser: User): ResponseEntity<User>{
        return userRepository.findById(userId).map { existingUser ->
            val updatedUser: User = existingUser.copy(userName = newUser.userName, email = newUser.email)
            ResponseEntity.ok().body(userRepository.save(updatedUser))
        }.orElse(ResponseEntity.notFound().build())
    }
    @DeleteMapping("/users/{id}")
    fun deleteUserById(@PathVariable(value = "id") userId: Long): ResponseEntity<Void> {
        return userRepository.findById(userId).map { user ->
            userRepository.delete(user)
            ResponseEntity<Void>(HttpStatus.OK)
        }.orElse(ResponseEntity.notFound().build())
    }
}
```

<div dir="rtl" markdown="1">

حالا برای اجرای کدمون دستور زیر رو تایپ میکنیم : 

</div>

```bash
./gradlew bootRun
```

<div dir="rtl" markdown="1">

برای تست برناممون هم میتونیم سناریو های زیر رو در نظر بگیریم :

</div>

**POST /users - Create an User**

```bash
curl -i -H "Content-Type: application/json" -X POST \
-d '{"userName": "sinadarvi", "email": "sinadarvi@gmail.com"}' \
http://localhost:8080/users
```

```
#OUTPUT

HTTP/1.1 200 
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Date: Tue, 01 May 2018 19:33:24 GMT

{"id":1,"userName":"sinadarvi","email":"sinadarvi@gmail.com"}
```



**GET /users - Get all Users**

```bash
curl -i -H 'Accept: application/json' http://localhost:8080/api/articles
```

```
#OUTPUT

HTTP/1.1 200 
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Date: Tue, 01 May 2018 19:35:25 GMT

[{"id":1,"userName":"sinadarvi","email":"sinadarvi@gmail.com"}]
```



**Get /users/{id} - Get an User by id**

```bash
curl -i -H 'Accept: application/json' http://localhost:8080/users/1
```

```
#OUTPUT

HTTP/1.1 200 
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Date: Tue, 01 May 2018 19:37:55 GMT

{"id":1,"userName":"sinadarvi","email":"sinadarvi@gmail.com"}
```



**PUT /users/{id} - Update an User**

```bash
curl -i -H "Content-Type: application/json" -X PUT \
-d '{"userName": "KotlinFarsi", "email": "info@kotlinfarsi.com"}' \
http://localhost:8080/users/1
```

```
#OUTPUT

HTTP/1.1 200 
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Date: Tue, 01 May 2018 19:41:38 GMT

{"id":1,"userName":"KotlinFarsi","email":"info@kotlinfarsi.com"}
```



**DELETE /users/{id} - Delete an User**

```bash
curl -i -X DELETE http://localhost:8080/users/1   
```

```
#OUTPUT

HTTP/1.1 200 
Content-Length: 0
Date: Tue, 01 May 2018 19:44:22 GMT
```

<div dir="rtl" markdown="1">

و در انتها اگه این اموزش کافی نبود میتونید کدهای این قسمت رو توی این لینک گیتهاب ببینید. اگر سوال و یا مشکلی در اجرای کد پیش اومد میتونید در قسمت issues ذکر کنید.

در قسمت بعدی سعی میکنم یک آموزش ابتدایی از Ktor فریمورک ساخته شده توسط Jetbrains داشته باشیم.

</div>
