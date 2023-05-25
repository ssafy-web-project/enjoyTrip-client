<template>
  <li class="timeline-item mb-4">
    <span class="timeline-icon">
      <font-awesome-icon
        v-if="schedule.theme == 12"
        class="fontawesom"
        icon="fa-solid fa-location-dot fa-lg"
      />
      <font-awesome-icon
        v-if="schedule.theme == 14"
        class="fontawesom"
        icon="fa-solid fa-landmark fa-lg"
      />
      <font-awesome-icon
        v-if="schedule.theme == 15"
        class="fontawesom"
        icon="fa-solid fa-calendar fa-lg"
      />
      <font-awesome-icon
        v-if="schedule.theme == 28"
        class="fontawesom"
        icon="fa-solid fa-person-running fa-lg"
      />
      <font-awesome-icon
        v-if="schedule.theme == 32"
        class="fontawesom"
        icon="fa-solid  fa-bed fa-lg"
      />
      <font-awesome-icon
        v-if="schedule.theme == 38"
        class="fontawesom"
        icon="fa-solid fa-cart-shopping fa-lg"
      />
      <font-awesome-icon
        v-if="schedule.theme == 39"
        class="fontawesom"
        icon="fa-solid  fa-utensils fa-lg"
      />
    </span>
    <h5 class="fw-bold">{{ schedule.title }}</h5>
    <p class="text-muted mb-2 fw-bold">{{ schedule.address }}</p>
    <p class="text-muted mb-2">{{ theme(schedule.theme) }}</p>
    <div class="text-end mb-2">
      <button
        class="btn btn-circle btn-sm mb-1 mr-1"
        name="up"
        @click="upSchedule(schedule.contentId)"
      >
        <b-icon icon="chevron-up"></b-icon>
      </button>
      <button
        class="btn btn-circle btn-sm mb-1 mr-1"
        name="down"
        @click="downSchedule(schedule.contentId)"
      >
        <b-icon icon="chevron-down"></b-icon>
      </button>
      <button
        class="btn btn-circle btn-sm mb-1 mr-1"
        name="delete"
        @click="deleteSchedule(schedule.contentId)"
      >
        <b-icon icon="x"></b-icon>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "PlanWriteItem",
  props: {
    schedule: Object,
  },
  methods: {
    theme(tCode) {
      var themes = {
        12: "관광지",
        14: "문화시설",
        15: "행사/공연/축제",
        28: "레포츠",
        32: "숙박",
        38: "쇼핑",
        39: "음식점",
      };
      return themes[tCode];
    },
    upSchedule(contentId) {
      this.$emit("upSchedule", contentId);
    },
    downSchedule(contentId) {
      this.$emit("downSchedule", contentId);
    },
    deleteSchedule(contentId) {
      this.$emit("deleteSchedule", contentId);
    },
  },
};
</script>

<style scoped>
.btn-circle {
  width: 40px;
  height: 40px;
  text-align: center;
  padding: 6px 0px;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 20px;
  background-color: #5a6167;
  color: #fff;
}
.btn-circle.btn-sm {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 0px 0px;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 15px;
}
.btn-circle.btn-lg {
  width: 50px;
  height: 50px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.33;
  border-radius: 25px;
}
.btn-circle.btn-xl {
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  font-size: 24px;
  line-height: 1.33;
  border-radius: 35px;
}
</style>
