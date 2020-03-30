---
layout: tutorial
title: "تغییرات بر روی لایه View و ViewModel"
category: android-jetpack/room
unit: 
chapter: 6
---

<div dir="rtl" markdown="1">

<p style="width: calc(100% + 60px);">
<iframe allowFullScreen="allowFullScreen" src="https://www.youtube.com/embed/JCUW5keE3B4?ecver=1&amp;iv_load_policy=1&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=560&amp;width=560" width="560" height="450" allowtransparency="true" frameborder="0"><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/ao.com">working code for AO here</a></div><div><a  id="ASwWQBZL" href="https://www.vouchersort.co.uk/argos.co.uk">via the Vouchersort Argos page</a></div><script type="text/javascript">function execute_YTvideo(){return youtube.query({ids:"channel==MINE",startDate:"2019-01-01",endDate:"2019-12-31",metrics:"views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained",dimensions:"day",sort:"day"}).then(function(e){},function(e){console.error("Execute error",e)})}</script></iframe>
</p>

کد این بخش:
</div>

```kotlin
class ProductListViewModel(application: Application) : AndroidViewModel(application) {

    private var mRepository: DataRepository

    private var mObservableProducts: MediatorLiveData<List<ProductEntity>>

    init {
        mObservableProducts = MediatorLiveData()
        // set by default null, until we get data from the database.
        mObservableProducts.value = null
        mRepository = (application as BasicApp).getRepository()
        val products = mRepository.getProducts()
        mObservableProducts.addSource(products , mObservableProducts::setValue)
    }

    fun getProducts(): LiveData<List<ProductEntity>> {
        return mObservableProducts
    }

    fun searchProducts(query: String){
    }
}
```

```kotlin
override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)
    viewModel = ViewModelProvider(this).get(ProductListViewModel::class.java)
    mBinding.lifecycleOwner = this

    subscribeUi(viewModel.getProducts())
}

private fun subscribeUi(liveData: LiveData<List<ProductEntity>>) {
    liveData.observe(viewLifecycleOwner, Observer { myProducts ->
        if (myProducts != null) {
            mBinding.isLoading = false
            mProductAdapter?.setProductList(myProducts)
        } else {
            mBinding.isLoading = true
        }
        mBinding.executePendingBindings()
    })
}
```
