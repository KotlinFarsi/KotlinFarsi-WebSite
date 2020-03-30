---
layout: tutorial
title: "بررسی اپلیکیشن نهایی و کد شروع"
category: android-jetpack/room
unit: 
chapter: 2
---

<div dir="rtl" markdown="1">


<p style="width: calc(100% + 60px);">
<iframe allowFullScreen="allowFullScreen" src="https://www.youtube.com/embed/rGcuRl4g-Rw?ecver=1&amp;iv_load_policy=1&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=560&amp;width=560" width="560" height="450" allowtransparency="true" frameborder="0"><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/ao.com">working code for AO here</a></div><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/argos.co.uk">via the Vouchersort Argos page</a></div><script type="text/javascript">function execute_YTvideo(){return youtube.query({ids:"channel==MINE",startDate:"2019-01-01",endDate:"2019-12-31",metrics:"views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained",dimensions:"day",sort:"day"}).then(function(e){},function(e){console.error("Execute error",e)})}</script></iframe>
</p>


برای شروع کار لازمه که کد شروع رو از این [لینک](https://github.com/KotlinFarsi/kf01-BasicSample/archive/starter-code.zip) دریافت کنید. همینطور میتونید با استفاده از کد زیر به شاخه `starter-code` برین و اونو چک اوت کنین.

</div>

```bash
git clone https://github.com/KotlinFarsi/kf01-BasicSample
cd ./kf01-BasicSample
git checkout starter-code
```

<div dir="rtl" markdown="1">

قبل از این که شروع به خواند کد بکنین، بد نیست نگاهی به اپلیکیشن نهایی بنذازین.

(عکس)



## اضافه کردن وابستگی Gradle

<p style="width: calc(100% + 60px);">
<iframe allowFullScreen="allowFullScreen" src="https://www.youtube.com/embed/nhOQMe4wurE?ecver=1&amp;iv_load_policy=1&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=560&amp;width=560" width="560" height="450" allowtransparency="true" frameborder="0"><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/ao.com">working code for AO here</a></div><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/argos.co.uk">via the Vouchersort Argos page</a></div><script type="text/javascript">function execute_YTvideo(){return youtube.query({ids:"channel==MINE",startDate:"2019-01-01",endDate:"2019-12-31",metrics:"views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained",dimensions:"day",sort:"day"}).then(function(e){},function(e){console.error("Execute error",e)})}</script></iframe>
</p>


بعد از این ها، اولین اقدام برای شروع به کار با Room، اضافه کردن دپندنسی زیر به فایل `build.gradle` موجود در فولدر app اه:

</div>

```groovy
dependencies {
  def room_version = "2.2.5"

  implementation "androidx.room:room-runtime:$room_version"
  annotationProcessor "androidx.room:room-compiler:$room_version" // For Kotlin use kapt instead of annotationProcessor

  // optional - Kotlin Extensions and Coroutines support for Room
  implementation "androidx.room:room-ktx:$room_version"
}
```