<template>
  <div id="app" class="container">
    <index :composition=composition @export-window-icon="showSCG" />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      composition: [
        [{ w: 450, h: 400, type: 'static', open: 'left', leaf: false }],
        [{ w: 450, h: 500, type: 'static', open: 'left', leaf: false }, { w: 450, h: 500, type: 'static', open: 'left', leaf: false }],
        [{ w: 450, h: 500, type: 'static', open: 'left', leaf: false }, { w: 450, h: 500, type: 'static', open: 'left', leaf: false }, { w: 450, h: 500, type: 'static', open: 'left', leaf: false }],
        [
          [
            { w: 450, h: 200, type: 'static', open: 'left', leaf: false }, 
            { w: 450, h: 300, type: 'static', open: 'left', leaf: false }
          ],
          { w: 450, h: 500, type: 'static', open: 'left', leaf: false }, 
        ],
        [ 
          { w: 450, h: 200, type: 'static', open: 'left', leaf: false }, 
          { w: 450, h: 200, type: 'static', open: 'left', leaf: false },
          [ { w: 900, h: 400, type: 'static', open: 'left', leaf: false, width: 100 } ], 
        ],
        [ 
          [ { w: 900, h: 500, type: 'static', open: 'left', leaf: false, width: 100 },  ], 
          { w: 450, h: 200, type: 'static', open: 'left', leaf: false }, 
          { w: 450, h: 200, type: 'static', open: 'left', leaf: false }, 
        ],
        [ 
          [
            { w: 450, h: 200, type: 'static', open: 'left', leaf: false }, 
            { w: 450, h: 300, type: 'static', open: 'left', leaf: false }
          ],
          { w: 450, h: 500, type: 'static', open: 'left', leaf: false }, 
          { w: 450, h: 500, type: 'static', open: 'left', leaf: false }, 
        ],
      ],
    };
  },
  computed: {
  },
  mounted() {},
  methods: {
    showSCG(svg) {
      //console.log(svg);
    }
  },
  components: {}
};
</script>

<style>
body,
html {
  height: 100%;
  width: 100%;
  background: rgb(246, 249, 250);
  margin: 0px;
  padding: 0px;
}

</style>
