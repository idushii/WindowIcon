<template>
  <div id="app" class="container">
    <div class="row mt-5">
      <div class="col-8">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Предпросмотр</h5>
            <div class="window-border">
            <template v-for="(item, index) in window">
              <div 
                :key="`window-${index}`" 
                class="window" :class="{active: item.type == 'active', static: item.type == 'static'}"
                :style="{height: item.h + 'px', width: item.w + 'px'}"
              >
                <div class="open-left" :style="windowActivesStyle[index].styles">
                  <div class="open-left-container" :style="windowActivesStyle[index].styles_inner"></div>
                </div>
              </div>
            </template>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card mb-2" v-for="(item, index) in window" :key="`window-${index}`">
          <div class="card-body">
            <h5 class="card-title">Окно # {{index+1}}</h5>
            <div class="form-group">
              <label>Ширина</label>
              <input type="text" class="form-control" v-model="window[index].w">
            </div>
            <div class="form-group">
              <label>Высота</label>
              <input type="text" class="form-control" v-model="window[index].h">
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="type" value="left" id="select-left" v-model="window[index].open">
              <label class="form-check-label" for="select-left">
                Налево
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="type" value="right" id="select-right" v-model="window[index].open">
              <label class="form-check-label" for="select-right">
                направо
              </label>
            </div>
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
      window: [
        {
          w: 500,
          h: 500,
          type: 'static',
          open: 'left'
        },
        /*{
          w: 100,
          h: 100,
          type: 'active',
          open: 'left',
        },//*/
      ],
    };
  },
  computed: {
    windowActivesStyle() {
      let result = []

      for(let item of this.window) {
        let styles = {}
        let styles_inner = {}

        let border = 4;

        if (item.type == 'static') {
          styles['border-top-width'] = item.h / 2 + 'px'
          styles['border-bottom-width'] = item.h / 2 + 'px'

            styles_inner['margin-top'] = - item.h / 2 + border + 'px'
            styles_inner['border-top-width'] = item.h / 2 - border + 'px'
            styles_inner['border-bottom-width'] = item.h / 2 - border + 'px'

          if (item.open == 'left') {
            styles['border-right-width'] = item.w + 'px'
            styles['border-left-width'] = '0px'

            styles_inner['margin-left'] = border * 0.8 + 'px'
            styles_inner['border-right-width'] = item.w - border * 1.5 + 'px'
            styles_inner['border-left-width'] = '0px'
          }
          if (item.open == 'right') {
            styles['border-right-width'] = '0px'
            styles['border-left-width'] = item.w + 'px'

            styles_inner['margin-left'] = - item.w + border * 0.5 + 'px'
            styles_inner['border-right-width'] = '0px'
            styles_inner['border-left-width'] = item.w - border * 1.5 + 'px'
          }
        }

        result.push({styles, styles_inner})
      }

      return result;
    }
  },
  async mounted() {},
  methods: {},
  components: {}
};
</script>

<style lang="scss">

$window-color: rgb(189, 247, 255);
$delay-anim: 0s;

#app {
}

body,
html {
  min-height: 90vh;
  background: rgb(246, 249, 250);
}

.window-border {
  border: 10px solid rgb(223, 236, 238);
  display: inline-grid;
}

.window {
  background: $window-color;
  display: inline-block;
  margin: 2px;
  transition: all $delay-anim;
}

.static {
  .open-left {
    transition: all $delay-anim;
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-right: 100px solid rgb(70, 110, 116);
    border-left: 100px solid rgb(70, 110, 116);
    border-bottom: 50px solid transparent;
  }

  .open-left-container {
    transition: all $delay-anim;
    width: 0;
    height: 0;
    margin-top: -48px;
    margin-left: 2px;
    border-top: 48px solid transparent;
    border-right: 96px solid $window-color;
    border-left: 96px solid $window-color;
    border-bottom: 48px solid transparent;
  }

}

.active {
  border: 10px solid rgb(237, 241, 243);

  .open-left {
    transition: all $delay-anim;
    width: 0;
    height: 0;
    margin-top: -10px;
    margin-left: -10px;
    border-top: 50px solid transparent;
    border-right: 100px solid rgb(70, 110, 116);
    border-bottom: 50px solid transparent;
  }

  .open-left-container {
    transition: all $delay-anim;
    width: 0;
    height: 0;
    margin-top: -48px;
    margin-left: 2px;
    border-top: 48px solid transparent;
    border-right: 96px solid $window-color;
    border-bottom: 48px solid transparent;
  }
}


</style>
