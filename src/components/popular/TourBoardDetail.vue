<template>
  <!-- 관광지 상세정보 모달 -->
  <b-modal
    v-if="tour && tour.length != 0"
    v-model="tourModalState"
    size="xl"
    scrollable
    no-close-on-backdrop
    title="일정 공유"
    @hidden="close">
    <b-container>
      <h2>{{ tour.title }}</h2>
      <p class="mb-0">by.{{ tour.name }}</p>
      <p class="mb-0">
        {{ tour.registerTime | moment("LLL") }}
        <span class="mb-0 float-right"> 조회수 : {{ tour.hit }}</span>
      </p>
      <ul class="timeline">
        <tour-board-timeline-item
          v-for="(item, index) in tour.planInfos"
          :key="index"
          :item="item"></tour-board-timeline-item>
      </ul>
    </b-container>

    <template #modal-footer>
      <div class="w-100">
        <b-button
          variant="outline"
          class="float-right btn-close"
          @click="close">
          닫기
        </b-button>

        <b-button
          v-if="id == tour.userId"
          variant="outline-danger"
          class="float-right mr-2"
          @click="deleteSharedPlan">
          삭제하기
        </b-button>

        <b-button
          v-if="id == tour.userId"
          variant="outline-primary"
          class="float-right mr-2"
          @click="modifySharedPlan">
          수정하기
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import TourBoardTimelineItem from "@/components/popular/TourBoardTimelineItem.vue";

import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "TourBoardDetail",
  components: {
    TourBoardTimelineItem,
  },
  computed: {
    ...mapState("attraction", ["tour", "isTourModalOpen"]),
    ...mapState("userStore", ["id"]),
    ...mapGetters("attraction", {
      value: "tourModalState",
    }),
    tourModalState: {
      get() {
        return this.value;
      },
      set(newValue) {
        return newValue;
      },
    },
  },
  methods: {
    ...mapActions("attraction", ["deletePlan"]),
    ...mapMutations("attraction", ["TOUR_MODAL_SWITCH"]),
    ...mapActions("mainStore", ["getPopularInfo"]),
    close() {
      this.TOUR_MODAL_SWITCH(false);
    },
    deleteSharedPlan() {
      if (confirm("일정을 삭제하시겠습니까?")) {
        this.deletePlan(this.tour);
        this.close();
      }
    },
    modifySharedPlan() {
      this.close();
      this.$router.push({ name: "tourboardmodify" });
    },
  },
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: "twayair";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayair.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

* {
  font-family: twayair;
}

.timeline {
  list-style: none;
  padding: 20px 0 20px;
  position: relative;

  &:before {
    background-color: #eee;
    bottom: 0;
    content: " ";
    left: 50px;
    margin-left: -1.5px;
    position: absolute;
    top: 0;
    width: 3px;
  }
}
.btn-close {
  color: #00ce7c;
  border: 1px solid #00ce7c;
}
.btn-close:hover {
  color: white;
  background-color: #00ce7c; /* border: 1px solid #007e4b; */
}
</style>
