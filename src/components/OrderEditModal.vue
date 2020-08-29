<template>
  <div class="modal-dialog w_max_50 w_max_lg_70 text-black" role="document">
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
          <form>
            <div class="row flex-column-reverse flex-lg-row">
              <div class="col-12 col-lg-4 offset-lg-2 mt-3 mt-lg-0">
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
              <div class="col-12 col-lg-4 mt-lg-5">
                <div class="p-4 bg-adminSecondary rounded-lg">
                  <ul class="listStyle_none m-0 p-0 text-left">
                    <li v-for="(item, index) in tempOrder.products" :key="index"
                    class="mb-3">
                      <div class="row align-items-center">
                        <div class="col-3">
                          <img class="img-fluid orderDetailImg"
                          :src="item.product.imageUrl[0]" alt>
                        </div>
                        <div class="col-4 pl-0 pr-0 font-weight-bold">{{ item.product.title }}</div>
                        <div class="col-5 pl-0 text-right">
                          <div class="d-flex justify-content-between">
                            <div>x {{ item.quantity }}</div>
                            <div>
                              {{ item.product.price * item.quantity | toCurrency | DollarSign }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <hr>
                  <div class="d-flex mb-2 align-items-center justify-content-between">
                    <div>訂單金額</div>
                    <div class="text-right">{{ tempOrder.amount | toCurrency | DollarSign }}</div>
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
                    <div class="text-right" v-if="tempOrder.amount >= 5000">
                      {{ tempOrder.amount + 0 | toCurrency | DollarSign }}
                    </div>
                    <div class="text-right" v-else>
                      {{ tempOrder.amount + 60 | toCurrency | DollarSign }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          <button type="submit" class="btn btn-success" :disabled="invalid">送出表單</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderEditModal',
  data() {
    return {
    };
  },
  props: ['tempOrder'],
  methods: {
  },
};
</script>

<style lang="scss">
</style>
