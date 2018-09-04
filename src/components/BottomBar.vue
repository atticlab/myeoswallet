<template>
  <md-toolbar class="md-dense" md-elevation="0">
    <md-button href="https://atticlab.net/" target="_blank" class="link">Powered by Attic Lab
    </md-button>
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
    border: 2px rgb(233, 236, 239) solid;
    width: 100%;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0);
    padding: 8px;
  }

  .link {
    font-family: 'Open Sans';
    text-transform: none;
    text-decoration: underline;
    cursor: pointer;
    color: #9ca4ab;
    border-bottom: 2px rgb(233, 236, 239);
  }
</style>
