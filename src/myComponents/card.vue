<template>
  <div class="card">
    <div class="card-header" :class="{'text-center': isCenter}" v-if="hasHeader">
      <button v-if="isClose" @click="$emit('close')" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <slot name="header"></slot>
    </div>
    <div class="card-body" :class="{row: row}">
      <slot name="title">
        <h5 class="card-title" :class="{'text-center': isCenter, 'col-12': row}" v-if="title && !hasHeader">
          {{title}}
          <button v-if="isClose" @click="$emit('close')" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </h5>
      </slot>
      <slot></slot>
    </div>
    <div class="card-footer"  :class="{'text-center': isCenter}" v-if="hasFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'card',
    props: {
      title: {
        type: String,
        default: ''
      },
      center: {
        type: [String, Boolean],
        default: false
      },
      header: {
        type: [String, Boolean],
        default: false
      },
      footer: {
        type: [String, Boolean],
        default: false
      },
      row: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    computed: {
      isCenter() {
        if (this.center === '' || this.center == true) return true;
        return false;
      },
      hasHeader() {
        if (this.header === '' || this.header == true || this.$slots.header) return true;
        return false;
      },
      hasFooter() {
        if (this.footer === '' || this.footer == true || this.$slots.footer) return true;
        return false;
      },
      isClose() {
        return this.$listeners.hasOwnProperty('close')
      }
    },
    mounted() {
      
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>