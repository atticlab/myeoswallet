<template>
  <div class="user">
    <div class="photo icon-wrap">
      <font-awesome-icon icon="sign-in-alt" class="icon" />
    </div>
    <div class="info">
      <a data-toggle="collapse" :aria-expanded="!isClosed" @click="toggleMenu" href="#">
         <span>
           <span v-if="getAccountName">{{ getAccountName }}</span><span v-else>Sign In</span>
           <b class="caret"></b>
        </span>
      </a>
      <div class="clearfix"></div>
      <div>
        <collapse-transition>
          <ul class="nav nav-menu" v-show="!isClosed">
            <li>
              <a href="#" @click="$emit('signInScatter')">
                <div class="photo">
                  <img src="/static/img/scatter.png"/>
                </div>
                <span class="sidebar-normal">Scatter</span>
              </a>
            </li>
            <li>
              <a href="#" @click="$emit('signInLedger')">
                <div class="photo">
                  <img src="/static/img/ledger.jpg"/>
                </div>
                <span class="sidebar-normal">Ledger Nano S</span>
              </a>
            </li>
            <li>
              <a href="#" @click="logout">
                <div class="photo icon-wrap">
                  <font-awesome-icon icon="sign-out-alt" class="icon" />
                </div>
                <span class="sidebar-normal">Sign out</span>
              </a>
            </li>
          </ul>
        </collapse-transition>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { CollapseTransition } from 'vue2-transitions'
import ActionType from 'src/store/constants';

export default {
  components: {
    CollapseTransition
  },
  data() {
    return {
      isClosed: true
    }
  },
  methods: {
    ...mapActions([
      ActionType.LOGOUT,
    ]),
    toggleMenu() {
      this.isClosed = !this.isClosed
    },
    logout() {
      this[ActionType.LOGOUT]()
    },
    signInScatter() {

    },
    signInLedger() {

    }
  },
  computed: {
    ...mapGetters([
      'getAccountNameWithAuthority',
      'getAccountName'
    ]),
  }
}
</script>
<style scoped>
  .nav.nav-menu {
    margin-top: 0;
  }
  span.sidebar-normal {
    display: inline-block !important;
    margin-left: 5px !important;
  }
  .photo {
    background-color: white;
    text-align: center;
  }
  .icon-wrap {
    line-height: 36px;
  }
  .icon {
    color: black !important;
    font-size: 1rem;
  }
</style>
