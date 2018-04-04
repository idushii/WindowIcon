<template>
  <svg 
    :viewBox="`0 0 ${windowSize.w} ${windowSize.h}`" 
    @click="onclick" @click.right="rightClick"
    :style="{width: windowSize.w*scale, height: windowSize.h*scale}" :id="id" 
  >
    <rect class="window-frame" :style="{fill: style.frame_color}" :width=windowSize.w :height=windowSize.h />
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
//:style="{ width: windowSize.w, height: windowSize.h }"
  export default {
    name: 'windowEvents',
    props: {
      window: {
        type: Object,
        default: () => ({ w: 400, h: 400, type: 'static', leaf: false })
      },
      propsSVG: {},
      scale: { type: Number, default: 1 },
      id: { type: String, default: 'window_svg' },
      isEdit: { type: Boolean, default: false }
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
      windowSize() {
        let w = this.window.w > 0 ? this.window.w : 0
        let h = this.window.h > 0 ? this.window.h : 0
        return { w, h }
      },
      pointsGlass() {
        let frame = this.window.type == 'active' ? this.propsSVG.frame.width : this.propsSVG.frame.widthStatic
        let glass = { x: frame, y: frame, width: this.windowSize.w - frame*2, height: this.windowSize.h - frame*2 }

        let points = []

        points.push([ frame, frame ])
        points.push([ this.windowSize.w - frame, frame ])
        points.push([ this.windowSize.w - frame, this.windowSize.h - frame ])
        points.push([ frame, this.windowSize.h - frame ])

        return { glass, border: points.map( p => `${p[0]} ${p[1]}` ).join(', ') }
      },
      pointsOpen() {
        let width = this.propsSVG.line.width;
        let frame = this.propsSVG.frame.width*1;
        let k = 0.5
        let points = []
        if (this.window.open == 'left') {
          points.push([frame + width/2, frame + width/2])
          points.push([this.windowSize.w - frame, this.windowSize.h / 2])
          points.push([frame + width/2, this.windowSize.h - width/2 - frame])
        }
        if (this.window.open == 'right') {
          points.push([this.windowSize.w - width*k - frame, width*k + frame])
          points.push([frame, this.windowSize.h / 2])
          points.push([this.windowSize.w - width*k - frame, this.windowSize.h - width*k - frame])
        }

        return points.map( p => `${p[0]} ${p[1]}` ).join(', ')
      },
      pointsLeaf() { // Форточка
        let points = []
        let frame = this.propsSVG.frame.width;

        points.push([frame, this.windowSize.h-frame])
        points.push([this.windowSize.w/2, frame])
        points.push([this.windowSize.w - frame, this.windowSize.h - frame])

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
        //console.log(window.pen)
        return { x: this.window.open == 'left' ?  w - frame * 0.85 : frame*0.15, y: (h/2) - (frame * 3 / 2) }
      },
      position() {
        let {x, y, width, height} = window[this.id].parentNode.getBoundingClientRect()
        //console.log({x, y, width, height});
        return {x, y, width, height}
      },
    },
    mounted() {},
    methods: {
      onclick(clickPos) {
        if (!this.isEdit) return;
        let svg = clickPos.path.filter( item => item.nodeName == 'svg' ).pop();
        let {clientHeight, clientWidth} = window[this.id].parentNode
        let offsetTop = window[this.id].parentNode.getBoundingClientRect().top
        let offsetLetf = window[this.id].parentNode.getBoundingClientRect().left
        let x = clickPos.x - offsetLetf, y = clickPos.y - offsetTop
        //console.log({clientHeight, clientWidth, x, y, offsetLeft, offsetTop});
        let baseX = clientWidth / 3
        let baseY = clientHeight / 3
        let isLeft = x < baseX
        let isTop = y < baseY
        let isRight = (clientWidth - x) < baseX
        let isBottom = (clientHeight - y) < baseY
        let isCenter = !isLeft && !isRight && !isTop && !isBottom
        let result = {isLeft, isRight, isTop, isBottom, isCenter}
        this.$emit('click-svg', {isLeft, isRight, isTop, isBottom, isCenter})
        this.clickSvg({isLeft, isRight, isTop, isBottom, isCenter})
      },
      clickSvg({isLeft, isRight, isTop, isBottom, isCenter}) {
        //console.log({isLeft, isRight, isTop, isBottom, isCenter});
        if (isLeft) this.window.open = 'right'
        if (isRight) this.window.open = 'left'
        if (isCenter) this.window.type = (this.window.type == 'static' ? 'active' : 'static' )
        if (isTop) this.window.leaf = (this.window.leaf ? false : true )
        //console.log({...this.window});
      },
      rightClick(e) {
        if (!this.isEdit) return;
        this.$emit('click-right', this.id)
        e.preventDefault();
      },
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