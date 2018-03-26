<template>
  <div id="app" class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
    };
  },
  computed: {
  },
  async mounted() {},
  methods: {},
  components: {}
};
</script>

<style>
body,
html {
  height: calc(100% - 2px - 4rem);
  width: 100%;
  background: rgb(246, 249, 250);
  margin: 0px;
  padding: 0px;
}

#app {
  height: calc(100% - 2px);
}

</style>
