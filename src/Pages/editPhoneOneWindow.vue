<template>
<div>
  <div class="card" id="container-window" v-if="!props">
    <window 
      :window=window 
      :propsSVG=propsSVG 
      @click-svg="clickSvg"
      @export="svg => this.exportSVG = svg"
      />
    <div class="card-body">
      <field button value="Настройки" right @click="props = true" />
    </div>
  </div>
  <card v-if="props" id="container-window" title="Настройки" @close="props = false">
    <field label="Ширина" v-model="window.w" number />
    <field label="Высота" v-model="window.h" number />
    <field label="Толщина линий" v-model="propsSVG.line.width" number />
    <field label="Размер рамы" v-model="propsSVG.frame.width" number />
    <field label="Размер фиксированной рамы" v-model="propsSVG.frame.widthStatic" number />
    <field label="Экспорт" :value="exportSVG" textarea />
  </card>
</div>
</template>

<script>
import mixinWindow from './../mixinWindow'
  export default {
    mixins: [mixinWindow],
    name: 'editOneWindow',
    data() {
      return {
        window: {
          w: 450,
          h: 500,
          type: 'static',
          open: 'left',
          leaf: false
        },
        propsSVG: {
          line: {
            width: 3
          },
          frame: {
            width: 30,
            widthStatic: 15
          }
        },
        props: false,
        exportSVG: ""
      }
    },
    computed: {
    },
    mounted() {},
    methods: {
      clickSvg({isLeft, isRight, isTop, isBottom, isCenter}) {
        if (isLeft) this.window.open = 'right'
        if (isRight) this.window.open = 'left'
        if (isCenter) this.window.type = (this.window.type == 'static' ? 'active' : 'static' )
        if (isTop) this.window.leaf = (this.window.leaf ? false : true )
      }
    }
  }
</script>

<style lang="scss" scoped>

#container-window { height: calc(100vh - 4rem); width: 100%; margin-top: 2rem; margin-bottom: 2rem; }

</style>
