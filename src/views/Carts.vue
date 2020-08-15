<template>
  <div class="container-fluid">
    <div class="row d-flex">
      <div class="col-md-8">
        <h1 class="font-weight-bold">/// 購物車</h1>
        <div id="shopping">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">產品名稱</th>
                <th scope="col">價格</th>
                <th scope="col">刪除</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in carts" :key="item.product.id + 1">
                <th scope="row">已加入購物車</th>
                <td>{{item.product.title}}</td>
                <td>{{item.product.price}}</td>
                <td>
                  <button class="btn btn-danger" @click="delProduct(item.product.id)">刪除</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-around align-items-center">
            <router-link to="/products" class="text-primary mt-3">返回繼續購物</router-link>
            <p class="mt-3">
              總計
              <span class="text-danger">{{cartTotal}}</span> 元
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-4 pr-3" id="ValidationProvider">
        <h2 class="font-weight-bold">確認訂單</h2>
        <validation-observer v-slot="{ invalid }" class="col-md-6">
          <form>
            <div class="form-group">
              <validation-provider v-slot="{ errors, classes }" rules="required|email">
                <label for="email">Email</label>
                <input
                  type="email"
                  v-model="form.email"
                  class="form-control"
                  id="email"
                  placeholder="Email"
                  :class="classes"
                />
                <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <validation-provider v-slot="{ errors, classes }" rules="required">
                <label for="name">收件人姓名</label>
                <input
                  type="text"
                  v-model="form.name"
                  class="form-control"
                  id="name"
                  placeholder="收件人姓名"
                  :class="classes"
                />
                <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <validation-provider v-slot="{ errors, classes }" rules="required|min:10">
                <label for="phone">收件人電話</label>
                <input
                  type="text"
                  v-model="form.phone"
                  class="form-control"
                  id="phone"
                  placeholder="收件人電話"
                  :class="classes"
                />
                <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <label for="payment">付款方式</label>
              <select class="form-control" id="payment" v-model="form.payment" required>
                <option>貨到付款</option>
                <option>信用卡</option>
                <option>ATM</option>
              </select>
            </div>
            <div class="form-group">
              <label for="package">取貨方式</label>
              <select class="form-control" id="package" v-model="form.package" required>
                <option>超商取貨</option>
                <option>宅配</option>
              </select>
            </div>
            <div class="form-group">
              <label for="msg">備註</label>
              <textarea class="form-control" id="msg" v-model="form.msg" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary px-5" :disabled="invalid">送出購物清單</button>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      carts: {},
      cartTotal: 0,
      form: {
        name: '',
        email: '',
        phone: '',
        payment: '貨到付款',
        package: '超商取貨',
        message: ''
      },
      isLoading: false
    }
  },
  created () {
    this.getCart()
  },
  methods: {
    getCart () {
      this.isLoadintg = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`
      this.$http
        .get(url)
        .then((res) => {
          this.isLoadintg = false
          this.carts = res.data.data
          this.inCart()
        })
        .catch((err) => {
          this.isLoadintg = false
          console.log(err.response)
        })
    },
    inCart () {
      let total = 0
      this.carts.forEach((item) => {
        total += item.product.price * item.quantity
      })
      this.cartTotal = total // 購物車總價格
    },
    delProduct (id) {
      this.isLoadintg = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping/${id}`
      this.$http
        .delete(url)
        .then((res) => {
          this.isLoadintg = false
          this.getCart()
        })
        .catch((err) => {
          this.isLoadintg = false
          console.log(err.response)
        })
    }
  }
}
</script>
