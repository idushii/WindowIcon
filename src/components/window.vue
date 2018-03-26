<template>
  <svg :style="{ width: window.w, height: window.h }">
    <rect class="window-frame" :width=window.w :height=window.h />
    <rect class="window" :width=pointsGlass.glass.width :height=pointsGlass.glass.height :x=pointsGlass.glass.x :y=pointsGlass.glass.y />
    <polygon :style="{'stroke-width': propsSVG.line.width*1.5}" class="window-glass-border" :points=pointsGlass.border />
    <polyline :points="pointsFrame" class="window-open-line" :style="{'stroke-width': propsSVG.line.width}" />
    <polygon v-if="window.type == 'active'" :points="pointsOpen" class="window-open-line" :style="{'stroke-width': propsSVG.line.width}" />
    <polygon v-if="window.type == 'active' && window.leaf" :points="pointsLeaf" class="window-open-line" :style="{'stroke-width': propsSVG.line.width}" />
    <image id="pen" v-if="window.type == 'active'" xlink:href="./../assets/pen.png" :x=positionPen.x :y=positionPen.y :width="propsSVG.frame.width*0.75+'px'"/>
  </svg>
</template>

<script>
  export default {
    name: 'window',
    props: {
      window: {
        type: Object,
        default: () => ({ w: 100, h: 100, type: 'static', leaf: false })
      },
      propsSVG: {},
      pointsGlass: {},
      pointsOpen: {},
      pointsLeaf: {},
      pointsFrame: {},
      positionPen: {},
    },
    data() {
      return {}
    },
    computed: {},
    mounted() {},
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang=scss>
$window-color: rgb(189, 247, 255);
$frame-color: rgb(224, 234, 238);
$window-line-color: rgb(94, 133, 138);

.window { fill: $window-color; }
.window-open-line { 
  fill: transparent; 
  stroke: $window-line-color; 
  stroke-width: 1;
}

.window-glass-border {
  fill: transparent; 
  stroke: $window-line-color; 
  stroke-width: 1;
}

.window-frame {
  fill: $frame-color;
}

</style>