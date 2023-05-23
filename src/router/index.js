import Vue, { onMounted } from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Main.vue"),
  },
  {
    path: "/mypage",
    name: "mypage",
    component: () => import("@/views/MyPage.vue"),
    redirect: "/mypage/detail",
    children: [
      {
        path: "detail",
        name: "Login",
        component: () => import("@/components/mypage/Detail.vue"),
      },
      {
        path: "friend",
        name: "Friend",
        component: () => import("@/components/mypage/Friend.vue"),
      },
      {
        path: "modifyInfo",
        name: "ModifyInfo",
        component: () => import("@/components/mypage/ModifyInfo.vue"),
      },
      {
        path: "changePw",
        name: "ModifyPassword",
        component: () => import("@/components/mypage/ModifyPassword.vue"),
      },
    ],
  },
  {
    path: "/user",
    name: "User",
    component: () => import("@/views/User.vue"),
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("@/components/user/Login.vue"),
      },
      {
        path: "join",
        name: "Join",
        component: () => import("@/components/user/Join.vue"),
      },
    ],
  },
  {
    path: "/board",
    name: "board",
    component: () => import("@/views/Board.vue"),
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "BoardList",
        component: () => import("@/components/board/BoardList.vue"),
      },
      {
        path: "detail",
        name: "BoardDetail",
        component: () => import("@/components/board/BoardDetail.vue"),
      },
      {
        path: "insert",
        name: "BoardInsert",
        component: () => import("@/components/board/BoardInsert.vue"),
      },
      {
        path: "modify",
        name: "BoardModify",
        component: () => import("@/components/board/BoardModify.vue"),
      },
    ],
  },
  {
    path: "/plan",
    name: "plan",
    component: () => import("@/views/PlanView"),
  },
  {
    path: "/planDetail",
    name: "planDetail",
    component: () => import("@/views/PlanDetailView"),
  },
  {
    path: "/spot",
    name: "spot",
    component: () => import("@/views/SpotView"),
  },
  {
    path: "/spotDetail",
    name: "spotDetail",
    component: () => import("@/views/SpotDetailView"),
  },
  {
    path: "/popular",
    name: "popular",
    component: () => import("@/views/PopularPlaceView"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
