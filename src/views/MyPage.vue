<template>
  <div class="block-header pt-4 pt-lg-5 pb-0">
    <div class="container">
      <div class="row mb-3">
        <div class="col">
          <ul class="breadcrumb bg-transparent mb-0">
            <li class="breadcrumb-item">
              <router-link to="/" class="text-decoration-none"
                >Home</router-link
              >
            </li>
            <li class="breadcrumb-item active">마이 페이지</li>
          </ul>
        </div>
        <div class="col">
          <ul class="list-unstyled d-sm-flex justify-content-end mb-0 d-none">
            <li>
              <input
                @change="uploadProfileImg"
                type="file"
                class="form-control d-none"
                id="avatar"
              />
              <label class="position-relative" for="avatar">
                <span class="btn btn-primary btn-sm border lift">
                  <i class="bi bi-upload"></i>&nbsp; 프로필 이미지 첨부
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div>
            <div class="profile">
              <div class="container">
                <div class="row">
                  <div class="col-md-4">
                    <div class="profile-image">
                      <img
                        v-if="profileImgUrl"
                        :src="profileImgUrl"
                        alt="프로필 이미지"
                        style="width: 140px; height: 140px"
                        class="rounded-circle"
                      />
                      <img
                        v-else
                        src="http://localhost:8080/images/profile_av.png"
                        alt="기본 프로필 이미지"
                        class="rounded-circle"
                      />
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="profile-details">
                      <div
                        class="media-body ms-md-5 m-0 mt-4 mt-md-0 text-md-start text-center"
                      >
                        <h5 class="font-weight-bold d-inline-block me-2">
                          {{ name }}님
                        </h5>
                        <br />
                        <a
                          class="text-decoration-none d-inline-block text-primary"
                        >
                          <strong>{{ this.followerCount }}</strong>
                          <span class="text-muted"> followers</span>
                        </a>
                        <br />
                        <a
                          class="text-decoration-none d-inline-block text-primary ms-3"
                        >
                          <strong>{{ this.followingCount }}</strong>
                          <span class="text-muted"> following</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <ul class="nav nav-tabs tab-card mt-3 border-bottom-0">
              <li class="nav-item">
                <router-link
                  to="/mypage/detail"
                  class="cursor-pointer nav-link active"
                  >프로필</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  to="/mypage/management"
                  class="cursor-pointer nav-link active"
                  >북마크 / 리뷰 관리</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  to="/mypage/friend"
                  class="cursor-pointer nav-link active"
                  >친구</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import http from "@/util/http.js";

export default {
  name: "MyAccount",
  data() {
    return {
      // 추후 스토어에서 받은 가입일 데이터로 수정할 것
      regdate: "2020-10-11",
      followers: 22,
      following: 999,
    };
  },
  computed: {
    ...mapState("userStore", ["name", "id", "followerCount", "followingCount"]),
    ...mapGetters("userStore", ["profileImgUrl"]),
  },
  methods: {
    ...mapMutations("userStore", ["SET_USER_LOGOUT", "SET_PROFILE_IMG"]),
    ...mapActions("userStore", ["getFriendCount"]),
    uploadProfileImg(e) {
      // single file img upload
      let attachFile = e.target.files[0];
      console.log(attachFile);
      console.log(1111);
      if (attachFile) {
        console.log(2222);
        console.log(attachFile, this.id);
        console.log(this.id);
        let formData = new FormData();
        formData.append("userProfileImage", attachFile);
        formData.append("userId", this.id);
        // alert('전송')
        http
          .post("/user/profileImg", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then(({ data }) => {
            // console.log(data);
            this.$swal("프로필 이미지 변경이 완료되었습니다.", {
              icon: "success",
            }).then((value) => {
              this.SET_PROFILE_IMG(`http://localhost:8080/api/v1${data}`);
              console.log(this.profileImgUrl);
            });
          })
          .catch((error) => this.$swal("에러발생"));
      }
    },
  },
  created() {
    this.getFriendCount(this.id);
  },
};
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
#proflieImg {
  width: 140px;
  height: 140px;
}
</style>
