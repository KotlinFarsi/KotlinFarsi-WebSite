---
layout: tutorial
title: "ساختن Database و Repository"
category: android-jetpack/room
unit: 
chapter: 5
---

<div dir="rtl" markdown="1">

<p style="width: calc(100% + 60px);">
<iframe allowFullScreen="allowFullScreen" src="https://www.youtube.com/embed/mwdRP55nW38?ecver=1&amp;iv_load_policy=1&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=560&amp;width=560" width="560" height="450" allowtransparency="true" frameborder="0"><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/ao.com">working code for AO here</a></div><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/argos.co.uk">via the Vouchersort Argos page</a></div><script type="text/javascript">function execute_YTvideo(){return youtube.query({ids:"channel==MINE",startDate:"2019-01-01",endDate:"2019-12-31",metrics:"views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained",dimensions:"day",sort:"day"}).then(function(e){},function(e){console.error("Execute error",e)})}</script></iframe>
</p>

## ساختن DataRepository

<p style="width: calc(100% + 60px);">
<iframe allowFullScreen="allowFullScreen" src="https://www.youtube.com/embed/kS1g-A5iuBo?ecver=1&amp;iv_load_policy=1&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=560&amp;width=560" width="560" height="450" allowtransparency="true" frameborder="0"><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/ao.com">working code for AO here</a></div><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/argos.co.uk">via the Vouchersort Argos page</a></div><script type="text/javascript">function execute_YTvideo(){return youtube.query({ids:"channel==MINE",startDate:"2019-01-01",endDate:"2019-12-31",metrics:"views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained",dimensions:"day",sort:"day"}).then(function(e){},function(e){console.error("Execute error",e)})}</script></iframe>
</p>

کد های این بخش:

</div>

```kotlin
@Database(entities = [ProductEntity::class], version = 1)
abstract class AppDatabase : RoomDatabase() {

    abstract fun productDao(): ProductDao

    companion object {
        const val DATABASE_NAME = "basic-sample-db"

        private val mIsDatabaseCreated = MutableLiveData<Boolean>()

        @Volatile
        private var instance: AppDatabase? = null
        private var LOCK = AppDatabase::class

        operator fun invoke(context: Context, executors: AppExecutors): AppDatabase {
            if (instance == null) {
                synchronized(LOCK) {
                    if (instance == null) {
                        instance = buildDatabase(context.applicationContext, executors)
                        instance?.updateDatabaseCreated(context.applicationContext)
                    }
                }
            }
            return instance!!
        }

        private fun buildDatabase(appContext: Context, executors: AppExecutors): AppDatabase {
            return Room
                .databaseBuilder(appContext, AppDatabase::class.java, DATABASE_NAME)
                .addCallback(object : Callback() {
                    override fun onCreate(db: SupportSQLiteDatabase) {
                        super.onCreate(db)
                        executors.diskIO.execute {
                            addDelay()

                            // Generate the data for pre-population
                            val database =
                                AppDatabase(appContext, executors)
                            val products =
                                DataGenerator.generateProducts()

                            insertData(database, products)

                            database.setDatabaseCreated()
                        }
                    }
                })
                .build()
        }

        private fun addDelay() {
            try {
                Thread.sleep(4000)
            } catch (ignored: InterruptedException) {
            }
        }

        private fun insertData(database: AppDatabase, products: List<ProductEntity>) {
            database.runInTransaction {
                database.productDao().insertAll(products)
            }
        }

    }
    
    private fun setDatabaseCreated() {
        mIsDatabaseCreated.postValue(true)
    }

    private fun updateDatabaseCreated(context: Context) {
        if (context.getDatabasePath(DATABASE_NAME).exists()) {
            setDatabaseCreated()
        }
    }

    fun getDatabaseCreated(): LiveData<Boolean> {
        return mIsDatabaseCreated
    }
}
```

```kotlin
class DataRepository(private val database: AppDatabase) {

    private var mObservableProducts: MediatorLiveData<List<ProductEntity>> = MediatorLiveData()

    init {
        mObservableProducts.addSource(
            database.productDao().loadAllProducts()
        ) { productEntities ->
            if (database.getDatabaseCreated().value != null) {
                mObservableProducts.postValue(productEntities)
            }
        }
    }

    companion object {
        @Volatile
        private var instance: DataRepository? = null
        private var LOCK = DataRepository::class

        operator fun invoke(database: AppDatabase): DataRepository {
            return instance ?: synchronized(LOCK) {
                instance ?: DataRepository(database)
            }
        }
    }

    fun getProducts(): LiveData<List<ProductEntity>> {
        return mObservableProducts
    }

    fun loadProduct(productId: Int): LiveData<ProductEntity> {
        return database.productDao().loadProduct(productId)
    }
}
```
