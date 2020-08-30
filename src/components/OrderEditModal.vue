<template>
  <div class="modal-dialog w_max_100 w_max_md_70 text-black" role="document">
    <div class="modal-content">
      <div class="modal-header border-bottom-0 d-flex align-items-center">
        <h5 class="modal-title">訂單細節</h5>
        <button type="button" class="btn m-0 p-0 d-flex align-items-center close opacity_1"
        data-dismiss="modal" aria-label="Close">
          <span class="material-icons">clear</span>
        </button>
      </div>
      <validation-observer v-slot="{ invalid }">
        <div class="modal-body">
          <div class="text-right mb-2 mb-lg-0">
            訂單成立時間 ：{{ tempOrder.created.datetime }}
          </div>
          <form>
            <div class="row flex-column-reverse flex-lg-row">
              <div class="col-12 col-lg-4 mt-3 mt-lg-0">
                <validation-provider rules="required|email" v-slot="{ errors, classes }">
                  <label for="email" class="text-left w-100">Email</label>
                  <input id="email" type="email" name="email" v-model="tempOrder.user.email"
                    class="form-control form-control-lg mb-2" :class="classes">
                  <span class="invalid-feedback text-right">{{ errors[0] }}</span>
                </validation-provider>
                <div class="row">
                  <div class="col-12 w_max_lg_50 pr-lg-1">
                    <validation-provider rules="required" v-slot="{ errors, classes}">
                      <label for="name" class="text-left w-100">收件人姓名</label>
                      <input id="name" type="text" name="收件人姓名"
                      v-model="tempOrder.user.name" class="form-control form-control-lg mb-2"
                        :class="classes">
                      <span class="invalid-feedback text-right">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="col-12 w_max_lg_50 pl-lg-1">
                    <validation-provider rules="required|min:8|numeric"
                    v-slot="{ errors, classes }">
                      <label for="tel" class="text-left w-100">聯絡電話</label>
                      <input id="tel" type="tel" name="聯絡電話"
                      v-model="tempOrder.user.tel" class="form-control
                      form-control-lg mb-2" :class="classes">
                      <span class="invalid-feedback text-right">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                </div>
                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <label for="address" class="text-left w-100">收件地址</label>
                  <input id="address" type="text" name="收件地址"
                  v-model="tempOrder.user.address" class="form-control form-control-lg mb-2"
                    :class="classes">
                  <span class="invalid-feedback text-right">{{ errors[0] }}</span>
                </validation-provider>
                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <label for="payment" class="text-left w-100">付款方式</label>
                  <select v-model="tempOrder.payment"
                  :class="classes" class="custom-select custom-select-lg mb-2" required>
                    <option value="" selected disabled>更改選擇付款方式</option>
                    <option value="WebATM">
                      WebATM
                    </option>
                    <option value="ATM">
                      ATM
                    </option>
                    <option value="CVS">
                      CVS
                    </option>
                    <option value="Barcode">
                      Barcode
                    </option>
                    <option value="Credit">
                      Credit
                    </option>
                    <option value="ApplePay">
                      ApplePay
                    </option>
                    <option value="GooglePay">
                      GooglePay
                    </option>
                  </select>
                  <span class="invalid-feedback text-right">{{ errors[0] }}</span>
                </validation-provider>
                <validation-provider>
                  <label for="message" class="text-left w-100">留言</label>
                  <textarea class="form-control form-control-lg mb-2" v-model="tempOrder.message"
                  rows="5" id="message"></textarea>
                </validation-provider>
              </div>
              <div class="col-12 col-lg-8 mt-lg-5">
                <div class="p-4 bg-adminSecondary rounded-lg">
                  <div @click="showDetail" class="d-flex d-lg-none
                  font-weight-bold justify-content-between">
                    <div>總計</div>
                    <div class="d-flex align-items-center">
                      <span class="showDetail_price">
                        {{ tempOrder.amount + 60 | toCurrency | DollarSign }}
                      </span>
                      <span class="material-icons text-success ml-2
                      showDetail_down">
                        expand_more
                      </span>
                      <span class="material-icons text-success ml-2
                      showDetail_up d-none">
                        expand_less
                      </span>
                    </div>
                  </div>
                  <div class="orderDetail d_none d-lg-block">
                    <hr class="d-block d-lg-none">
                    <ul class="listStyle_none m-0 p-0 text-left">
                      <li v-for="(item, index) in tempOrder.products" :key="index"
                      class="mb-3">
                        <div class="row align-items-center">
                          <div class="col-4 col-md-5 col-xl-3 d-flex align-items-center">
                            <button class="btn p-0 mr-3 d-flex" type="button">
                              <span class="material-icons text-danger">
                                disabled_by_default
                              </span>
                            </button>
                            <img class="img-fluid orderDetailImg"
                            :src="item.product.imageUrl[0]" alt>
                          </div>
                          <div class="col-5 col-md-4 col-xl-7">
                            <div class="row align-items-center flex-column flex-xl-row">
                              <div class="col-12 col-xl-5 mb-2 mb-xl-0">
                                <div class="font-weight-bold">{{ item.product.title }}</div>
                              </div>
                              <div class="col-12 col-xl-7">
                                <div class="input-group justify-content-start
                                justify-content-xl-end">
                                  <div class="input-group-prepend">
                                    <button type="button"
                                    @click="item.quantity --;
                                    updatePrice()"
                                    class="btn btn-success p-0 d-flex
                                    justify-content-center align-items-center"
                                    :disabled="item.quantity === 1">
                                      <span class="material-icons">
                                        remove
                                      </span>
                                    </button>
                                  </div>
                                  <input id="inlineFormInputGroupUsername" type="text"
                                  class="form-control border-success text-center p-0 orderNumInput"
                                  :value="item.quantity" min="1"
                                  @keyup.enter="updateOrder(tempOrder.id)">
                                  <div class="input-group-append">
                                    <button type="button"
                                    @click="item.quantity ++;
                                    updatePrice()"
                                    class="btn btn-success p-0 d-flex
                                    justify-content-center align-items-center">
                                      <span class="material-icons">
                                        add
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-3 col-xl-2 text-right">
                            {{ item.product.price | toCurrency | DollarSign }}
                          </div>
                        </div>
                      </li>
                    </ul>
                    <hr>
                    <div class="d-flex mb-2 align-items-center justify-content-between">
                      <div>訂單金額</div>
                      <div class="text-right">{{ totalPrice | toCurrency | DollarSign }}</div>
                    </div>
                    <div class="d-flex mb-2 align-items-center justify-content-between">
                      <div>運費</div>
                      <div class="text-right" v-if="tempOrder.amount >= 5000">
                        <span class="text-danger mr-2">全館滿額免運！！</span>
                        $ 0
                      </div>
                      <div class="text-right" v-else>$ 60</div>
                    </div>
                    <hr>
                    <div class="d-flex fz_20 font-weight-bold
                    align-items-center justify-content-between">
                      <div>總計</div>
                      <div class="d-flex align-items-center">
                        <button class="btn btn-success p-0 d-flex mr-3" type="button">
                          <span class="material-icons">
                            refresh
                          </span>
                        </button>
                        <div class="text-right" v-if="tempOrder.amount >= 5000">
                          {{ totalPrice + 0 | toCurrency | DollarSign }}
                        </div>
                        <div class="text-right" v-else>
                          {{ totalPrice + 60 | toCurrency | DollarSign }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          <button type="submit" class="btn btn-success" :disabled="invalid"
          @click="updateOrder()"
          >送出表單</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  name: 'OrderEditModal',
  data() {
    return {
      quantity: 0,
    };
  },
  props: ['tempOrder', 'totalPrice'],
  methods: {
    showDetail() {
      $('.showDetail_down').toggleClass('d-none');
      $('.showDetail_up').toggleClass('d-block');
      $('.orderDetail').slideToggle('slow');
      $('.showDetail_price').fadeToggle('fast');
    },
    updatePrice() {
      this.tempOrder.products.forEach((item) => {
        this.quantity = parseInt(item.quantity, 10);
      });
      this.$emit('updateQuantity', this.quantity);
    },
    updateOrder() {
      // const url = `${process.env.VUE_APP_APIPATH}
      // ${process.env.VUE_APP_UUID}/admin/ec/orders/${id}`;
      // this.$https.patch(url, this.tempOrder)
      //   .then((res) => {
      //     console.log(res);
      //   });
      this.$emit('updateOrder', this.tempOrder);
    },
  },
};
</script>

<style lang="scss">
  .orderDetailImg{
    max-width: 60%;
    @media (min-width: 1200px) {
      max-width: 70%;
    }
  }
  .orderNumInput{
    width: 30px !important;
    flex: 0.6;
    height: 30px;
  }
</style>
