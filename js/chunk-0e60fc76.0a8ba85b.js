(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0e60fc76"],{4173:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container mb-9"},[s("div",{staticClass:"row pt-7"},[s("div",{staticClass:"col-12 col-lg-10 offset-lg-1"},[s("div",{staticClass:"d-flex"},[s("a",{staticClass:"navItem text-decoration-none\n        rounded-0 fz_lg_24 py-2 py-lg-3 w-50",class:{navItem_active:!1===t.paid},attrs:{href:"#"},on:{click:function(e){t.paid=!1}}},[t._v("未付款")]),s("a",{staticClass:"navItem text-decoration-none\n        rounded-0 fz_lg_24 py-2 py-lg-3 w-50",class:{navItem_active:!0===t.paid},attrs:{href:"#"},on:{click:function(e){t.paid=!0}}},[t._v("已付款")])])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 col-lg-10 offset-lg-1"},t._l(t.orderList,(function(e){return s("div",{directives:[{name:"show",rawName:"v-show",value:e.paid===t.paid,expression:"item.paid === paid"}],key:e.id},[s("div",{staticClass:"card mt-3"},[s("div",{staticClass:"card-body p-3"},[s("h5",{staticClass:"card-title mb-1 mb-lg-2"},[s("div",{staticClass:"d-flex justify-content-between\n                align-items-center fz_14 fz_md_16"},[s("div",{staticClass:"tooltip_hover w_50 w_lg_25 position-relative d-flex\n                justify-content-start"},[t._v(" "+t._s(t._f("toDate")(e.created.timestamp))+" "),s("span",{staticClass:"tooltipText position-absolute w_75 w_md_25 w_lg_40 ml-3 ml_xl_6"},[t._v(" "+t._s(t._f("toTime")(e.created.timestamp))),s("br"),t._v(t._s(e.created.diff)+" ")])]),s("div",[t._v("訂單編號： "+t._s(e.created.timestamp))])])]),s("div",{staticClass:"card-text mt-0 mt-lg-3"},[s("div",{staticClass:"d-flex flex-column\n              justify-content-between mx-lg-4"},[s("div",{staticClass:"d-flex align-items-center justify-content-between"},[s("ul",{staticClass:"listStyle_none m-0 pl-0 pt-2 w-100"},[t._m(0,!0),t._l(e.products,(function(e,a){return s("li",{key:a,staticClass:"d-flex flex-column w-100 fz_14 fz_lg_16"},[s("div",{staticClass:"d-flex align-items-center justify-content-between w-100"},[s("div",{staticClass:"d-flex align-items-center w-75"},[s("div",{staticClass:"card-img-top rounded-0 orderImg",style:{background:"url("+e.product.imageUrl[0]+")"}}),s("div",{staticClass:"d-flex flex-column justify-content-between\n                            pl-3 pl-lg-4 text-left"},[s("div",{staticClass:"text-truncate"},[t._v(t._s(e.product.title))]),s("span",{staticClass:"mt-0"},[t._v("x "+t._s(e.quantity))])])]),s("div",[t._v(t._s(t._f("DollarSign")(t._f("toCurrency")(e.product.price)))+" 元")])]),s("hr",{staticClass:"my-2"})])}))],2)]),s("div",{staticClass:"d-flex flex-column align-items-end justify-content-between\n                  w-100 fz_14 fz_lg_16"},[s("div",[e.amount<2e3?s("div",{staticClass:"pt-2"},[t._v(" 訂單金額： "+t._s(t._f("DollarSign")(t._f("toCurrency")(Math.round(e.amount)+60)))+" 元 ")]):s("div",{staticClass:"pt-2"},[t._v(" 訂單金額： "+t._s(t._f("DollarSign")(t._f("toCurrency")(Math.round(e.amount))))+" 元 ")])]),s("div",{staticClass:"pt-2"},[t._v(t._s(e.payment))]),s("div",{staticClass:"pt-2 fz_12 fz_lg_14"},[e.paid?s("div",{staticClass:"text-success font-weight-bold py-2"},[t._v(" 付款完成 ")]):s("div",{staticClass:"text-danger d-flex align-items-center mt-1"},[t._v(" 尚未付款 "),e.paid?t._e():s("div",{staticClass:"d-flex justify-content-end"},[s("a",{staticClass:"btn btn-black\n                        text-decoration-none border-0 rounded-0 p-1 px-3 ml-3 fz_14 fz_lg_16",attrs:{href:"#"},on:{click:function(s){return t.goToPay(e.id)}}},[t._v(" 前往付款 ")])])])])])])])])])])})),0)])])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",[s("hr",{staticClass:"my-2"})])}],n=(s("99af"),{data:function(){return{orderList:{},paid:!1}},filters:{toDate:function(t){var e=new Date(1e3*t);return e.toLocaleDateString()},toTime:function(t){var e=new Date(1e3*t),s="".concat(e.getHours(),":").concat(e.getMinutes(),":").concat(e.getSeconds());return s}},methods:{getOrderlist:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.$store.dispatch("loadingChange",!0);var s="".concat("https://course-ec-api.hexschool.io/api/").concat("8a8058c0-58d2-485b-b7fc-3c9be181cca7","/ec/orders?page=").concat(e,"&paged=10");this.$http.get(s).then((function(e){t.orderList=e.data.data,t.$store.dispatch("loadingChange",!1)})).catch((function(){t.$store.dispatch("loadingChange",!1)}))},goToPay:function(t){var e=this;this.$store.dispatch("getOrderId",t),this.$store.dispatch("payMoney",!1),localStorage.getItem("store")&&localStorage.removeItem("store"),setTimeout((function(){e.$router.push("/payment")}),0)}},created:function(){this.getOrderlist()}}),c=n,l=(s("4671"),s("2877")),o=Object(l["a"])(c,a,i,!1,null,null,null);e["default"]=o.exports},4303:function(t,e,s){},4671:function(t,e,s){"use strict";s("4303")}}]);
//# sourceMappingURL=chunk-0e60fc76.0a8ba85b.js.map