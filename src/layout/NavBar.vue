<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#" @click="toHome">EnjoyTrip</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click="toPlan">여행 경로</b-nav-item>
          <b-nav-item @click="toSpot">관광지 검색</b-nav-item>
          <b-nav-item @click="toPopular">인기 여행지</b-nav-item>
          <b-nav-item @click="toBoard">공지 사항</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>
          <!-- isAuth가 true일 때 드롭다운창, false 일때 로그인 회원가입 div! -->
          <b-nav-item-dropdown right v-show="isAuth">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-avatar></b-avatar>
            </template>
            <b-dropdown-item @click="onClickProfile">Profile</b-dropdown-item>
            <b-dropdown-item @click="onClickLogout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <div class="isNotAuth" v-show="!isAuth">
            <ul class="navbar-nav">
              <li class="ms-lg-2 ms-md-1 nav-item">
                <router-link class="nav-link" to="/user/login"
                  >로그인</router-link
                >
              </li>
              <li class="ms-lg-2 ms-md-1 nav-item">
                <router-link class="nav-link" to="/user/join"
                  >회원가입</router-link
                >
              </li>
            </ul>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "NavBar",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapState("userStore", ["isAuth"]),
  },
  methods: {
    ...mapActions("userStore", ["logout"]),
    onClickLogout() {
      this.logout();
      this.$router.push("/user/login");
    },
    onClickProfile() {
      if (this.$route.path !== "/mypage/detail") {
        this.$router.push("/mypage");
      }
    },
    toHome() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
    toBoard() {
      if (this.$route.path !== "/board/list") {
        this.$router.push("/board");
      }
    },
    toPlan() {
      if (this.$route.path !== "/plan") {
        this.$router.push("/plan");
      }
    },
    toSpot() {
      if (this.$route.path !== "/spot") {
        this.$router.push("/spot");
      }
    },
    toPopular() {
      if (this.$route.path !== "/popular") {
        this.$router.push("/popular");
      }
    },
  },
};
</script>

<style scoped></style>
