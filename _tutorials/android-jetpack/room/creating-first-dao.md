---
layout: tutorial
title: "ساختن اولین DAO"
category: android-jetpack/room
unit: 
chapter: 4
---

<div dir="rtl" markdown="1">


<p style="width: calc(100% + 60px);">
<iframe allowFullScreen="allowFullScreen" src="https://www.youtube.com/embed/7Y6ZDIveIF8?ecver=1&amp;iv_load_policy=1&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=560&amp;width=560" width="560" height="450" allowtransparency="true" frameborder="0"><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/ao.com">working code for AO here</a></div><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/argos.co.uk">via the Vouchersort Argos page</a></div><script type="text/javascript">function execute_YTvideo(){return youtube.query({ids:"channel==MINE",startDate:"2019-01-01",endDate:"2019-12-31",metrics:"views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained",dimensions:"day",sort:"day"}).then(function(e){},function(e){console.error("Execute error",e)})}</script></iframe>
</p>

درحقیقت Data Access Object یک سری آبجکت ان که حاوی یک سری توابع هستن که اون توابع دسترسی مستقیم به دیتابیس دارن.

<p style="width: calc(100% + 60px);">
<img src="/assets/img/android-jetpack/room/creating-first-dao/dao.png" />
</p>

## ساخت ProductDao

<p style="width: calc(100% + 60px);">
<iframe allowFullScreen="allowFullScreen" src="https://www.youtube.com/embed/sT3VGlYcCdw?ecver=1&amp;iv_load_policy=1&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=560&amp;width=560" width="560" height="450" allowtransparency="true" frameborder="0"><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/ao.com">working code for AO here</a></div><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/argos.co.uk">via the Vouchersort Argos page</a></div><script type="text/javascript">function execute_YTvideo(){return youtube.query({ids:"channel==MINE",startDate:"2019-01-01",endDate:"2019-12-31",metrics:"views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained",dimensions:"day",sort:"day"}).then(function(e){},function(e){console.error("Execute error",e)})}</script></iframe>
</p>
برای ساختن ProductDao میتونید از کد زیر استفاده کنید:

</div>

```kotlin
@Dao
interface ProductDao {
    @Query("SELECT * FROM products")
    fun loadAllProducts(): LiveData<List<ProductEntity>>

    @Query("SELECT * FROM products where id = :productId")
    fun loadProduct(productId: Int): LiveData<ProductEntity>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAll(products: List<ProductEntity>)
}
```

