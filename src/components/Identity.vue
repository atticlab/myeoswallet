<template>
  <md-card>
    <md-card-content>
      <div><img class="logo" src="./../assets/eos_logo.png"></div>
    </md-card-content>

    <md-card-header class="md-headline">IDENTITY</md-card-header>

    <md-card-actions>
      <md-button to="/" class="md-raised md-primary">Cancel</md-button>
      <md-button to="/wallet" class="md-raised md-primary">Done</md-button>
    </md-card-actions>

    <bottom-bar/>
  </md-card>
</template>

<script>
export default {
  name: 'Identity',
};
</script>

<style scoped>
  .logo {
    max-height: 60px;
  }
</style>
