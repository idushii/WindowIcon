<template>
  <div id="app" class="container">
    <div class="row mt-5">
      <div class="col-md-8 mb-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Предпросмотр</h5>
            <svg :style="{ width: window.w, height: window.h }">
              <rect class="window-frame" :width=window.w :height=window.h />
              <rect class="window" :width=pointsGlass.glass.width :height=pointsGlass.glass.height :x=pointsGlass.glass.x :y=pointsGlass.glass.y />
              <polygon :style="{'stroke-width': propsSVG.line.width*1.5}" class="window-glass-border" :points=pointsGlass.border />
              <polyline :points="pointsFrame" class="window-open-line" :style="{'stroke-width': propsSVG.line.width}" />
              <polygon v-if="window.type == 'active'" :points="pointsOpen" class="window-open-line" :style="{'stroke-width': propsSVG.line.width}" />
              <polygon v-if="window.type == 'active' && window.leaf" :points="pointsLeaf" class="window-open-line" :style="{'stroke-width': propsSVG.line.width}" />
              <image id="pen" v-if="window.type == 'active'" xlink:href="./assets/pen.png" :x=positionPen.x :y=positionPen.y :width="propsSVG.frame.width*0.75+'px'"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="row">
          <div class="col-6 col-md-12">
            <card title="Общие" row class="mb-3">
              <field label="Ширина" v-model="window.w" :column="[12, 6]" number />
              <field label="Высота" v-model="window.h" :column="[12, 6]" number />
              <field label="Толщина линий" v-model="propsSVG.line.width" :column="[12]" number />
              <field label="Размер рамы" v-model="propsSVG.frame.width" :column="[12]" number />
              <field label="Размер фиксированной рамы" v-model="propsSVG.frame.widthStatic" :column="[12]" number />
            </card>
          </div>
          <div class="col-6 col-md-12">
            <card title="Открывание">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" name="type" id="select-type" v-model="window.type" true-value="active" false-value="static">
                <label class="form-check-label" for="select-type">
                  Открывается
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="type" value="left" id="select-left" v-model="window.open" :disabled="window.type=='static'">
                <label class="form-check-label" for="select-left">
                  Налево
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="type" value="right" id="select-right" v-model="window.open" :disabled="window.type=='static'">
                <label class="form-check-label" for="select-right">
                  направо
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" name="type" id="select-leaf" v-model="window.leaf" :disabled="window.type=='static'">
                <label class="form-check-label" for="select-leaf">
                  Форточка
                </label>
              </div>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
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
      }
    };
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
    }
  },
  async mounted() {},
  methods: {},
  components: {}
};
</script>

<style lang="scss">

$window-color: rgb(189, 247, 255);
$frame-color: rgb(224, 234, 238);
$window-line-color: rgb(94, 133, 138);
$delay-anim: 0s;

#app {
}

body,
html {
  min-height: 90vh;
  background: rgb(246, 249, 250);
}

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
