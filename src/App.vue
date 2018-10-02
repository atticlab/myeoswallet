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
  @import "../src/assets/fonts/Kanit/Kanit-Medium.ttf";
  @font-face {
    font-family: 'Kanit';
    src: url('../src/assets/fonts/Kanit/Kanit-Medium.ttf');
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .md-title {
    font-family: 'Kanit';
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
  .md-card.md-theme-default, html.md-theme-default, .md-drawer.md-theme-default, tr, .md-content.md-table.md-theme-default{
    background-color: #2a2b31 !important;
  }

  tr {
    border: 1px solid #424242;
  }

  #table {
    box-shadow: none;
  }

  button .md-button-content, a.md-button {
    color: white !important;
  }
  .md-dialog .md-dialog-actions button {
    margin: 0 auto;
  }
  .md-table-content {
    width: 99%;
    /*margin-left: 16px;*/
  }

  .md-field.md-theme-default:after {
    background-color: #717176;
  }

  #popup-transaction {
    display: block;
    overflow: auto;
    max-width: 600px;
  }

  #popup-transaction .md-dialog-container {
    width: 100% !important;
  }

  *::-webkit-scrollbar {
    width: 1em;
  }

 *::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3) !important;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #7ac231 !important;
  }
</style>
