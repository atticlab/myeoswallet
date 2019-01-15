<template>
  <div class="card card-stats">
    <div class="card-body">
      <div class="row">
        <div class="col-12">
          <slot name="content">
            <div class="numbers">
              <p class="card-category">{{smallTitle}}</p>
              <p class="card-category">{{smallTitle2}}</p>
              <collapse>
                <collapse-item :title="title ? title.slice(0, 60) + '...' : ''">
                  <vue-markdown>{{title}}</vue-markdown>
                </collapse-item>
              </collapse>
            </div>
          </slot>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <hr/>
      <slot name="footer"></slot>
    </div>

  </div>
</template>
<script>
import Collapse from '../Collapse/Collapse'
import CollapseItem from '../Collapse/CollapseItem'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'stats-card',
  components: {
    CollapseItem,
    Collapse,
    VueMarkdown
  },
  props: {
    type: {
      type: String,
      description: 'Card text type (primary|info|danger|default|warning|success)'
    },
    title: {
      type: String,
      description: 'Card title'
    },
    smallTitle: {
      type: String,
      description: 'Card small title'
    },
    smallTitle2: {
      type: String,
      description: 'Card small title2'
    },
    icon: {
      type: String,
      description: 'Card icon'
    },
  },
};
</script>
<style scoped>
  .card-content{
    min-height: 85px;
  }
  .card-stats .card-body .numbers {
    text-align: left;
  }
</style>
