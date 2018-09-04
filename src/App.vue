<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
  @import "../src/assets/fonts/OpenSans-Regular.ttf";
    @font-face {
        font-family: 'Open Sans';
        src: url('../src/assets/fonts/OpenSans-Regular.ttf');
    }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Open Sans';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    justify-content: center;
    background-color: rgb(245, 247, 251);
  }

</style>
