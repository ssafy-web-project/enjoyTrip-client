<template>
  <div
    class="col-lg-3 mb-5 portfolio-item"
    :class="category(spotItem.contentTypeId)"
  >
    <div class="post-box">
      <div
        class="post-img text-center"
        style="width: 250px; height: 200px; margin: auto"
      >
        <b-img
          v-if="spotItem.firstImage"
          :src="spotItem.firstImage"
          fluid
          :alt="spotItem.title"
          style="max-width: 100%; max-height: 100%; margin: auto"
        />
        <b-img
          v-else
          :src="require('@/assets/noimg.gif')"
          fluid
          :alt="spotItem.title"
          style="max-width: 100%; max-height: 100%; margin: auto"
        />
      </div>
      <h3 class="post-title">{{ spotItem.title }}</h3>
      <p>{{ spotItem.addr1 }}</p>
      <a @click="spotDetail" style="cursor: pointer"
        >자세히 보기 <b-icon icon="arrow-right"></b-icon>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "SpotListItem",
  props: {
    spotItem: Object,
  },
  methods: {
    ...mapActions("spotStore", ["getSpotDetail"]),
    ...mapActions("commentStore", ["getData"]),
    ...mapMutations("spotStore", [
      "SET_DETAIL_SPOT",
      "CLEAR_DETAIL_SPOT",
      "CLEAR_SPOT_WID",
    ]),

    spotDetail() {
      this.CLEAR_DETAIL_SPOT();
      this.CLEAR_SPOT_WID();
      if (this.spotItem) {
        this.getSpotDetail(this.spotItem.contentId);
        this.getData(this.spotItem.contentId);
      }
      this.$router.push({ name: "spotDetail" }).catch(() => {});
    },
    category(contentTypeId) {
      let categories = {
        12: "hotspot",
        14: "culture",
        15: "festival",
        25: "course",
        28: "sports",
        32: "hotel",
        38: "shopping",
        39: "food",
      };
      return "filter-" + categories[contentTypeId];
    },
  },
  computed: {
    ...mapState("spotStore", ["spot"]),
  },
};
</script>

<style></style>
