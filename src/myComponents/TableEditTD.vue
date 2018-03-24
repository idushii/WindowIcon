<template>
    <td>
      <input v-if="!isSelect" type="text" :value="value_" class="form-control" :class="{'form-control-sm': sm}" @input=input @keyup.enter="add" :disabled=disabled>
      <select v-if="isSelect" :value="value_" class="form-control" :class="{'form-control-sm': sm}" @input=input :disabled=disabled>
        <option v-for="(option, index) in options" :key="`option-${index}`" :value="option.id || option.key || option">{{option.Title || option.title || option.Text || option.text || option}}</option>
      </select>
    </td>
</template>

<script>
export default {
  name: 'TableEditTD',
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    item: {
      type: Object,
      default: () => {}
    },
    select: {
      type: Boolean,
      default: false
    },
    sm: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    indexRow: {
      type: [Number, String],
      default: null
    },
    indexColumn: {
      type: [Number, String],
      default: null
    },
    type: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    value_() {
      if (this.value) return this.value
      if (this.item.value) return this.item.value;
    },
    isSelect() {
      return this.select || this.type == 'select'
    },
  },
  methods: {
    input(e) {
      let data = { value: e.target.value, indexRow: this.indexRow || this.item.indexRow, indexColumn: this.indexColumn || this.item.indexColumn }
      this.$parent.$emit('updateColumn', data)
      this.$emit('updateColumn', data)
    },
    add() {
      if (!this.item.new) return;
      this.$parent.$emit('addRow_')
      this.$emit('addRow_')
    },
  },
  mounted() {
    this.item
  }
}
</script>
