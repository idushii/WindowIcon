<template>
  <div class="row" :class="[centers]">
    <div v-for="(c, index) in col*1" :key="`column-${index}`" :class="[sizeColSM[index], sizeColMD[index], sizeColLG[index]]">
      <slot :name="`col-${index+1}`"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'grid',
    props: {
      col: { type: [Number, String], default: 1 },
      sm: { type: String, default: '' },
      md: { type: String, default: '' },
      lg: { type: String, default: '' },
      center: {
        type: [Boolean, Object, String], // Да/нет, с разметкой или же для всех
        default: false
      },
    },
    data() {
      return {}
    },
    computed: {
      sizeColSM() {
        let result = []
        // Если указан один размер на несколько колонок, то его продублировать
        if (this.col > 1 && this.sm.split(' ').length == 1) 
          for(let index = 0; index < this.col; index++) result.push( `col-sm-${this.sm}` );
        else
          for(let index = 0; index < this.col; index++) result.push( this.getSizeCol('sm', index) );

        return result
      },
      sizeColMD() {
        if (this.md == '') return ''
        let result = []
        // Если указан один размер на несколько колонок, то его продублировать
        if (this.col > 1 && this.md.split(' ').length == 1) 
          for(let index = 0; index < this.col; index++) result.push( `col-md-${this.md}` );
        else
          for(let index = 0; index < this.col; index++) result.push( this.getSizeCol('md', index) );
        return result
      },
      sizeColLG() {
        if (this.lg == '') return ''
        let result = []
        // Если указан один размер на несколько колонок, то его продублировать
        if (this.col > 1 && this.lg.split(' ').length == 1) 
          for(let index = 0; index < this.col; index++) result.push( `col-lg-${this.lg}` );
        else
          for(let index = 0; index < this.col; index++) result.push( this.getSizeCol('lg', index) );
        return result
      },
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
    methods: {
      getSizeCol(size = 'sm', index) {
        let sizesCollumn = this[size].split(' ')
        if (index > sizesCollumn.length - 1) return `col-${size}`
        return `col-${size}-${sizesCollumn[index]}`
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>