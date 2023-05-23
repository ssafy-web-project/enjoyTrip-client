<template>
  <div class="container my-5">
    <form class="row g-3 basic-form">
      <div class="col-md-12">
        <label class="form-label ms-3"
          >제목 <sup class="text-danger">*</sup></label
        >
        <input v-model="Title" type="text" class="form-control" required="" />
      </div>
      <div class="col-12">
        <div class="my-3">
          <label class="form-label ms-3"
            >내용 <sup class="text-danger">*</sup></label
          >
          <div id="divEditorUpdate"></div>
        </div>
      </div>
      <div class="col-12">
        <button @click.prevent="boardUpdate" class="btn btn-primary float-end">
          수정완료
        </button>
        <router-link to="/board/notice" class="me-2 btn btn-secondary float-end"
          >취소</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState, mapMutations } from "vuex";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

Vue.use(CKEditor);

import http from "@/util/http.js";

const storeName = "boardStore";

export default {
  name: "BoardModify",

  data() {
    return {
      Title: "",
      CKEditor: "",
    };
  },
  computed: {
    ...mapState(storeName, ["title", "noticeId", "content"]),
    ...mapState("userStore", ["id"]),
  },
  methods: {
    ...mapActions(storeName, ["boardDetail"]),
    ...mapMutations(storeName, ["SET_BOARD_TITLE"]),

    removeFormattingTags(data) {
      const parser = new DOMParser();
      const parsedData = parser.parseFromString(data, "text/html");
      const textContent = parsedData.body.textContent;
      return textContent.trim();
    },

    boardUpdate() {
      console.log(99999999);
      console.log(
        this.noticeId,
        this.Title,
        this.removeFormattingTags(this.CKEditor.getData())
      );
      http
        .patch("/notices", {
          noticeId: this.noticeId,
          title: this.Title,
          content: this.removeFormattingTags(this.CKEditor.getData()),
        })
        .then(({ data }) => {
          this.boardDetail({ noticeId: this.noticeId, id: this.id });
        })
        .catch((error) => {
          console.log("noticeModifyVue: error ");
          console.log(error);
          this.$swal("서버에 문제가 발생하였습니다.", { icon: "error" });
        });
    },
  },
  mounted() {
    ClassicEditor.create(document.querySelector("#divEditorUpdate"))
      .then((editor) => {
        editor.setData(this.content);
        this.CKEditor = editor;
      })
      .catch((err) => {
        console.error(err.stack);
      });
    this.Title = this.title;
  },
};
</script>

<style></style>
