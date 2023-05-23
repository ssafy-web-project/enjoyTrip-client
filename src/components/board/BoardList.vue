<template>
  <div class="container" style="min-height: 750px">
    <div class="card bg-transparent border-0 mt-4">
      <table id="dataTable" class="table table-hover">
        <thead>
          <tr style="background: #0ea2bd">
            <th class="ps-3" style="width: 10%">순번</th>
            <th class="ps-3" style="width: 50%">제목</th>
            <th class="ps-3" style="width: 15%">작성자</th>
            <th class="ps-3" style="width: 15%">작성일시</th>
            <th class="ps-3" style="width: 10%">조회수</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="board-item"
            v-for="(board, index) in getBoardList"
            v-bind:key="index"
          >
            <td class="ps-3">
              <span>{{ board.noticeId }}</span>
            </td>
            <td class="w-50 text-start">
              <h6 class="mb-0">
                <a
                  @click="toDetail(board.noticeId)"
                  class="color-700 text-decoration-none"
                  >{{ board.title }}</a
                >
              </h6>
            </td>
            <td>
              <div class="dropdown">
                <button class="btn btn-sm text-decoration-none" role="button">
                  {{ board.name }}
                </button>
              </div>
            </td>
            <td>
              <span class="d-block">{{
                new Date(board.registerTime).getFullYear() +
                "." +
                (new Date(board.registerTime).getMonth() + 1 < 10
                  ? "0" + (new Date(board.registerTime).getMonth() + 1)
                  : new Date(board.registerTime).getMonth() + 1) +
                "." +
                (new Date(board.registerTime).getDate() < 10
                  ? "0" + new Date(board.registerTime).getDate()
                  : new Date(board.registerTime).getDate())
              }}</span>
            </td>
            <td>
              <span class="d-block">{{ board.hit }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination class="mt-3" v-on:call-parent="movePage"></Pagination>
    </div>
    <div v-if="isAuth" class="my-2 d-flex justify-content-end">
      <router-link class="btn btn-primary" to="/board/insert"
        >글쓰기</router-link
      >
    </div>
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import util from "@/util/util.js";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "BoardNoticeList",
  components: {
    Pagination,
  },
  computed: {
    ...mapState("userStore", ["isAuth", "level", "id"]),
    ...mapGetters("boardStore", ["getBoardList"]),
  },
  methods: {
    ...mapActions("boardStore", ["boardList", "boardDetail"]),
    ...mapMutations("boardStore", ["SET_BOARD_MOVE_PAGE"]),

    movePage(pageIndex) {
      this.SET_BOARD_MOVE_PAGE(pageIndex);
      this.boardList();
    },

    toDetail(noticeId) {
      this.boardDetail({ noticeId, id: this.id });
    },
  },
  created() {
    this.boardList();
  },
};
</script>
