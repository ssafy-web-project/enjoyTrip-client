<template>
  <div class="body_area py-2">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="h3 m-4">비밀번호 변경</h1>
          <div class="d-flex flex-column align-items-center">
            <form class="row g-1 p-0 p-md-4 w-100">
              <table>
                <tr>
                  <td style="width: 15%" class="px-4 border-top border-dark">
                    <label class="mb-4 form-label" for="userPw"
                      >비밀번호 <span class="text-danger">*</span></label
                    >
                  </td>
                  <td v-if="userPwdChk" class="px-4">
                    <input
                      v-model="userPassword"
                      id="userPassword"
                      type="password"
                      class="mb-4 form-control form-control-lg" />
                  </td>
                  <td v-else class="px-4">
                    <input
                      v-model="userPassword"
                      id="userPassword"
                      type="password"
                      class="mb-4 form-control form-control-lg" />
                    <label for="userPassword" class="ps-5 text-danger"
                      >비밀번호가 일치하지 않습니다.
                    </label>
                  </td>
                </tr>
                <tr>
                  <td class="px-4 border-top border-dark">
                    <label class="mb-4 form-label" for="userRePassword"
                      >비밀번호 확인 <span class="text-danger">*</span></label
                    >
                  </td>
                  <td v-if="userPwdChk" class="px-4">
                    <input
                      v-model="userRePassword"
                      @change="passwordcheck"
                      id="userRePassword"
                      type="password"
                      class="mb-4 form-control form-control-lg" />
                  </td>
                  <td v-else class="px-4 form-floating">
                    <input
                      v-model="userRePassword"
                      @change="passwordcheck"
                      id="userRePassword"
                      type="password"
                      class="mb-4 form-control is-invalid form-control-lg" />
                    <label for="userRePassword" class="ps-5 text-danger"
                      >비밀번호가 일치하지 않습니다.
                    </label>
                  </td>
                </tr>
              </table>
              <div class="col-12 text-center my-4">
                <router-link
                  to="/myaccount"
                  class="btn px-4 btn-block btn-secondary lift"
                  >취소</router-link
                >&nbsp;
                <a
                  @click="onChangeBtn"
                  class="btn px-4 btn-block btn-primary lift text-uppercase"
                  >변경 완료</a
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
import { mapState, mapActions } from "vuex";

const storeName = "userStore";

export default {
  name: "ModifyPassword",
  data() {
    return {
      userPassword: "",
      userRePassword: "",
      userPwdChk: true,
    };
  },
  computed: {
    ...mapState("userStore", ["id"]),
    ...mapState(storeName, ["level"]),
  },
  methods: {
    ...mapActions(storeName, ["modifyPassword", "compModifyPassword"]),
    onChangeBtn() {
      if (this.userPassword === "" || this.userRePassword === "") {
        this.$swal("비밀번호를 입력하세요.");
      } else if (this.userPassword === this.userRePassword) {
        this.modifyPassword({
          id: this.id,
          password: this.userPassword,
        });
      } else {
        this.$swal("비밀번호가 일치하지 않습니다. 정확히 입력하세요.", {
          icons: "error",
        });
      }
    },
    passwordcheck() {
      if (this.userPassword === this.userRePassword) {
        this.userPwdChk = true;
      } else if (this.userPassword != this.userRePassword) {
        this.userPwdChk = false;
      }
    },
  },
};
</script>

<style></style>
