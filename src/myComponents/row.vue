<template>
  <div class="row" :class="[centers]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'row',
    props: {
      center: {
        type: [Boolean, Object, String], // Да/нет, с разметкой или же для всех
        default: false
      }
    },
    computed: {
      centers() {
        if (this.center === '') return 'justify-content-center'
        if (this.center == true) return 'justify-content-center'
        if (typeof(this.center) == 'object') {
          let r = ''
          if (this.center.sm) r += `justify-content-sm-center`
          if (this.center.md) r += `justify-content-md-center`
          if (this.center.lg) r += `justify-content-lg-center`
        }
      }
    },
    mounted() {},
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>