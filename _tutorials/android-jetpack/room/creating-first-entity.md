---
layout: tutorial
title: "ساختن اولین Entity"
category: android-jetpack/room
unit: 
chapter: 3
---

<div dir="rtl" markdown="1">


<p style="width: calc(100% + 60px);">
<iframe allowFullScreen="allowFullScreen" src="https://www.youtube.com/embed/ClD7sS47Bic?ecver=1&amp;iv_load_policy=1&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=560&amp;width=560" width="560" height="450" allowtransparency="true" frameborder="0"><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/ao.com">working code for AO here</a></div><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/argos.co.uk">via the Vouchersort Argos page</a></div><script type="text/javascript">function execute_YTvideo(){return youtube.query({ids:"channel==MINE",startDate:"2019-01-01",endDate:"2019-12-31",metrics:"views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained",dimensions:"day",sort:"day"}).then(function(e){},function(e){console.error("Execute error",e)})}</script></iframe>
</p>
رسیدیم به Entity ها. همینطور که از اسمشون مشخصه، Entity ها در واقع یک سری موجودیت اطراف ما هستن. از کتاب ها، صندلی ها، میز ها گرفته تا User ها و ... . به عنوان مثال همین User ها میتونن دو شناسه اصلی داشته باشن. `firstName` و `UserName` .



<p style="width: calc(100% + 60px);">
<img src="/assets/img/android-jetpack/room/creating-first-entity/1.png" />
</p>

در زبان کاتلین برای ذخیره اطلاعات از دیتا کلاس استفاده میکنیم.

<p style="width: calc(100% + 60px);">
<img src="/assets/img/android-jetpack/room/creating-first-entity/2.png" />
</p>

برای این که به Room بفهمونیم که این کلاسمون میخوایم Entity باشه، از `Entity@` استفاده میکنیم.

<p style="width: calc(100% + 60px);">
<img src="/assets/img/android-jetpack/room/creating-first-entity/3.png" />
</p>

برای این که به Room بگیم، شناسه `id` ما باید PrimaryKey باشه و از این به بعد یونیک در نظرش بگیر باید از `PrimaryKey@` استفاده کنیم.



## ساخت ProductEntity

<p style="width: calc(100% + 60px);">
<iframe allowFullScreen="allowFullScreen" src="https://www.youtube.com/embed/9qScu4DmUqQ?ecver=1&amp;iv_load_policy=1&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=560&amp;width=560" width="560" height="450" allowtransparency="true" frameborder="0"><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/ao.com">working code for AO here</a></div><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/argos.co.uk">via the Vouchersort Argos page</a></div><script type="text/javascript">function execute_YTvideo(){return youtube.query({ids:"channel==MINE",startDate:"2019-01-01",endDate:"2019-12-31",metrics:"views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained",dimensions:"day",sort:"day"}).then(function(e){},function(e){console.error("Execute error",e)})}</script></iframe>
</p>

بعد از این که نگاهی به مدل Productامون داشتیم، میتونیم برای ساخت `ProductEntity` از کد زیر استفاده کنیم

</div>

```kotlin
@Entity(tableName = "products")
data class ProductEntity @JvmOverloads constructor(
    @PrimaryKey
    override var id: Int? = null,
    override var name: String? = null,
    override var description: String? = null,
    override var price: Int? = null
) : Product
```

