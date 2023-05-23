<template>
  <div class="body_area py-2">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="h3 m-4">정보 수정</h1>
          <div class="d-flex flex-column align-items-center">
            <form class="row g-1 p-0 p-md-4 w-100">
              <table>
                <tr>
                  <td style="width: 15%" class="px-4 border-top border-dark">
                    <label class="mb-4 form-label" for="userName"
                      >이름 <span class="text-danger">*</span></label
                    >
                  </td>
                  <td class="px-4">
                    <input
                      v-model="userName"
                      id="userName"
                      type="text"
                      class="mb-4 form-control form-control-lg" />
                  </td>
                </tr>
                <tr>
                  <td class="px-4 border-top border-dark">
                    <label class="mb-4 form-label" for="userId"
                      >아이디 <span class="text-danger">*</span></label
                    >
                  </td>
                  <td class="px-4">
                    <input
                      readonly
                      v-model="userId"
                      id="userId"
                      type="text"
                      class="mb-4 form-control form-control-lg" />
                  </td>
                </tr>
                <tr>
                  <td class="px-4 border-top border-dark">
                    <label class="mb-4 form-label" for="userId"
                      >이메일 <span class="text-danger">*</span></label
                    >
                  </td>
                  <td class="px-4">
                    <input
                      v-model="userEmail"
                      id="userEmail"
                      type="email"
                      class="mb-4 form-control form-control-lg" />
                  </td>
                </tr>
              </table>
              <div class="col-12 text-center my-4">
                <router-link
                  to="/mypage"
                  class="btn px-4 btn-block btn-secondary lift text-uppercase"
                  >취소</router-link
                >&nbsp;
                <a
                  @click="modifyInfo"
                  class="btn px-4 btn-block btn-primary lift text-uppercase"
                  >수정 완료</a
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http.js";
import { mapState, mapMutations } from "vuex";

const storeName = "userStore";

export default {
  name: "ModifyInfo",
  data() {
    return {
      userId: "",
      userName: "",
      userEmail: "",
    };
  },
  methods: {
    ...mapMutations(storeName, ["SET_USER_MODIFY", "SET_COMPANY_USER_MODIFY"]),
    modifyInfo() {
      http
        .patch("users/info", {
          id: this.userId,
          name: this.userName,
          email: this.userEmail,
        })
        .then((response) => {
          console.log(response);
          this.SET_USER_MODIFY({
            name: this.userName,
            email: this.userEmail,
            phone: this.userPhone,
          });
          this.$swal("정보 수정이 완료되었습니다.", {
            icon: "success",
          }).then(() => this.$router.push("/mypage"));
        })
        .catch((error) => {
          console.log("RegisterVue: error : ");
          console.log(error);
          this.$swal("서버에 문제가 발생하였습니다.", { icon: "error" });
        });
    },
  },
  computed: {
    ...mapState(storeName, [
      "id",
      "name",
      "email",
      "address",
      "phone",
      "level",
    ]),
  },
  created() {
    this.userId = this.id;
    this.userName = this.name;
    this.userEmail = this.email;
  },
};
</script>

<style></style>
