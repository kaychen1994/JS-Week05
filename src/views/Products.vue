<template>
  <div class="container-fluid my-5">
    <loading :active.sync="isLoading"></loading>
    <h2 class="pt-5 pb-3 font-weight-bold">/// 商品列表</h2>
    <div class="row">
      <div class="col-md-3 mb-2">
        <div class="list-group sticky-top">
          <a
            href="#"
            class="list-group-item list-group-item-action list-group-item-secondary active"
          >全系列錶款</a>
          <a href="#" class="list-group-item list-group-item-action list-group-item-light">經典錶款</a>
          <a href="#" class="list-group-item list-group-item-action list-group-item-light">機械錶款</a>
          <a href="#" class="list-group-item list-group-item-action list-group-item-light">電子錶款</a>
          <a href="#" class="list-group-item list-group-item-action list-group-item-light">智慧錶款</a>
        </div>
      </div>
      <div class="col-md-9">
        <div id="prductsCard" class="card-columns">
          <div class="card mb-5" v-for="item in products" :key="item.id">
            <img
              class="card-img-top product-img"
              :style="{ backgroundImage: `url(${item.imageUrl[0]})` }"
            />
            <div class="card-body">
              <h3 class="card-title p-3">{{item.title}}</h3>
              <p class="card-text p-3">{{item.content}}</p>
              <div class="card-text d-flex justify-content-center align-items-center mb-3">
                <span class="lineThrough">NT {{item.origin_price}} 元</span>
                <span class="text-red ml-4">NT {{item.price}} 元</span>
              </div>
              <div class="d-flex justify-content-between p-3">
                <button type="button" class="btn btn-dark px-3 py-2" @click="getProduct(item.id)">
                  查看更多
                </button>
                <button type="button" class="btn btn-danger px-3 py-2 d-flex">
                  <span class="mr-3" @click="goToCart(item.id)">加到購物車</span>
                  <span class="material-icons">
                    add_shopping_cart
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="prdocutInfo" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">{{tempProduct.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="tempProduct.imageUrl" class="img-fluid"/>
            <p class="p-3">{{tempProduct.content}}</p>
            <div class="d-flex justify-content-center align-items-center mb-3">
              <span class="lineThrough">NT {{tempProduct.origin_price}} 元</span>
              <span class="text-red ml-4">NT {{tempProduct.price}} 元</span>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
            <button type="button" class="btn btn-danger" @click="goToCart(item.id)">加入購物車</button>
          </div>
        </div>
  </div>
</div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      tempProduct: {},
      products: [],
      isLoading: false,
      carts: [],
      cartTotal: 0,
      status: {
        lodingItem: '' // 先給預設值才不會出錯
      } // 點擊後的狀態
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    getProducts () {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products`
      this.isLoadintg = true
      this.$http
        .get(url)
        .then((res) => {
          this.isLoadintg = false
          this.products = res.data.data
        })
        .catch(() => {
          this.isLoadintg = false
        })
    },
    getProduct (id) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${id}`
      this.$http
        .get(url)
        .then((res) => {
          this.tempProduct = res.data.data
          $('#prdocutInfo').modal('show')
        })
    },
    goToCart (id, quantity = 1) { // 數量預設值 1
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`
      const cart = { // api required
        product: id, // id 透過參數傳入
        quantity: quantity
      }
      this.$http
        .post(url, cart)
        .then((res) => {
          this.$bus.$emit('in-cart') // bus 傳送 emit 接收 on
          console.log(res)
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  }
}
</script>

<style>
.product-img {
  height: 300px;
  background-size: cover;
  background-position: center;
}
.text-red {
  color: red;
}
.lineThrough {
  text-decoration: line-through;
}
</style>
