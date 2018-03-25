<template>
  <div :class="[sizes, offsets, `${isLeft ? 'text-left': ''}`, `${isCenter ? 'text-center': ''}`, `${isRight ? 'text-right': ''}`]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'column',
    props: {
      sm: { type: [String, Boolean], default: '12' },
      md: { type: [String, Boolean], default: false },
      lg: { type: [String, Boolean], default: false },
      offset: {
        type: Object,
        default: function() { return { sm: 0, md: 0, lg: 0 } }
      },
      left: { type: [String, Boolean], default: false },
      center: { type: [String, Boolean], default: false },
      right: { type: [String, Boolean], default: false },
    },
    data() {
      return {}
    },
    computed: {
      sizes() {
        let sm = this.sm ? `col-${this.sm} ` : ''
        let md = this.md ? `col-md-${this.md} ` : ''
        let lg = this.lg ? `col-lg-${this.lg} ` : ''
        return `${sm}${md}${lg}`
      },
      offsets() {
        let sm = this.offset.sm ? `offset-sm-${this.offset.sm} ` : ''
        let md = this.offset.md ? `offset-md-${this.offset.md} ` : ''
        let lg = this.offset.lg ? `offset-lg-${this.offset.lg} ` : ''
        return `${sm}${md}${lg}`
      },
      isLeft() {
        if (this.left == true || this.left === '') return true;
        return false;
      },
      isCenter() {
        if (this.center == true || this.center === '') return true;
        return false;
      },
      isRight() {
        if (this.right == true || this.right === '') return true;
        return false;
      },
    },
    mounted() {},
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>