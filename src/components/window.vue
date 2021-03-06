<template>
  <svg :viewBox="`0 0 ${window.w*scale} ${window.h*scale}`" @click="onclick" :id="id" :style="{width: window.w*scale, height: window.h*scale}">
    <rect class="window-frame" :style="{fill: style.frame_color}" :width=window.w :height=window.h />
    <rect 
      class="window"  :style="{fill: style.window_color}"
      :width=pointsGlass.glass.width :height=pointsGlass.glass.height 
      :x=pointsGlass.glass.x :y=pointsGlass.glass.y 
    />
    <polygon 
      :style="{'stroke-width': propsSVG.line.width*1.5}" style="fill: transparent;"
      class="window-glass-border" 
      :points=pointsGlass.border 
    />
    <polyline 
      :points="pointsFrame" 
      class="window-open-line" 
      :style="{'stroke-width': propsSVG.line.width, stroke: style.window_line_color}" style="fill: transparent;"
    />
    <polygon 
      v-if="window.type == 'active'" 
      :points="pointsOpen" class="window-open-line" 
      :style="{'stroke-width': propsSVG.line.width, stroke: style.window_line_color}" style="fill: transparent;"
    />
    <polygon 
      v-if="window.type == 'active' && window.leaf" 
      :points="pointsLeaf" class="window-open-line" 
      :style="{'stroke-width': propsSVG.line.width, stroke: style.window_line_color}" style="fill: transparent;"
    />
    <image id="pen" v-if="window.type == 'active'" xlink:href="./pen.png" :x=positionPen.x :y=positionPen.y :width="propsSVG.frame.width*0.75+'px'"/>
  </svg>
</template>

<script>
//:style="{ width: window.w, height: window.h }"
  export default {
    name: 'window',
    props: {
      window: {
        type: Object,
        default: () => ({ w: 400, h: 400, type: 'static', leaf: false })
      },
      propsSVG: {},
      scale: { type: Number, default: 1 },
      id: { type: String, default: 'window_svg' }
    },
    data() {
      return {
        style: {
          window_color: 'rgb(189, 247, 255)',
          frame_color: 'rgb(224, 234, 238)',
          window_line_color: 'rgb(94, 133, 138)',
        }
      }
    },
    computed: {
      pointsGlass() {
        let frame = this.window.type == 'active' ? this.propsSVG.frame.width : this.propsSVG.frame.widthStatic
        let glass = { x: frame, y: frame, width: this.window.w - frame*2, height: this.window.h - frame*2 }

        let points = []

        points.push([ frame, frame ])
        points.push([ this.window.w - frame, frame ])
        points.push([ this.window.w - frame, this.window.h - frame ])
        points.push([ frame, this.window.h - frame ])

        return { glass, border: points.map( p => `${p[0]} ${p[1]}` ).join(', ') }
      },
      pointsOpen() {
        let width = this.propsSVG.line.width;
        let frame = this.propsSVG.frame.width*1;
        let k = 0.5
        let points = []
        if (this.window.open == 'left') {
          points.push([frame + width/2, frame + width/2])
          points.push([this.window.w - frame, this.window.h / 2])
          points.push([frame + width/2, this.window.h - width/2 - frame])
        }
        if (this.window.open == 'right') {
          points.push([this.window.w - width*k - frame, width*k + frame])
          points.push([frame, this.window.h / 2])
          points.push([this.window.w - width*k - frame, this.window.h - width*k - frame])
        }

        return points.map( p => `${p[0]} ${p[1]}` ).join(', ')
      },
      pointsLeaf() { // Форточка
        let points = []
        let frame = this.propsSVG.frame.width;

        points.push([frame, this.window.h-frame])
        points.push([this.window.w/2, frame])
        points.push([this.window.w - frame, this.window.h - frame])

        return points.map( p => `${p[0]} ${p[1]}` ).join(', ')
      },
      pointsFrame() {
        let points = [];
        let frame = this.window.type == 'active' ? this.propsSVG.frame.width : this.propsSVG.frame.widthStatic
        let width = this.propsSVG.line.width
        let {w, h} = {...this.window}

        points.push([width/2, width/2])
        points.push([frame, frame])
        points.push([frame, h - frame])
        points.push([width/2, h])
        points.push([width/2, width/2])

        points.push([width/2, width/2])
        points.push([frame, frame])
        points.push([w - frame, frame])
        points.push([w, width/2])
        points.push([width/2, width/2])

        points.push([w, width/2])
        points.push([w - frame, frame])
        points.push([w - frame, h - frame])
        points.push([w, h])
        points.push([w - width/2, width/2])

        points.push([w, h])
        points.push([width/2, h - width/2])
        points.push([frame, h - frame])
        points.push([w-frame, h - frame])
        
        return points.map( p => `${p[0]} ${p[1]}` ).join(', ')
      },
      positionPen() {
        let frame = this.propsSVG.frame.width
        let {w, h} = {...this.window}
        console.log(window.pen)
        return { x: this.window.open == 'left' ?  w - frame * 0.85 : frame*0.15, y: (h/2) - (frame * 3 / 2) }
      },
      export() {
        this.$emit('export', window.window_svg.outerHTML)
        return window.window_svg.outerHTML
      }
    },
    mounted() {},
    methods: {
      onclick(clickPos) {
        let svg = clickPos.path.filter( item => item.nodeName == 'svg' ).pop();
        let {clientHeight, clientWidth} = svg
        let x = clickPos.layerX, y = clickPos.layerY
        let baseX = clientWidth / 3
        let baseY = clientHeight / 3
        let isLeft = x < baseX
        let isTop = y < baseY
        let isRight = (clientWidth - x) < baseX
        let isBottom = (clientHeight - y) < baseY
        let isCenter = !isLeft && !isRight && !isTop && !isBottom
        let result = {isLeft, isRight, isTop, isBottom, isCenter}
        this.$emit('click-svg', {isLeft, isRight, isTop, isBottom, isCenter})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang=scss scoped>
$window-color: rgb(189, 247, 255);
$frame-color: rgb(224, 234, 238);
$window-line-color: rgb(94, 133, 138);

/*svg { width: 100%; height: 100%; }/**/

</style>