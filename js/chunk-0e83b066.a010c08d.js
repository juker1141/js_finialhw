(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0e83b066"],{"130c":function(t,a,e){},"14a2":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"p-3"},[t._m(0),e("div",{staticClass:"w-100 d-flex justify-content-center mb-4"},[e("div",{staticClass:"w_75 w_md_50"},[e("div",{staticClass:"custom-file mr-3"},[e("label",{staticClass:"custom-file-label text-left",attrs:{for:"customFile"}},[t._v("請選擇檔案")]),e("input",{staticClass:"custom-file-input",attrs:{type:"file",id:"customFile"},on:{change:t.uploadFile}})])])]),e("div",{staticClass:"card-columns"},t._l(t.pagination.currentDataList,(function(a){return e("div",{key:a.id,staticClass:"card card_height"},[e("img",{staticClass:"card-img-top",attrs:{src:a.path,alt:"..."}}),e("div",{staticClass:"card-img-overlay bg-blackOP opacity_0 flex-column\n      d-flex align-items-center justify-content-center imgCard_hover"},[e("div",{staticClass:"fz_12 m-5 hideLongLine h_0\n        bg-white p-1 px-2 text-left mb-3",attrs:{id:a.id}},[t._v(t._s(a.path))]),e("div",{staticClass:"d-flex align-items-center"},[e("button",{staticClass:"btn btn-adminPrimary mr-3 p-2\n          d-flex align-items-center justify-content-center",attrs:{type:"button"},on:{click:function(e){return t.copyFilePath(a.id)}}},[e("span",{staticClass:"material-icons fz_30_important"},[t._v(" content_copy ")])]),e("button",{staticClass:"btn btn-danger p-2\n          d-flex align-items-center justify-content-center",attrs:{type:"button","data-toggle":"modal","data-target":"#delFileModal"},on:{click:function(e){t.delFile=a}}},[e("span",{staticClass:"material-icons fz_30_important"},[t._v(" delete_outline ")])])])])])})),0),e("PaginationAdmin",{attrs:{pages:t.pagination},on:{"update-pagelist":t.changePageList,"update-page":t.changePage,"update-pagegroup":t.changePageGroup}}),e("div",{staticClass:"modal fade",attrs:{id:"delFileModal",tabindex:"-1",role:"dialog"}},[e("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[e("div",{staticClass:"modal-content"},[t._m(1),t._m(2),e("div",{staticClass:"modal-footer border-0"},[e("button",{staticClass:"btn btn-secondary border-0",attrs:{type:"button","data-dismiss":"modal"}},[t._v("取消")]),e("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(a){return t.delFileData(t.delFile)}}},[t._v("確認刪除")])])])])])],1)},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"text-left text-black d-flex font-weight-bold\n  align-items-center mt-3 mt-lg-0 mb-5 pt-lg-5 px-0 px-md-5"},[e("div",{staticClass:"d-flex align-items-center text-black fz_20 fz_lg_24"},[e("span",{staticClass:"material-icons fz_30 fz_lg_36 mr-2"},[t._v("photo_library")]),t._v(" 圖片庫 ")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header bg-danger d-flex align-items-center"},[e("h5",{staticClass:"modal-title text-white"},[t._v("刪除圖片")]),e("button",{staticClass:"btn m-0 p-0 d-flex align-items-center close opacity_1",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{staticClass:"material-icons text-white"},[t._v("clear")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-body"},[t._v(" 確認刪除該圖片嗎？"),e("br"),e("span",{staticClass:"text-danger font-weight-bold"},[t._v("( 刪除後不可復原！！！ )")])])}],o=e("3835"),r=(e("99af"),{data:function(){return{filePath:"",fileData:{},delFile:{},pagination:{count:10,current_page:1,currentDataList:[],totalDataList:[],total_pages:"",pageGroup:[],totalPageGroup:0,current_group:0}}},methods:{getFiles:function(){var t=this;this.$store.dispatch("loadingChange",!0);var a="".concat("https://course-ec-api.hexschool.io/api/").concat("8a8058c0-58d2-485b-b7fc-3c9be181cca7","/admin/storage?paged=200");this.$http.get(a).then((function(a){t.fileData=a.data.data,t.pagination.totalDataList=t.fileData,t.pagination.total_pages=Math.ceil(t.pagination.totalDataList.length/t.pagination.count),t.initPageList(),t.computedPageGroup(),t.$store.dispatch("loadingChange",!1)})).catch((function(){t.$store.dispatch("loadingChange",!1)}))},initPageList:function(){this.pagination.currentDataList=[];for(var t=(this.pagination.current_page-1)*this.pagination.count;t<this.pagination.current_page*this.pagination.count;t+=1)this.pagination.totalDataList[t]&&this.pagination.currentDataList.push(this.pagination.totalDataList[t])},changePage:function(t){this.pagination.current_page=t,this.initPageList()},changePageList:function(t){if("prev"===t&&this.pagination.current_page>1)this.pagination.current_page===this.pagination.pageGroup[0]&&(this.pagination.current_group-=1),this.pagination.current_page-=1;else if("next"===t&&this.pagination.current_page<this.pagination.total_pages){var a=this.pagination.pageGroup.length;this.pagination.current_page===this.pagination.pageGroup[a-1]&&(this.pagination.current_group+=1),this.pagination.current_page+=1}this.computedPageGroup(),this.initPageList()},computedPageGroup:function(){this.pagination.pageGroup=[],this.pagination.totalPageGroup=Math.ceil(this.pagination.total_pages/5);for(var t=0;t<this.pagination.totalPageGroup;t+=1)if(this.pagination.current_group===t)for(var a=0;a<this.pagination.total_pages;a+=1)a>=5*t&&a<5*(t+1)&&this.pagination.pageGroup.push(a+1)},changePageGroup:function(t){"prev"===t?this.pagination.current_group>0&&(this.pagination.current_group-=1):"next"===t&&this.pagination.current_group<this.pagination.totalPageGroup&&(this.pagination.current_group+=1),this.computedPageGroup();var a=Object(o["a"])(this.pagination.pageGroup,1);this.pagination.current_page=a[0],this.initPageList()},uploadFile:function(){var t=this;this.$store.dispatch("loadingChange",!0);var a=document.querySelector("#customFile").files[0],e=new FormData;e.append("file",a);var i="".concat("https://course-ec-api.hexschool.io/api/").concat("8a8058c0-58d2-485b-b7fc-3c9be181cca7","/admin/storage");this.$http.post(i,e,{headers:{"Content-Type":"multipart/form-data"}}).then((function(a){t.filePath=a.data.data.path,t.getFiles(),t.$store.dispatch("messagePush",{message:"圖片上傳成功",status:"success"})})).catch((function(){t.$store.dispatch("messagePush",{message:"圖片上傳失敗，請再嘗試",status:"danger"}),t.getFiles()}))},delFileData:function(t){var a=this;this.$store.dispatch("loadingChange",!0);var e="".concat("https://course-ec-api.hexschool.io/api/").concat("8a8058c0-58d2-485b-b7fc-3c9be181cca7","/admin/storage/").concat(t.id);this.$http.delete(e).then((function(){a.getFiles(),$("#delFileModal").modal("hide"),a.$store.dispatch("messagePush",{message:"圖片刪除成功",status:"success"})})).catch((function(){a.$store.dispatch("messagePush",{message:"圖片刪除失敗，請再嘗試",status:"danger"})}))},copyFilePath:function(t){var a=document.createRange(),e=document.getElementById(t);a.selectNode(e);var i=window.getSelection();i.removeAllRanges(),i.addRange(a),document.execCommand("copy")}},created:function(){this.getFiles()}}),s=r,c=(e("8dd9"),e("2877")),l=Object(c["a"])(s,i,n,!1,null,null,null);a["default"]=l.exports},3835:function(t,a,e){"use strict";function i(t){if(Array.isArray(t))return t}e.d(a,"a",(function(){return c}));e("a4d3"),e("e01a"),e("d3b7"),e("d28b"),e("3ca3"),e("ddb0");function n(t,a){var e=t&&("undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"]);if(null!=e){var i,n,o=[],r=!0,s=!1;try{for(e=e.call(t);!(r=(i=e.next()).done);r=!0)if(o.push(i.value),a&&o.length===a)break}catch(c){s=!0,n=c}finally{try{r||null==e["return"]||e["return"]()}finally{if(s)throw n}}return o}}e("fb6a"),e("b0c0"),e("a630");function o(t,a){(null==a||a>t.length)&&(a=t.length);for(var e=0,i=new Array(a);e<a;e++)i[e]=t[e];return i}function r(t,a){if(t){if("string"===typeof t)return o(t,a);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?o(t,a):void 0}}function s(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t,a){return i(t)||n(t,a)||r(t,a)||s()}},"4df4":function(t,a,e){"use strict";var i=e("0366"),n=e("7b0b"),o=e("9bdd"),r=e("e95a"),s=e("50c4"),c=e("8418"),l=e("35a1");t.exports=function(t){var a,e,u,p,d,g,h=n(t),f="function"==typeof this?this:Array,m=arguments.length,v=m>1?arguments[1]:void 0,b=void 0!==v,_=l(h),y=0;if(b&&(v=i(v,m>2?arguments[2]:void 0,2)),void 0==_||f==Array&&r(_))for(a=s(h.length),e=new f(a);a>y;y++)g=b?v(h[y],y):h[y],c(e,y,g);else for(p=_.call(h),d=p.next,e=new f;!(u=d.call(p)).done;y++)g=b?o(p,v,[u.value,y],!0):u.value,c(e,y,g);return e.length=y,e}},"8dd9":function(t,a,e){"use strict";e("130c")},"9bdd":function(t,a,e){var i=e("825a"),n=e("2a62");t.exports=function(t,a,e,o){try{return o?a(i(e)[0],e[1]):a(e)}catch(r){throw n(t),r}}},a630:function(t,a,e){var i=e("23e7"),n=e("4df4"),o=e("1c7e"),r=!o((function(t){Array.from(t)}));i({target:"Array",stat:!0,forced:r},{from:n})},b0c0:function(t,a,e){var i=e("83ab"),n=e("9bf2").f,o=Function.prototype,r=o.toString,s=/^\s*function ([^ (]*)/,c="name";i&&!(c in o)&&n(o,c,{configurable:!0,get:function(){try{return r.call(this).match(s)[1]}catch(t){return""}}})},d28b:function(t,a,e){var i=e("746f");i("iterator")},e01a:function(t,a,e){"use strict";var i=e("23e7"),n=e("83ab"),o=e("da84"),r=e("5135"),s=e("861d"),c=e("9bf2").f,l=e("e893"),u=o.Symbol;if(n&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var p={},d=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),a=this instanceof d?new u(t):void 0===t?u():u(t);return""===t&&(p[a]=!0),a};l(d,u);var g=d.prototype=u.prototype;g.constructor=d;var h=g.toString,f="Symbol(test)"==String(u("test")),m=/^Symbol\((.*)\)[^)]+$/;c(g,"description",{configurable:!0,get:function(){var t=s(this)?this.valueOf():this,a=h.call(t);if(r(p,t))return"";var e=f?a.slice(7,-1):a.replace(m,"$1");return""===e?void 0:e}}),i({global:!0,forced:!0},{Symbol:d})}},fb6a:function(t,a,e){"use strict";var i=e("23e7"),n=e("861d"),o=e("e8b5"),r=e("23cb"),s=e("50c4"),c=e("fc6a"),l=e("8418"),u=e("b622"),p=e("1dde"),d=p("slice"),g=u("species"),h=[].slice,f=Math.max;i({target:"Array",proto:!0,forced:!d},{slice:function(t,a){var e,i,u,p=c(this),d=s(p.length),m=r(t,d),v=r(void 0===a?d:a,d);if(o(p)&&(e=p.constructor,"function"!=typeof e||e!==Array&&!o(e.prototype)?n(e)&&(e=e[g],null===e&&(e=void 0)):e=void 0,e===Array||void 0===e))return h.call(p,m,v);for(i=new(void 0===e?Array:e)(f(v-m,0)),u=0;m<v;m++,u++)m in p&&l(i,u,p[m]);return i.length=u,i}})}}]);
//# sourceMappingURL=chunk-0e83b066.a010c08d.js.map