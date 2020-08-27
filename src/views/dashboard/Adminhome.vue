<template>
  <div>
    <div class="h_100vh text-left text-black">
      <h3 class="fontOrbitron mb-3 p-5 bg-adminSecondary d-block d-lg-none">
        Hardware Store Admin
      </h3>
      <div class="p-3">
        <h3 class="text-left d-flex align-items-center mb-5 pt-lg-5 px-5 px-md-6">
          <span class="material-icons fz_30 mr-3">home</span>
          首頁
        </h3>
        <div class="row px-5 pb-5 px-md-6">
          <div class="col-12 col-lg-7 col-xl-8">
            <p class="h1 mb-5">您好，歡迎來到<br class="d-block d-xl-none"/>
              <span class="fontOrbitron"> Hardware Store Admin </span><br />
              管理系統
            </p>
            <div class="fz_30">
              今天是 {{ nowDate.year }} {{ nowDate.month }} {{ nowDate.day }}
              <span class="d-none d-xl-inline-block">，</span>
              <br class="d-xl-none"/>
              {{ nowDate.week }}
            </div>
          </div>
          <div class="col-0 col-lg-5 col-xl-4">
            <div class="fz_65 fontOrbitron w_320px text-right time_ml_auto d-none d-lg-block">
              <div class="d-flex justify-content-start align-items-end">
                <div class="d-inline-block mr-2">{{ nowDate.hour }} : {{ nowDate.min }}</div>
                <div class="fz_30 d-inline-block mb_13 w_50px">{{ nowDate.sec }}</div>
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
