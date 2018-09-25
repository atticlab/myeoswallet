<template>
  <md-toolbar class="md-dense md-accent" md-elevation="0">
    <span class="block">
      <md-button href="https://atticlab.net/" target="_blank" class="link">ATTIC.TECH</md-button>
      <md-button href="https://atticlab.net/" target="_blank" class="link">STEEMIT</md-button>
      <md-button href="https://atticlab.net/" target="_blank" class="link">FACEBOOK</md-button>
      <md-button href="https://atticlab.net/" target="_blank" class="link">REDDIT</md-button>
      <md-button href="https://atticlab.net/" target="_blank" class="link">TWITTER</md-button>
      <md-button href="https://atticlab.net/" target="_blank" class="link">YOUTUBE</md-button>
      <md-button href="https://atticlab.net/" target="_blank" class="link">TELEGRAM</md-button>
    </span>
    <span class="block">2018. Attic.tech. All Rights Reserved</span>
  </md-toolbar>
</template>

<script>

export default {
  name: 'BottomBar',
};
</script>

<style lang="scss" scoped>
  @import "../../src/assets/fonts/OpenSans-Regular.ttf";
    @font-face {
        font-family: 'Open Sans';
        src: url('../../src/assets/fonts/OpenSans-Regular.ttf');
    }
  .md-toolbar {
    font-family: 'Open Sans';
    margin-top: auto;
    border: 0;
    width: 100%;
    justify-content: space-between;
    /*background-color: rgba(255, 255, 255, 0);*/
    padding: 8px;
  }

  .link {
    font-family: 'Open Sans';
    text-transform: none;
    /*text-decoration: underline;*/
    cursor: pointer;
    color: #9ca4ab;
    border-bottom: 2px rgb(233, 236, 239);
  }
  .block {
    justify-content: space-between;
  }
</style>
