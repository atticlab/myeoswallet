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
        sdgsfg
      </md-app-drawer>

      <md-app-content>
        <md-tabs md-sync-route class="md-accent">
          <md-tab id="tab-dashboard" md-label="Dashboard" to="/wallet/dashboard">
            <router-view/>
          </md-tab>
          <md-tab id="tab-faq" md-label="FAQ" to="/wallet/faq">
            <router-view/>
          </md-tab>
        </md-tabs>
        <BottomBar/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Dashboard from './wallet/Dashboard';
import TopBar from './wallet/TopBar';

export default {
  name: 'Wallet',
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
  components: { TopBar, Dashboard },
};
</script>

<style lang="scss" scoped>
  .content {
    width: 100%;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    /*background-color: rgba(255, 255, 255, 0);*/
  }
  .md-tabs-navigation {
    padding-right: 10%;
    padding-left: 10%;
  }

  .md-app-content {
    padding: 0;
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
</style>
