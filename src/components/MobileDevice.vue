<template>
<div id="main" class="md-layout">
  <md-card class="md-primary md-layout-item md-elevation-0" md-theme="green-card">
    <md-card-content>
    <md-card-header>
      <div class="md-subhead">Please follow and use our web version while mobile about to launch.
        Appreciate your choice, keeping you on the safe side</div>
    </md-card-header>

    <md-card-media>
      <div style="text-align: center">
      <img src="@/assets/phone.png" alt="phone">
      </div>
    </md-card-media>
    </md-card-content>
  </md-card>
</div>
</template>

<script>
export default {
  name: 'MobileDevice',
};
</script>

<style scoped>
  #main {
    margin-top: 50px;
    text-align: center;
  }
  img {
    width: 20vh;
  }
</style>
