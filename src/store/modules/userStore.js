import Vue from "vue";
import router from "@/router";
import http from "@/util/http.js";
import jwtDecode from "jwt-decode";

const userStore = {
  namespaced: true,
  state: {
    token: "",
    isAuth: false,
    id: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    profileImgUrl: require("@/assets/profile.jpg"),
    regDt: "",
  },

  getters: {
    isAuth: function (state) {
      return state.isAuth;
    },
    profileImgUrl: function (state) {
      return state.profileImgUrl;
    },
  },

  mutations: {
    SET_USER(state, payload) {
      state.isAuth = true;
      state.id = payload.id;
      state.password = payload.password;
      state.name = payload.name;
      state.email = payload.email;
    },
    SET_USER_LOGOUT(state) {
      (state.token = ""), (state.isAuth = false);
      (state.id = ""),
        (state.password = ""),
        (state.name = ""),
        (state.email = "");
    },
    SET_USER_MODIFY(state, payload) {
      state.name = payload.name;
      state.email = payload.email;
      state.phone = payload.phone;
    },
    SET_PASSWORD(state, payload) {
      state.password = payload;
    },
    SET_PROFILE_IMG(state, payload) {
      state.profileImgUrl = payload;
    },
    SET_TOKEN(state, payload) {
      state.token = payload.token;
    },
  },

  actions: {
    Authentication(context, { userId, userPassword }) {
      http
        .post("/api/v1/auth/login", {
          userId,
          userPassword,
        })
        .then((res) => {
          context.commit("SET_TOKEN", res.data);
        });
    },
    login(context, { id, password }) {
      http
        .post("/auth/login", {
          id,
          password,
        })
        .then((res) => {
          let token = res.data.token;
          context.commit("SET_TOKEN", { token });

          const decodedToken = jwtDecode(token);

          http.get(`/users/${decodedToken.id}`).then(({ data }) => {
            console.log(data);
            context.commit("SET_USER", {
              id: data.id,
              password: data.password,
              name: data.name,
              email: data.email,
            });
          });
          router.push("/");
        })
        .catch(() => {
          console.log(id, password);
          console.log("1234");
          console.log(this.token);
        });
    },
    logout(context) {
      context.commit("SET_USER_LOGOUT");
    },
    modifyPassword({ commit }, { id, password }) {
      console.log(id, password);
      http
        .patch("/users/password", {
          id,
          password,
        })
        .then((response) => {
          commit("SET_PASSWORD", password);
          Vue.$swal("비밀번호 변경이 완료되었습니다.", {
            icon: "success",
          }).then(() => router.push("/mypage"));
        })
        .catch((error) => {
          console.log("modifyPasswordVue: error : ");
          console.log(error);
          Vue.$swal("서버에 문제가 발생하였습니다.", { icon: "error" });
        });
    },
  },
};

export default userStore;
