<template>
  <div class="content">
    <TopBar/>
    <md-tabs md-sync-route>
      <md-tab id="tab-dashboard" md-label="Dashboard" to="/wallet/dashboard">
        <router-view/>
      </md-tab>
      <md-tab id="tab-faq" md-label="FAQ" to="/wallet/faq">
        <router-view/>
      </md-tab>
    </md-tabs>
    <BottomBar/>
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
    background-color: rgba(255, 255, 255, 0);
  }
  .md-tabs-navigation {
    padding-right: 10%;
    padding-left: 10%;
  }
</style>
