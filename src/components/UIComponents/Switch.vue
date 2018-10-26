<template>
  <div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate" :class="switchClass">
    <div class="bootstrap-switch-container" @click="triggerToggle()">
      <span class="bootstrap-switch-handle-on " :class="`bootstrap-switch-${type}`">
        <slot name="on">
            {{onText}}
        </slot>
      </span>
      <span class="bootstrap-switch-label"></span>
      <span class="bootstrap-switch-handle-off" :class="`bootstrap-switch-${type}`">
        <slot name="off">
            {{offText}}
        </slot>
      </span>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'p-switch',
    props: {
      value: {
        type: [Array, Boolean],
        description: 'Switch value'
      },
      disabled: {
        type: [Boolean, String],
        description: 'Whether switch is disabled'
      },
      onText: {
        type: String,
        description: 'switch on text'
      },
      offText: {
        type: String,
        description: 'switch off text'
      },
      type: {
        type: String,
        description: 'Switch type (primary|info|danger|default|warning|success)',
        default: 'default'
      }
    },
    computed: {
      switchClass () {
        let base = 'bootstrap-switch-'
        let state = this.model ? 'on' : 'off'
        return base + state
      },
      model: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        }
      }
    },
    methods: {
      triggerToggle () {
        this.model = !this.model
      }
    }
  }
</script>
<style>
</style>
