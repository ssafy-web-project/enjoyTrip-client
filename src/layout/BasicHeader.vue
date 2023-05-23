<template>
  <!-- block Header -->
  <div class="block-header py-4 py-lg-5">
    <div class="container">
      <div class="row mb-4">
        <div class="col">
          <ul class="breadcrumb bg-transparent mb-0">
            <li class="breadcrumb-item">
              <router-link to="/" class="text-decoration-none"
                >Home</router-link
              >
            </li>
            <li class="breadcrumb-item active">{{ name }}</li>
          </ul>
        </div>
      </div>
      <!-- .row end-->
    </div>
  </div>
</template>
<script>
export default {
  name: "BasicHeader",
  props: ["name"],
};
</script>

<style></style>
