<template>
  <article class="cmt_unit" id="comment_65603837">
    <!-- <div class="inkpf_wrap">
      <span class="inkpf round"
        ><Gravatar :email="comment.user.email" class="profile-img inkpf_img"
      /></span>
    </div> -->
    <div class="cmt_header">
      <div class="cmt_ctrl_wrap ctrl_wrap">
        <span>
          {{ comment.userId }}
        </span>
        <button
          v-if="this.id == comment.userId"
          class="bt_cmt_ctrl bt_ctrl"
          type="button"
          @click="deleteComment"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <div class="cmt_body">
      <div
        class="comment_65603837_62105361 rhymix_content xe_content"
        data-pswp-uid="2"
      >
        {{ comment.content }}
      </div>
      <div class="cmt_buttons">
        <div class="cmt_vote">
          <div class="bt_wrap">
            <!--@click="likeComment"-->
            <button
              @click="likeComment"
              class="text_en bt bt_vote"
              type="button"
              title="추천"
            >
              <i slot="icon" style="color: #ff0000" class="fa fa-heart"></i>
              <span class="voted_count"> {{ comment.likeUserCount }}</span>
            </button>
          </div>
        </div>
      </div>
      <div class="cmt_date_wrap text_en font_grey1">
        <div class="cmt_date">{{ comment.createdAt.slice(0, 10) }}</div>
      </div>
    </div>
  </article>
</template>

<script>
import http from "@/util/http";
// import Gravatar from "vue-gravatar";
// import VueStar from "@/components/spot/VueStar";
import { mapState } from "vuex";

export default {
  name: "CommentListItem",

  props: {
    comment: {
      type: Object,
    },
    // loginUser: {
    //   type: Object,
    // },
  },
  // filters: {
  //   checkChecked: function (arr, id) {
  //     return arr.includes(id);
  //   },
  // },
  computed: {
    ...mapState("spotStore", ["spot"]),
    ...mapState("userStore", ["isAuth", "id"]),
  },
  methods: {
    likeComment() {
      if (this.isAuth) {
        http
          .patch(`/spot/comment/${this.comment.commentId}`)
          .then(() => {
            this.$emit("updateComment");
          })
          .catch(() => {
            alert("에러발생");
          });
      }
    },
    deleteComment: function () {
      http
        .delete(`/spot/comment/${this.comment.commentId}`)
        .then(() => {
          this.$emit("updateComment");
        })
        .catch(() => {
          alert("해당 작성자만 삭제할 수 있습니다.");
        });
    },
  },
  components: {
    // Gravatar,
    // VueStar,
  },
};
</script>

<style scoped>
.VueStar {
  position: absolute;
  transform: translate(-48%, -30%);
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
