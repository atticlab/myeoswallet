<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    isMobileDevice() {
      return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
    },
  },
  created() {
    if (this.isMobileDevice()) {
      this.$router.replace({
        name: 'MobileDevice',
      });
    }
  },
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
    background-color: #18191d !important;
    min-height: 100vh;
  }

  .md-app {
    min-height: 100vh;
  }
  body, .md-dialog.md-theme-default {
    background-color: #18191d !important;
  }
  .md-card.md-theme-default, html.md-theme-default, .md-drawer.md-theme-default, tr {
    background-color: #2a2b31 !important;
  }

  tr {
    border: 1px solid #424242;
  }

  #table {
    box-shadow: none;
  }

  button .md-button-content {
    color: white;
  }
  .md-dialog .md-dialog-actions button {
    margin: 0 auto;
  }
  .md-table-content {
    width: 99%;
    margin-left: 16px;
  }

</style>
