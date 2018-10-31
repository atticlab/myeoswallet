<template>
  <div class="sidebar"
       :data-color="backgroundColor"
       :data-active-color="activeColor">
    <div class="logo">
      <router-link tag="a" class="simple-text logo-mini"
                   :to="{ name: 'Dashboard' }">
          <!--<div class="logo-img" >-->
            <!--<font-awesome-icon icon="wallet" style="color: black"/>-->
            <img src="/static/img/logo/atticlab-logo-500_white.png" alt="logo atticlab">
          <!--</div>-->
      </router-link>
      <router-link tag="a" class="simple-text logo-normal"
                   :to="{ name: 'Dashboard' }">
          {{ title }}
      </router-link>
    </div>
    <div class="sidebar-wrapper" ref="sidebarScrollArea">
      <slot>

      </slot>
      <ul class="nav">
        <slot name="links">
          <sidebar-item v-for="(link, index) in sidebarLinks"
                        :key="link.name + index"
                        :link="link">

            <sidebar-item v-for="(subLink, index) in link.children"
                          :key="subLink.name + index"
                          :link="subLink">
            </sidebar-item>
          </sidebar-item>
        </slot>

      </ul>
    </div>
  </div>
</template>
<script>
import 'perfect-scrollbar/dist/css/perfect-scrollbar.css'
export default {
  props: {
    title: {
      type: String,
      default: 'My Eos Wallet',
      description: 'Wallet for Eos'
    },
    backgroundColor: {
      type: String,
      default: 'black',
      validator: (value) => {
        const acceptedValues = ['white', 'brown', 'black']
        return acceptedValues.indexOf(value) !== -1
      },
      description: 'Sidebar background color (white|brown|black)'
    },
    activeColor: {
      type: String,
      default: 'success',
      validator: (value) => {
        const acceptedValues = ['primary', 'info', 'success', 'warning', 'danger']
        return acceptedValues.indexOf(value) !== -1
      },
      description: 'Sidebar active text color (primary|info|success|warning|danger)'
    },
    logo: {
      type: String,
      default: 'static/img/vue-logo.png',
      description: 'Sidebar Logo'
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
      description: 'Sidebar links. Can be also provided as children components (sidebar-item)'
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      autoClose: this.autoClose
    }
  },
  methods: {
    async initScrollBarAsync () {
      const PerfectScroll = await import('perfect-scrollbar')
      PerfectScroll.initialize(this.$refs.sidebarScrollArea, {suppressScrollX: true})
    }
  },
  mounted () {
    this.initScrollBarAsync()
  },
  beforeDestroy () {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false
    }
  }
}
</script>
<style>
  @media (min-width: 992px) {
    .navbar-search-form-mobile,
    .nav-mobile-menu{
      display: none;
    }
  }
</style>
