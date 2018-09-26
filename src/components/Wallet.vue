<template>
  <div class="content">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-accent">
        <TopBar/>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar>
          <div class="center"><img class="logo" src="../assets/logo.png"></div>
        </md-toolbar>
        <Menu @changeMenu="menuChange" />
      </md-app-drawer>

      <md-app-content>
        <div class="column">
          <router-view/>
          <div class="pinbottom">
            <BottomBar/>
          </div>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TopBar from './wallet/TopBar';
import Menu from './wallet/Menu';

export default {
  name: 'Wallet',
  data() {
    return {
      currentComponent: 'Transfer',
    };
  },
  created() {
    if (this.identity === null) {
      this.$router.push('/');
    }
  },
  computed: {
    ...mapState([
      'identity',
    ]),
  },
  components: {
    TopBar,
    Menu,
  },
  methods: {
    menuChange(val) {
      this.currentComponent = val;
    },
  },
};
</script>

<style lang="scss" scoped>

  .column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: rgba(255, 255, 255, 0);
    width: 100%;
  }
  .content {
    width: 100%;
    display: flex;
    /*height: auto;*/
    /*min-height: 100vh;*/
    flex-direction: column;
    /*justify-content: flex-start;*/
    /*background-color: rgba(255, 255, 255, 0);*/
  }
  .md-tabs-navigation {
    padding-right: 10%;
    padding-left: 10%;
  }

  .md-app-content {
    padding: 0;
    display: flex;
  }

  .md-tabs {
    background-color: #18191d;
  }

  .md-tab {
    background-color: #18191d;
  }

  .md-tabs-container {
    background-color: #18191d;
  }
  .center {
    margin: 0 auto;
  }

  .md-drawer{
    width: 260px;
  }

  .md-app-content {
    padding-left: 4%;
    padding-right: 4%;
    background-color: #18191d !important;
  }

  .md-title {
    font-size: 18px;
    margin-left: -4px;
    color: #7ac231 !important;
  }
  .content-top {
    flex: 1;
    /*margin: auto;*/
  }
</style>
