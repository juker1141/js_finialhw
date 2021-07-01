<template>
  <div>
    <div class="h_100vh text-left text-black">
      <div class="p-3">
        <div class="text-left d-flex align-items-center fz_20 fz_lg_24
        font-weight-bold mt-3 mb-4 my-lg-4 px-3 px-md-5">
          <span class="material-icons fz_30 fz_lg_36 mr-2">home</span>
          首頁
        </div>
        <div class="row px-5 pb-5 px-md-6">
          <div class="col-12 px-0 px_lg_15 col-lg-7 col-xl-8">
            <p class="fz_24 fz_lg_36 mb-5">您好，歡迎來到<br/>
              <span class="fontOrbitron"> Hardware Store Admin </span>
              管理系統
            </p>
            <div class="fz_lg_24">
              今天是 {{ nowDate.year }} {{ nowDate.month }} {{ nowDate.day }}
              <span class="d-none d-xl-inline-block">-</span>
              {{ nowDate.week }}
            </div>
          </div>
          <div class="col-0 col-lg-5 col-xl-4">
            <div class="fz_65 fontOrbitron w_340px text-right time_ml_auto d-none d-lg-block">
              <div class="d-flex justify-content-start align-items-end">
                <div class="d-inline-block mr-2">{{ nowDate.hour }} : {{ nowDate.min }}</div>
                <div class="fz_30_important d-inline-block mb_13 w_50px">{{ nowDate.sec }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowDate: {
        year: '',
        month: '',
        day: '',
        week: '',
        hour: '',
        min: '',
        sec: '',
      },
    };
  },
  methods: {
    updateTime() {
      const Today = new Date();
      const weekdays = '星期日,星期一,星期二,星期三,星期四,星期五,星期六'.split(',');
      this.nowDate = {
        year: `${Today.getFullYear()} 年`,
        month: `${(Today.getMonth() + 1)} 月`,
        day: `${Today.getDate()} 日`,
        week: `${weekdays[Today.getDay()]}`,
        hour: `${Today.getHours()}`,
        min: `${Today.getMinutes()}`,
        sec: `${Today.getSeconds()}`,
      };
    },
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
};
</script>
