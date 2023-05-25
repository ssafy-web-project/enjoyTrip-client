<template>
  <div>
    <!-- The video -->
    <div class="mainVideo">
      <video autoplay muted loop id="myVideo">
        <source src="@/assets/sea.mp4" type="video/mp4" />
      </video>
    </div>
    <!-- Optional: some overlay text to describe the video -->
    <div class="content">
      <h1>Let's Go on a Trip</h1>
      <p>관광지 검색, 경로 지정, 여행지 공유</p>
      <div class="row col-md-12 justify-content-center mb-2">
        <!-- <font-awesome-icon icon="fa-light fa-route" style="color: #fcfcfc" /> -->
        <div
          class="icon-main"
          @click="$router.push('/plan')"
          style="cursor: pointer">
          <div>
            <font-awesome-icon
              class="fontawesom"
              icon="fa-solid fa-location-dot fa-lg"
              size="xl" />
          </div>
          <p>경로 검색</p>
        </div>
        <div
          class="icon-main"
          @click="$router.push('/spot')"
          style="cursor: pointer">
          <div>
            <font-awesome-icon
              icon="fa-solid fa-magnifying-glass"
              style="color: #f5f5f5"
              size="xl" />
          </div>
          <p>관광지 검색</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.mainVideo {
  height: 100vh;
}
.icon-main:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
/* Style the video: 100% width and height to cover the entire window */
#myVideo {
  object-fit: fill;
  right: 0;
  width: 100%;
  height: 100vh;
  min-height: 300px;
}

.inline-flex {
  display: inline-flex;
}

/* Add some content at the bottom of the video/page */
.content {
  position: absolute;
  bottom: 30vh;
  background-color: rgba(0, 0, 0, 0.2);
  color: #f1f1f1;
  width: 100%;
  height: 200px;
  padding: 20px;
}

/* Style the button used to pause/play the video */
#myBtn {
  width: 200px;
  font-size: 18px;
  padding: 10px;
  border: none;
  background: #000;
  color: #fff;
  cursor: pointer;
}

#myBtn:hover {
  background: #ddd;
  color: black;
}

.icon-main {
  width: 100px;
  height: 80px;
  padding-top: 15px;
  margin-right: 10px;
  /* flex-direction: column; */
}
</style>
