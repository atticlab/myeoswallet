<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="text-center">
        World Map
        <br>
        <small>
          Looks great on any resolution. Made by our friends from
          <a target="_blank" href="http://jvectormap.com/">jVector Map</a>.
        </small>
      </h4>
      <card plain>
        <world-map></world-map>
      </card>
    </div>
  </div>
</template>
<script>
  import WorldMap from './WorldMap.vue'
  import { Card } from 'src/components/UIComponents';

  export default {
    components: {
      WorldMap,
      Card
    }
  }
</script>
<style>
  #worldMap {
    width: 100%;
    height: 500px;
  }
</style>
