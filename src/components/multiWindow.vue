<template>
  <div :id="`multi_window-${key}`" class="multi_window">
    <template v-for="(window, index) in windows">
      <div class="window-col" v-if="window.type" :key="`window-${index}`" :class="{'width-100': window.width == 100}">
        <windowEvents 
          :window=window 
          :propsSVG=propsSVG 
          :scale=scale 
          :id="`window-${index}-${key}`"
          ref="window" 
          :isEdit=isEdit 
          @click-right="toggleProps"
          @click-svg="$emit('update-icon')"
        />
      </div>
      <div v-else :key="`window-${index}`" class="window-row">
        <div class="window-col" v-for="(windowRow, indexRow) in window" :key="`window-${index}-${indexRow}`" :class="{'width-100': windowRow.width == 100}">
          <windowEvents 
            :window=windowRow 
            :propsSVG=propsSVG 
            :scale=scale 
            :id="`window-${index}-${indexRow}`" 
            ref="window" 
            :isEdit=isEdit 
            @click-right="toggleProps"
            @click-svg="$emit('update-icon')"
          />
        </div>
      </div>
    </template>
    <div :style="{top: propsEnter.position.top+'px', left: propsEnter.position.left+'px', width: propsEnter.position.width+'px', height: propsEnter.position.height+'px'}" class="props-enter"  v-if="isEdit && propsEnter.show">
      <card title="Свойства" @close="toggleProps(false)">
        <field sm label="Ширина" :value="selectWindow.w" @change="value => selectWindow.w = value*1" number />
        <field sm label="Высота" :value="selectWindow.h" @change="value => selectWindow.h = value*1" number />
      </card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'multiWindow',
    props: {
      windows: {
        type: Array,
        default: () => ([[{w: 500, h: 500}]])
      },
      propsSVG: {
        type: Object,
        default: () => ({ line: { width: 3 }, frame: { width: 30, widthStatic: 15 } })
      },
      widthExportSVG: {
        type: Number,
        default: 100
      },
      isEdit: {
        type: Boolean,
        default: false
      },
      widthIcon: { type: Number, default: null }
    },
    data() {
      return {
        onload: false,
        propsEnter: { position: {top: 0, left: 0, width: 0, height: 0}, show: false },
        selectWindow: {},
        export: '',
      }
    },
    computed: {
      key() {
        return Math.round(Math.random() * 1000)
      },
      rectWidth() {
        if (this.widthIcon === null) return window[`multi_window-${this.key}`].clientWidth;
        window[`multi_window-${this.key}`].style.width = `${this.widthIcon}px`
        return this.widthIcon
      },
      windowWidth() {
        let widthWindows = 0;
        for (let window of this.windows) {
          if (window.type) widthWindows += window.w
          else {
            widthWindows += Math.max( ...window.map( w => w.width ? 0 : w.w ) )
          }
        }
        return widthWindows
      },
      scale() {
        if (this.onload == false) return 1
        return this.rectWidth / this.windowWidth
      },
      widthRow() {
        let result = []
        for(let window of this.windows) {
          if (window.type) result.push(null)
          else {
            console.log(window);            
            result.push( window.reduce( (result, w) => {
              return result + w.w 
            }, 0 ) )
          }
        }
        return result
      },
    },
    mounted() {
      this.$nextTick( () => { this.onload = true; } )
    },
    methods: {
      clickSvg({isLeft, isRight, isTop, isBottom, isCenter}) {
        if (isLeft) this.window.open = 'right'
        if (isRight) this.window.open = 'left'
        if (isCenter) this.window.type = (this.window.type == 'static' ? 'active' : 'static' )
        if (isTop) this.window.leaf = (this.window.leaf ? false : true )
      },
      toggleProps(id) {
        if (id === false) {
          this.propsEnter.show = false
          this.$emit('showoverlay', false)
          return
        }

        let {top, left, width, height} = window[id].parentNode.getBoundingClientRect()
        top = window[id].parentNode.offsetTop
        left = window[id].parentNode.offsetLeft
        this.propsEnter.position = {top, left, width, height}
        this.propsEnter.show = true
        this.$emit('showoverlay', true)
        let this_ = this;
        this.$nextTick(function() {
          window.overlay.onclick = function() { this_.toggleProps(false) }
        })

        let index = id.split('-').splice(1)
        if (index.length == 1) this.selectWindow = this.windows[index[0]]
        if (index.length == 2) this.selectWindow = this.windows[index[0]][index[1]]
      },
      calculateExport() {
        let svg_ = []
        let offsetX = 0, offsetY = 0;
        let width = window[`multi_window-${this.key}`].clientWidth
        let height = window[`multi_window-${this.key}`].clientHeight

        //width = 500
        //height = 500

        offsetX = Math.min( ...this.$refs.window.map( w => w.position.x ) )
        offsetY = Math.min( ...this.$refs.window.map( w => w.position.y ) )
        //console.log(offsetX, offsetY);

        for(let indexWindow in this.$refs.window) {
          let window_ = this.$refs.window[indexWindow]
          //console.log(window_);
          let translateX = window_.position.x - offsetX
          let translateY = window_.position.y - offsetY
          svg_.push( `
            <g transform="translate(${translateX}, ${translateY})">
              <g transform="scale(${this.scale})">
                ` + window[window_.$props.id].innerHTML + `
              </g>
            </g>
          `);
        }
        let widthExport = this.widthExportSVG ? `width=${this.widthExportSVG}` : ''
        let svg = `<svg ${widthExport} viewBox="0, 0, ${width}, ${height}">` + svg_.join('') + "</svg>"
        this.export = svg
        return svg
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .window-row {
    /*width: 100%;//*/
  }
  .window-col {
    font-size: 0px;
  }

  .width-100 {
    /*width: 100%;/**/
  }

  .props-enter {
    position: absolute;
    z-index: 11;
    min-width: 150px;
  }

  .multi_window {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
</style>