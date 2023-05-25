<template>
  <div>
    <div class="mr-3 mb-5" data-aos="zoom-in" data-aos-delay="200">
      <div class="service-item">
        <div class="img">
          <img
            v-if="findImg(paths)"
            :src="findImage"
            width="416px"
            height="280px"
            @click="selectTour"
          />
          <img
            v-else
            :src="require('@/assets/noimg.gif')"
            width="416px"
            height="280px"
            @click="selectTour"
          />
        </div>
        <div class="details position-relative">
          <a to="/boardDetail" class="stretched-link" @click="selectTour">
            <h3 style="color: var(--color-secondary)">
              {{ schedule.title }}
            </h3>
          </a>
          <div v-for="(path, num) in paths" :key="path.spotid">
            <div v-if="num == paths.length - 1">
              <p>{{ path.title }}</p>
            </div>
            <div v-else>
              <p>{{ path.title }} ➔</p>
            </div>
          </div>

          <h6 class="mt-2 pe-3 text-end">by. {{ schedule.name }}</h6>
          <h6 class="mt-2 pe-3 text-end">조회수 : {{ schedule.hit }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "MainPopularItem",
  data() {
    return {
      findImage: "",
      paths: [],
    };
  },
  props: {
    schedule: Object,
  },
  computed: {
    ...mapState("mainStore", ["popularDetailInfo"]),
  },
  methods: {
    ...mapActions("boardStore", ["getBoard", "getBoardspotList"]),
    ...mapMutations("mainStore", ["CLEAR_POPULAR_DETAIL_INFO"]),
    ...mapActions("mainStore", ["getPopularDetailInfo"]),
    ...mapActions("attraction", ["detailTour"]),

    async selectTour() {
      await this.detailTour(this.schedule);
      this.$emit("updatePopularInfo");
    },

    moveBoard() {
      this.getBoard(this.schedule.scheduleId);
      this.getBoardspotList(this.schedule.scheduleId);
      this.$router.push({ name: "boardDetail" });
    },
    findImg() {
      for (var i = 0; i < this.paths.length; i++) {
        if (this.paths[i].firstImage) {
          this.findImage = this.paths[i].firstImage;
          return true;
        }
      }
      return false;
    },
  },
  watch: {
    async schedule() {
      await this.getPopularDetailInfo(this.schedule.scheduleId);
      this.paths = this.popularDetailInfo;
    },
  },
  async mounted() {
    await this.getPopularDetailInfo(this.schedule.scheduleId);
    this.paths = this.popularDetailInfo;
  },
};
</script>

<style></style>
