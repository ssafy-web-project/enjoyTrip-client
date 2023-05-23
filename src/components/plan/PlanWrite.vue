<template>
  <section id="my_schedule" style="padding-top: 0">
    <div style="min-height: 750px; width: 29vh">
      <div class="section-header">
        <h3>나의 여행 계획</h3>
        <p v-if="!schedules.length" id="notice_add_schedule">
          여행 계획에 여행지가 없습니다, 지도에서 검색 후 추가해주세요 :)
        </p>
      </div>
      <div class="schedule_list">
        <ul class="timeline-with-icons" id="planInner">
          <plan-write-item
            v-for="schedule in schedules"
            :key="schedule.contentId"
            :schedule="schedule"
            v-on:upSchedule="upSchedule"
            v-on:downSchedule="downSchedule"
            v-on:deleteSchedule="deleteSchedule"></plan-write-item>
        </ul>
        <router-link
          to="/planDetail"
          v-if="schedules.length"
          class="btn btn-default float-right mt-3"
          id="btn_save"
          >저장</router-link
        >
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
import PlanWriteItem from "@/components/plan/PlanWriteItem";

export default {
  name: "PlanWrite",
  components: {
    PlanWriteItem,
  },
  computed: {
    ...mapState("planStore", ["schedules"]),
  },
  methods: {
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

<style>
#planInner {
  list-style-type: none;
  padding-left: 0;
}
</style>
