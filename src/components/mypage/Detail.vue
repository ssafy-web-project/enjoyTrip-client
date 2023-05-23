<template>
  <div class="body_area py-2">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="h3 m-4">기본 정보</h1>
          <div class="card p-3">
            <div
              class="d-flex flex-wrap flex-md-nowrap justify-content-between"
            >
              <div class="doctor-avatar order-0 order-md-1">
                <button
                  @click="modifyInfo"
                  style="font-size: 14px"
                  class="btn px-2 py-1 btn-animate-2 fill"
                >
                  정보 수정
                </button>
                <button
                  @click="changePassword"
                  style="font-size: 14px"
                  class="btn px-2 py-1 btn-animate-2 fill"
                >
                  비밀번호 변경
                </button>
              </div>
              <div class="doctor-detail order-1 order-md-0">
                <ul class="resume-box" style="padding: 0; margin: 0">
                  <li style="display: flex">
                    <div class="icon text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-person-badge-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z"
                        />
                      </svg>
                    </div>
                    <div class="fw-bold mb-0">아이디 : {{ id }}</div>
                  </li>
                  <li style="display: flex">
                    <div class="icon text-center">
                      <i class="fa fa-envelope"></i>
                    </div>
                    <div class="fw-bold mb-0">E-Mail : {{ email }}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <button
            @click="deleteUser"
            style="font-size: 14px"
            class="btn btn-danger mt-4 mb-4 px-2 py-1 lift float-end"
          >
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http.js";
import { mapState, mapActions } from "vuex";

const SUCCESS = 1;

export default {
  name: "theDetail",
  computed: {
    ...mapState("userStore", ["id", "password", "name", "email"]),
  },
  methods: {
    ...mapActions("userStore", ["logout"]),
    modifyInfo() {
      this.$swal({
        text: "비밀번호를 입력해 주세요.",
        content: {
          element: "input",
          attributes: {
            placeholder: "비밀번호를 입력하세요",
            type: "password",
          },
        },
        buttons: true,
      }).then((value) => {
        if (value) {
          if (value === this.password) {
            this.$router.push("/mypage/modifyinfo");
          } else {
            this.$swal("비밀번호가 일치하지 않습니다.").then(() =>
              this.modifyInfo()
            );
          }
        } else if (value == "") {
          this.$swal("비밀번호를 입력하세요!").then(() => this.modifyInfo());
        }
      });
    },
    changePassword() {
      this.$swal({
        text: "비밀번호를 입력해 주세요.",
        content: {
          element: "input",
          attributes: {
            placeholder: "비밀번호를 입력하세요",
            type: "password",
          },
        },
        buttons: true,
      }).then((value) => {
        if (value) {
          if (value === this.password) {
            this.$router.push("/mypage/changePw");
          } else {
            this.$swal("비밀번호가 일치하지 않습니다.").then(() =>
              this.changePassword()
            );
          }
        } else if (value == "") {
          this.$swal("비밀번호를 입력하세요!").then(() =>
            this.changePassword()
          );
        }
      });
    },
    deleteUser() {
      this.$swal({
        title: "정말 탈퇴하시겠습니까?",
        text: "탈퇴하시려면 비밀번호를 입력해 주세요.",
        content: {
          element: "input",
          attributes: {
            placeholder: "비밀번호를 입력하세요",
            type: "password",
          },
        },
        icon: "warning",
        dangerMode: true,
        buttons: true,
      }).then((value) => {
        if (value) {
          if (value === this.password) {
            http
              .delete(`http://localhost:8080/api/v1/users/${this.id}`)
              .then((response) => {
                this.$swal(
                  "탈퇴 처리가 완료되었습니다.",
                  "지금까지 이용해주셔서 감사합니다.",
                  { icon: "success" }
                ).then(() => this.logout());
                this.$router.push("/user/login");
              })
              .catch((error) => {
                console.log(error);
                this.$swal("서버에 문제가 발생하였습니다.", { icon: "error" });
              });
          } else {
            this.$swal("비밀번호가 일치하지 않습니다.").then(() =>
              this.deleteUser()
            );
          }
        } else if (value == "") {
          this.$swal("비밀번호를 입력하세요!").then(() => this.deleteUser());
        }
      });
    },
  },
  mounted() {},
};
</script>

<style>
.profile {
  margin: 50px;
}

.profile-image {
  text-align: center;
}

.profile-details {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 5px;
}
</style>
