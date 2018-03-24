<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th v-for="(item, index) in thead" :key="`head-${index}`">{{item.Title}}</th>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(line, index) in rows" :key="`item=${index}`">
          <slot :line="line" :index=index></slot>
          <td><field button value="-" sm @click="removeRow(index)" /></td>
        </tr>
        <tr>
          <slot :line=dataEmpty :index="'new'"></slot>
          <td><field button value="+" sm @click="add" /></td>
        </tr>
      </tbody>
    </table>
  </div>  
</template>

<script>
export default {
  name: 'TableEdit',
  props: {
    head: {
      type: [Array, Object],
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    edit: {
      type: String,
      default: 'none',
    },
  },
  computed: {
    thead() {
      let result = {}
      for(let item in this.head) {
        if (typeof(this.head[item]) == 'string')
          result[item] = { Title: this.head[item] }
        if (typeof(this.head[item]) == 'object') {
          result[this.head[item].key] = { Title: this.head[item].Title, key: this.head[item].key, select: this.head[item].select }
        }
      }
      return result
    },
    rows() {
      let result = []
      for(let indexRow in this.items) {
        let line = {}
        for(let item of this.head) {
          line[item.key] = { value: this.items[indexRow][item.key] || '', indexRow, indexColumn: item.key }
        }
        result.push(line)
      }
      return result;
    },
    dataEmpty: {
      get() {
        let result = {}
        for(let indexColumn in this.thead) 
          result[indexColumn] = { value: this.dataEmptyLine[indexColumn], indexRow: null, indexColumn, new: true }
        return result
      },
      set(value) {
        for(let indexColumn in value)
          this.$set(this.dataEmptyLine, indexColumn, value[indexColumn].value)
          //this.dataEmptyLine[indexColumn] = value[indexColumn].value
      },
    }
  },
  data() { return { dataEmptyLine: {} } },
  created() {     
  },
  mounted() {
    this.$on('updateColumn', this.update)
    this.$on('addRow_', this.add)
  },
  methods: {
    update(e) {
      if (e.indexRow == null) this.dataEmpty = {...this.dataEmpty, [e.indexColumn]: e}
      else this.$emit('setValueColumn', e)
    },
    add() {
      for(let indexColumn in this.dataEmptyLine) if (this.dataEmptyLine[indexColumn] == undefined) this.dataEmptyLine[indexColumn] = ''
      if (!Object.keys(this.dataEmptyLine).length) return;
      this.$emit('addRow', this.dataEmptyLine)
      this.dataEmptyLine = {}
    },
    removeRow(indexRow) {
      this.$emit('removeRow', indexRow)
    }
  }
}
</script>
