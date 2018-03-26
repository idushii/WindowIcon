<template>
    <div class="row mt-5">
      <div class="col-md-8 mb-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Предпросмотр</h5>
            <window 
              :window=window 
              :propsSVG=propsSVG 
            />
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
        }
      }
    },
    computed: {
    },
    mounted() {},
    methods: {}
  }
</script>

<style lang="scss" scoped>


#app {
}

body,
html {
  min-height: 90vh;
  background: rgb(246, 249, 250);
}


</style>
