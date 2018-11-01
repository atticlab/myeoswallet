<template>
  <navbar :show-navbar="showNavbar">
    <div class="navbar-wrapper">
      <div class="navbar-minimize">
        <button id="minimizeSidebar" class="btn btn-icon btn-round" @click="minimizeSidebar">
          <i class="nc-icon nc-minimal-right text-center visible-on-sidebar-mini"></i>
          <i class="nc-icon nc-minimal-left text-center visible-on-sidebar-regular"></i>
        </button>
      </div>
      <div class="navbar-toggle">
        <navbar-toggle-button @click.native="toggleSidebar">

        </navbar-toggle-button>
      </div>
      <router-link tag="a" class="navbar-brand" :to="{ name: 'Dashboard' }">My Eos Wallet</router-link>
    </div>
    <template slot="navbar-menu">
      <!--<form>-->
        <!--<div class="input-group no-border">-->
          <!--<input type="text" value="" class="form-control" placeholder="Search...">-->
          <!--<div class="input-group-append">-->
            <!--<div class="input-group-text">-->
              <!--<i class="nc-icon nc-zoom-split"></i>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</form>-->
      <ul class="navbar-nav">
        <!--<li class="nav-item">-->
          <!--<a class="nav-link btn-magnify" href="#pablo">-->
            <!--<i class="nc-icon nc-layout-11"></i>-->
            <!--<p>-->
              <!--<span class="d-lg-none d-md-block">Stats</span>-->
            <!--</p>-->
          <!--</a>-->
        <!--</li>-->
        <li class="nav-item nav-text">
          {{ getAccountNameWithAuthority }}
        </li>
        <el-tooltip content="Change node" placement="bottom">
          <drop-down icon="nc-icon nc-settings-gear-65" tag="li"
                     position="right"
                     direction="none"
                     class="nav-item btn-rotate dropdown">
            <a slot="title"
               slot-scope="{isOpen}"
               class="nav-link dropdown-toggle"
               data-toggle="dropdown"
               aria-haspopup="true"
               :aria-expanded="isOpen">
              <i class="nc-icon nc-settings-gear-65"></i>
              <p>
                <span class="d-lg-none d-md-block">Select node</span>
              </p>
            </a>
            <a :class="['dropdown-item', { active: currentNode === node }]" href="#" v-for="(node, i) in nodeList" :key="i" @click="changeNode(node)">{{ node }}</a>
          </drop-down>
        </el-tooltip>
        <!--<li class="nav-item">-->
          <!--<a class="nav-link btn-rotate" href="#">-->
            <!--<i class="nc-icon nc-settings-gear-65"></i>-->
            <!--<p>-->
              <!--<span class="d-lg-none d-md-block">Account</span>-->
            <!--</p>-->
          <!--</a>-->
        <!--</li>-->
      </ul>
    </template>
  </navbar>
</template>
<script>
import { Navbar, NavbarToggleButton } from 'src/components/UIComponents'
import { mapGetters, mapState, mapActions } from 'vuex';
import ActionType from 'src/store/constants';
import { Tooltip } from 'element-ui';

export default {
  components: {
    Navbar,
    NavbarToggleButton,
    [Tooltip.name]: Tooltip,
  },
  data() {
    return {
      activeNotifications: false,
      showNavbar: false,
    };
  },
  methods: {
    ...mapActions([
      ActionType.SET_NODE,
    ]),
    changeNode(val) {
      if (val) {
        this[ActionType.SET_NODE](val);
      }
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    minimizeSidebar() {
      this.$sidebar.toggleMinimize();
    },
    toggleNavbar() {
      this.showNavbar = !this.showNavbar;
    },
  },
  computed: {
    ...mapGetters([
      'getAccountNameWithAuthority',
    ]),
    ...mapState([
      'currentNode',
      'nodeList',
    ]),
  },
};
</script>
<style>
 li.nav-text, div.nav-text {
   margin: auto 0;
 }
</style>
