<template>
  <div class="modal" tabindex="-1" id="friendInsertModal">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div>
          <i
            class="bi bi-person-plus-fill ms-2 me-2"
            style="font-size: 1.5rem"></i>
          <h5 class="modal-title">친구 추가</h5>
        </div>
        <div class="modal-body">
          <div>
            <h6 class="mx-2 mb-3">
              찾을 친구의 이름 또는 아이디를 입력하세요.
            </h6>
            <div class="input-group pb-3">
              <input
                @keyup.enter="search"
                type="text"
                v-model="inputKeyword"
                class="form-control d-inline-block"
                placeholder="아이디 또는 이름" />
              <button type="button" class="btn btn-primary">
                <span class="bi bi-search"></span>
              </button>
            </div>
          </div>
          <ul
            v-if="userList"
            class="list-unstyled list-group list-group-custom list-group-flush mb-0 border-top">
            <li
              v-for="(user, index) in userList"
              :key="index"
              class="list-group-item px-md-4 py-3 d-flex justify-content-between">
              <a class="d-flex align-items-center text-decoration-none">
                <img
                  v-if="user.userProfileImage"
                  class="rounded-circle"
                  :src="
                    'http://localhost:8080/api/v1' + user.userProfileImage
                  " />
                <img
                  v-else
                  class="rounded-circle"
                  :src="require('@/assets/profile.jpg')" />
                <div class="flex-fill ms-3 text-truncate">
                  <h6 class="d-flex justify-content-between mb-0">
                    <span>{{ user.name }} ({{ user.id }})</span>
                  </h6>
                  <span class="text-muted">{{ user.email }}</span>
                </div>
              </a>
              <i
                @click="addFriend(user.name, user.id)"
                class="bi bi-plus cursor-pointer"
                style="font-size: 2.5rem"></i>
            </li>
            <li
              v-if="userList.length == 0"
              class="list-group-item px-md-4 py-3">
              <a class="d-flex align-items-center text-decoration-none">
                사용자가 존재하지 않습니다.
              </a>
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button
            @click="closeModal"
            class="btn btn-sm btn-secondary btn-outline"
            data-dismiss="modal"
            type="button">
            취소
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import http from "@/util/http.js";

const storeName = "dealInfoStore";

export default {
  name: "FriendInsertModal",
  data() {
    return {
      inputKeyword: "",
      userList: null,
    };
  },
  computed: {
    ...mapState("userStore", ["id"]),
    ...mapState(storeName, ["houseList"]),
    ...mapGetters("userStore", ["profileImgUrl"]),
  },
  methods: {
    ...mapActions("userStore", ["getFriendCount"]),
    search() {
      this.findUser();
    },
    findUser() {
      http
        .get(`/user?id=${this.id}&searchWord=${this.inputKeyword}`)
        .then(({ data }) => {
          let list = data;
          console.log(list);
          this.userList = list.filter((item) => !item.sameUser && !item.friend);
          // console.log(this.userList)
        })
        .catch((error) => {
          console.log(error);
          this.$swal("서버에 문제가 발생하였습니다.", { icon: "error" });
        });
    },
    addFriend(name, toId) {
      this.$swal(`${name}님을 친구로 추가하시겠습니까?`, {
        buttons: true,
      }).then((value) => {
        if (value) {
          http
            .post("/friend", {
              fromId: this.id,
              toId: toId,
            })
            .then(() => {
              this.$swal("처리되었습니다.", "친구 추가가 완료되었습니다.", {
                icon: "success",
              }).then(() => this.closeModal());
              this.getFriendCount(this.id);
              this.userList = null;
            })
            .catch((error) => {
              console.log(error);
              this.$swal("서버에 문제가 발생하였습니다.", { icon: "error" });
            });
        }
      });
    },
    initModal() {
      this.inputKeyword = "";
      this.userList = null;
    },
    closeModal() {
      this.$emit("modal-close");
    },
  },
  mounted() {
    let $this = this;
    this.$el.addEventListener("show.bs.modal", function () {
      $this.initModal();
    });
  },
};
</script>

<style scoped>
.rounded-circle {
  width: 50px !important;
  height: 50px !important;
}
.bi-plus:hover {
  color: dodgerblue;
}
</style>
