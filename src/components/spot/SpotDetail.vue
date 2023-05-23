<template>
  <section id="spot_detail" data-aos="zoom-in-up">
    <div v-if="spot" class="container" style="min-height: 750px">
      <div class="section-header">
        <h2 id="spot_title">{{ spot.title }}</h2>
      </div>

      <div class="row" id="spot_detail_info">
        <div class="col-4 d-flex">
          <b-img
            v-if="spot.firstImage"
            :src="spot.firstImage"
            fluid
            :alt="spot.title"
            style="max-width: 100%; max-height: 100%; margin: auto" />
          <b-img
            v-else
            :src="require('@/assets/profile.jpg')"
            fluid
            :alt="spot.title"
            style="max-width: 100%; max-height: 100%; margin: auto" />
        </div>
        <div
          class="mb-4 col-8 d-flex flex-wrap align-items-center ps-3"
          id="info">
          <div class="mt-2">
            <p class="text-start" style="color: black">
              <b-icon icon="telephone-fill"></b-icon> <b>Tel :</b>
              {{ spot.tel ? spot.tel : "-" }}<br />
              <b-icon icon="pin-map-fill"></b-icon> <b>Address :</b>
              {{ spot.addr1 }}<br />
              <b-icon icon="lightbulb-fill"></b-icon> <b>Details</b><br />{{
                spot.overview
              }}
            </p>
          </div>
        </div>
      </div>
      <detail-map :spot="spot"></detail-map>
      <!-- 추천 누른 사람 목록 -->
      <div id="voted_who">
        <div
          class="atc_who bg_grey1 scroll_wrap show"
          style="display: flex; justify-content: center; align-items: center">
          <div style="font-size: 3.5em; font-weight: bold">
            이 장소를 같이 좋아해준 사람들
          </div>
        </div>
      </div>
      <!--댓글부분  -->
      <div id="comment" class="cmt cmt_bubble">
        <div class="cmt_wrap has_top">
          <!-- 댓글리스트 -->
          <div class="cmt_list">
            <CommentListItem
              v-for="(comment, idx) in comments"
              :key="idx"
              :comment="comment"
              @updateComment="updateComment" />
          </div>
        </div>

        <!-- 댓글 작성부분 -->
        <div v-if="isAuth" class="cmt_write cmt_write_unit">
          <!-- <span class="inkpf round"
            ><Gravatar :email="useremail" class="profile-img inkpf_img"
          /></span> -->
          <form v-on:submit.prevent="" action="/" class="cmt_form">
            <div class="cmt_write_input text_ver">
              <textarea
                class="cmt_textarea"
                cols="50"
                rows="4"
                placeholder="댓글 내용을 입력해주세요."
                @keyup.enter="toCommentCreate"
                v-model="commentContent"
                style="width: 100%"></textarea>
            </div>
            <div class="cmt_write_option">
              <div class="bt_area bt_right">
                <button
                  @click="toCommentCreate"
                  class="ib ib2 ib_color"
                  type="submit">
                  댓글 등록
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DetailMap from "@/components/map/DetailMap";
import CommentListItem from "@/components/spot/CommentListItem";
import http from "@/util/http";
// import VueStar from '@/components/spot/VueStar'

export default {
  name: "SpotDetail",
  components: {
    DetailMap,
    CommentListItem,
    // VueStar
  },
  data() {
    return {
      commentContent: "",
    };
  },
  computed: {
    ...mapState("spotStore", ["spot"]),
    ...mapState("userStore", ["id", "isAuth"]),
    ...mapState("commentStore", ["comments"]),
  },
  methods: {
    ...mapActions("commentStore", ["commentCreate", "getData"]),
    async toCommentCreate() {
      await this.commentCreate({
        comment: {
          contentId: this.spot.contentId,
          userId: this.id,
          content: this.commentContent,
        },
      });
      await this.getData(this.spot.contentId);
      this.commentContent = "";
    },
    updateComment() {
      this.getData(this.spot.contentId);
    },
  },
};
</script>

<style scoped>
#map {
  margin-top: 50px;
  height: 400px;
  width: 100%;
}
.weather-widget {
  margin-bottom: 20px;
}
.VueStar {
  position: absolute;
  transform: translate(-48%, -30%);
}

.bg_grey1 {
  background-color: #f7f7f7;
}

.atc_who {
  word-break: break-all;
  text-align: center;
  margin-top: 25px;
  padding: 0 10px;
  border-radius: 20px;
  font-size: 11px;
  height: 105px;
  line-height: 160%;
}

.cmt_list {
  text-align: left;
}
input,
textarea {
  outline: 0;
  margin: 0;
}
textarea {
  resize: vertical;
}
button,
input[type="button"] {
  cursor: pointer;
  margin: 0;
  -webkit-font-smoothing: subpixel-antialiased !important;
  border: 0;
}

.cmt_member_only {
  padding: 50px 0;
}
.cmt_member_only p {
  padding: 12px 15px;
  margin-bottom: 15px;
  border-radius: 20px;
}
.cmt_member_only a {
  margin: 0 5px;
}
.cmt_buttons,
.cmt_title,
.cmt_unit {
  position: relative;
}
.cmt_member_only p,
.cmt_title h3,
.list_category2 > ul {
  display: inline-block;
}
.cmt_title .bt_cmt_write {
  position: absolute;
  top: 12px;
}
.cmt_title .bt_cmt_write button {
  padding: 5px 10px;
}
.cmt_unit .cmt_rank {
  display: inline-block;
  position: relative;
  margin-right: 3px;
  border-radius: 5px;
  color: #fff;
  vertical-align: bottom;
}
.cmt_unit .cmt_rank i {
  position: absolute;
  left: 5px;
  top: 1px;
  font-size: 14px;
}
.cmt_unit .cmt_rank1 {
  background-color: #d4af37;
}
.cmt_unit .cmt_rank2 {
  background-color: #a9a9a9;
}
.cmt_unit .cmt_rank3 {
  background-color: #b08d55;
}
.cmt_unit .nickname {
  font-weight: 700;
}
.cmt_buttons {
  height: 24px;
  margin-top: 10px;
}
.cmt_buttons:empty {
  display: none;
}
.cmt_buttons .bt_wrap {
  display: inline-block;
  border-radius: 5px;
  vertical-align: middle;
}
.cmt_buttons .bt_wrap .bt {
  display: inline-block;
  margin-right: 1px;
  padding: 0 8px;
  line-height: 24px;
}
.cmt_buttons .bt_wrap .bt:first-of-type {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.cmt_buttons .bt_wrap .bt:last-of-type {
  margin-right: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.cmt_buttons .bt_cmt_report {
  margin-right: 2px;
}
.cmt_bubble .cmt_unit:first-of-type {
  margin-top: 0;
}
.cmt_bubble .inkpf_wrap {
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
}
.cmt_bubble .cmt_unit:not(.no_profile) .cmt_rank {
  position: absolute;
  left: -5px;
  top: -5px;
  margin-right: 0;
  padding: 0;
  width: 22px;
  height: 22px;
  line-height: 22px;
  border-radius: 50%;
}
.cmt_bubble .cmt_header {
  padding-bottom: 5px;
}
.cmt_bubble .cmt_body {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: bottom;
}
.cmt_bubble .cmt_date_wrap {
  position: absolute;
  left: 100%;
  bottom: 0;
  margin-left: 5px;
  vertical-align: bottom;
  white-space: nowrap;
}
.cmt_bubble .cmt_date_wrap .cmt_time {
  opacity: 0;
  transition-property: opacity;
  transition-duration: 0.3s;
}
.cmt_bubble .cmt_body:hover .cmt_date_wrap .cmt_time {
  opacity: 1;
}
.cmt_bubble .cmt_buttons .bt {
  background-color: #fff;
}
.cmt_bubble .cmt_buttons .bt2 {
  display: inline-block;
  padding: 0 8px;
  margin-right: 3px;
  line-height: 24px;
  vertical-align: middle;
}
.cmt_write_unit {
  position: relative;
}
.cmt_write_unit .inkpf {
  position: absolute;
  left: 0;
}
.cmt_write_input textarea {
  width: 100%;
  box-sizing: border-box;
  border: 0;
  transition-property: background-color;
  transition-duration: 0.3s;
  overflow: hidden;
  resize: none;
  padding: 15px;
  border-radius: 15px;
}
.cmt_write_input textarea:focus {
  background-color: #fcf8e3;
}
.cmt_write_option {
  position: relative;
  margin-top: 5px;
}
.cmt_write_option .unit {
  margin-right: 10px;
}
.cmt_write_option .bt_write_type i {
  transition-property: color;
  transition-duration: 0.3s;
}
.cmt_write_option .bt_area {
  position: absolute;
  right: 0;
  bottom: 0;
}
.cmt_bubble .cmt_wrap {
  padding: 25px 25px 0;
}
.cmt_bubble .cmt_unit {
  padding-left: 45px;
  margin-top: 25px;
}
.cmt_bubble .inkpf_wrap {
  width: 40px;
}
.cmt_bubble .cmt_header {
  padding-left: 13px;
  font-size: 13px;
}
.cmt_bubble .cmt_body {
  min-width: 249px;
  max-width: calc(100% - 80px);
  padding: 14px 20px;
  border-radius: 15px;
}
.cmt_bubble .cmt_body .xe_content {
  font-size: 13px;
  line-height: 180%;
}
.cmt_bubble .cmt_date_wrap {
  font-size: 11px;
}
.cmt_bubble .cmt_ctrl_wrap {
  display: inline-block;
  position: relative;
  z-index: 5;
}
.cmt_bubble .bt_cmt_ctrl {
  margin-left: 5px;
  padding: 1px 5px 0;
  border-radius: 5px;
}
.cmt_bubble .bt_cmt_ctrl:hover {
  color: #fff;
}
.cmt_bubble .cmt_ctrl {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  z-index: 2;
}
.cmt_bubble .cmt_ctrl a {
  display: inline-block;
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  white-space: nowrap;
}
.cmt_bubble .cmt_ctrl a:first-of-type {
  border-radius: 10px 10px 0 0;
}
.cmt_bubble .cmt_ctrl a:last-of-type {
  border-radius: 0 0 10px 10px;
  border-bottom: none;
}
.cmt_bubble .cmt_buttons .bt2 {
  font-size: 12px;
}
.cmt_write_unit {
  padding: 25px 0 25px 45px;
  margin: 0 25px;
}
.cmt_write_unit .inkpf {
  top: 25px;
}
.cmt_write_option {
  height: 32px;
}
.bg_grey2,
.board_name2 .inner,
.cmt_member_only p,
.ib_mono,
.ib_monoC,
body {
  background-color: #eee;
}

.cmt_bubble .cmt_body,
.cmt_title,
.cmt_write_input textarea {
  background-color: #f7f7f7;
}

.ib_color {
  background-color: #ec5e5e;
}
</style>
