<template>
  <div class="container my-5">
    <form class="row g-3 basic-form">
      <div class="col-md-12">
        <label class="form-label ms-3"
          >제목 <sup class="text-danger">*</sup></label
        >
        <input
          v-model="title"
          type="text"
          class="form-control"
          placeholder="제목을 입력하세요"
          required
        />
      </div>
      <div class="col-12">
        <div class="my-3">
          <label class="form-label ms-3"
            >내용 <sup class="text-danger">*</sup></label
          >
          <div id="divEditorInsert"></div>
        </div>
      </div>
      <div class="col-12">
        <button @click.prevent="boardInsert" class="btn btn-primary float-end">
          작성완료
        </button>
        <router-link to="/board/list" class="me-2 btn btn-secondary float-end"
          >취소</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapState } from "vuex";

Vue.use(CKEditor);

import http from "@/util/http.js";

export default {
  name: "BoardNoticeInsert",
  data() {
    return {
      title: "",
      CKEditor: "",
    };
  },
  computed: {
    ...mapState("userStore", ["id"]),
  },
  methods: {
    removeFormattingTags(data) {
      const parser = new DOMParser();
      const parsedData = parser.parseFromString(data, "text/html");
      let textContent = parsedData.body.textContent;
      return textContent.trim();
    },
    boardInsert() {
      http
        .post("/notices", {
          userId: this.id,
          title: this.title,
          content: this.removeFormattingTags(this.CKEditor.getData()),
        })
        .then(({ data }) => {
          this.$router.push("/board/list");
        })
        .catch((error) => {
          this.$swal("서버에 문제가 발생하였습니다.", { icon: "error" });
        });
    },
  },
  mounted() {
    ClassicEditor.create(document.querySelector("#divEditorInsert"))
      .then((editor) => {
        this.CKEditor = editor;
      })
      .catch((err) => {
        console.error(err.stack);
      });
  },
};
</script>

<style>
.ck-content {
  height: 500px;
}
</style>
