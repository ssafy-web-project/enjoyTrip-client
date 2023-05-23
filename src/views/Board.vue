<template>
  <div>
    <BasicHeader name="공지사항" />
    <router-view></router-view>
  </div>
</template>

<script>
import BasicHeader from "@/layout/BasicHeader.vue";

export default {
  name: "theBoard",
  components: {
    BasicHeader,
  },
};
</script>
