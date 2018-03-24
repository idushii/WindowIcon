<template>
  <div id="app" class="container">
    <div class="row mt-5">
      <div class="col-md-8 mb-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Предпросмотр</h5>
            <svg :style="{ width: window.w, height: window.h }">
              <rect class="window" :width=window.w :height=window.h :style="{'stroke-width': propsSVG.line.width*2}" />
              <polygon v-if="window.type == 'active'" :points="pointsOpen" class="window-open-line" :style="{'stroke-width': propsSVG.line.width}" />
              <polygon v-if="window.type == 'active' && window.leaf" :points="pointsLeaf" class="window-open-line" :style="{'stroke-width': propsSVG.line.width}" />
            </svg>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <card title="Общие" row class="mb-2">
          <field group label="Ширина" v-model="window.w" :column="[4, 6]" number />
          <field group label="Высота" v-model="window.h" :column="[4, 6]" number />
          <field group label="Толщина линий" v-model="propsSVG.line.width" :column="[4, 12]" number />
        </card>
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
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      window: {
        w: 450,
        h: 200,
        type: 'active',
        open: 'right',
        leaf: true
      },
      propsSVG: {
        line: {
          width: 3
        }
      }
    };
  },
  computed: {
    pointsOpen() {
      let width = this.propsSVG.line.width;
      let k = 0.5
      let points = []
      if (this.window.open == 'left') {
        points.push(`${width*k} ${width*k}`)
        points.push( `${this.window.w} ${this.window.h / 2}` )
        points.push( `${width*k} ${this.window.h - width*k}` )
      }
      if (this.window.open == 'right') {
        points.push(`${this.window.w - width*k} ${width*k}`)
        points.push( `0 ${this.window.h / 2}` )
        points.push( `${this.window.w - width*k} ${this.window.h - width*k}` )
      }
      return points.join(', ')
    },
    pointsLeaf() { // Форточка
      let points = []

      points.push([0, this.window.h])
      points.push([this.window.w/2, 0])
      points.push([this.window.w, this.window.h])

      return points.map( p => `${p[0]} ${p[1]}` ).join(', ')
    }
  },
  async mounted() {},
  methods: {},
  components: {}
};
</script>

<style lang="scss">

$window-color: rgb(189, 247, 255);
$window-line-color: rgb(94, 133, 138);
$delay-anim: 0s;

#app {
}

body,
html {
  min-height: 90vh;
  background: rgb(246, 249, 250);
}

.window { fill: $window-color; stroke: $window-line-color; }
.window-open-line { 
  fill: transparent; 
  stroke: $window-line-color; 
  stroke-width: 1;
}

</style>
