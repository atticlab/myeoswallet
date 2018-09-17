<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ActionType from '@/store/constants';

export default {
  name: 'App',
  methods: {
    ...mapActions([
      ActionType.SET_TOKENLIST,
    ]),
    isMobileDevice() {
      return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
    },
    getTokenList() {
      this.$http.get('https://raw.githubusercontent.com/eoscafe/eos-airdrops/master/tokens.json')
        .then((res) => {
          this[ActionType.SET_TOKENLIST](res.body)
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    if (this.isMobileDevice()) {
      this.$router.push({
        name: 'MobileDevice',
      });
    } else {
      this.getTokenList();
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
  }
  body {
    background-color: rgb(245, 247, 251);
  }

</style>
