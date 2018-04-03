<template>
  <div id="form-select-window-icon">
    <card :title=titleComposition class="mb-2">
      <hr>
      <div class="row">
        <div class="col-3" v-for="(icon, index) in icons" :key="`icon-${index}`" @click="setIndexComposition(index)" v-html="icon"></div>
      </div>
    </card>
    <card :title=titlePreview class="mb-2">
      <multiWindow 
        :windows=windows ref="multiWindow" 
        @showoverlay="value => showOverlay = value"
        @update-icon="updateIcon"
      />
    </card>
    <card title="EXPORT" class="mb-2" v-if="showExportCard">
      <field button value="export" @click="getExportSVG" class="mb-2" />
      <div v-html="exportSVG"></div>
      <field :value="exportSVG" textarea />
    </card>
    <div id="overlay" v-if="showOverlay"></div>    
  </div>
</template>

<script>
  export default {
    name: 'index',
    props: {
      composition: {
        type: Array,
        default: () => ([])
      },
      defaultComposition: {
        type: Number,
        default: 0
      },
      showExportCard: {
        type: Boolean,
        default: false
      },
      titleComposition: {
        type: String,
        default: 'Выберите композицию окон'
      },
      titlePreview: {
        type: String,
        default: 'Предпросмотр'
      },
    },
    data: () => ({
      indexComposition: this.defaultComposition,
      exportSVG: "",
      showOverlay: false,
      icons: []
    }),
    computed: {
      windows() { 
        return this.composition[this.indexComposition] || []
      },
    },
    async mounted() {
      let icons = this.icons;
      let multiWindow = {}
      for(let index in this.composition) {
        await this.$nextTick(function() {
          this.indexComposition = null
        })
        await this.$nextTick(function() {
          this.indexComposition = index
        })
        multiWindow = this.$refs.multiWindow
        await this.$nextTick(function() {
          icons.push(multiWindow.calculateExport())
        })
      }
      this.indexComposition = this.defaultComposition
    },
    methods: {
      setIndexComposition(index) {
        this.indexComposition = null
        this.$nextTick()
          .then( () => { this.indexComposition = index })
          .then( () => { this.getExportSVG() })
      },
      getExportSVG() {
        //console.log('getExportSVG');
        this.exportSVG = this.$refs.multiWindow.calculateExport()
        this.$emit('export-window-icon', this.exportSVG)
      },
      updateIcon() {
        this.$nextTick()
          .then( () => { this.getExportSVG() } )
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#overlay {
  position: fixed;
  top: 0px; left: 0px;
  width: 100%; height: 100%;
  background: rgba(158, 155, 190, 0.685);
  z-index: 10;
}
#form-select-window-icon {
  user-select: none;
}
</style>