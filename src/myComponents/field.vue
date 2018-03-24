<template>
  <div :class="classesFormGroup">
    <label v-if="label">{{label}}</label>
      <input 
        v-if="isInput && !(isFalse(append) || isFalse(prepend))" 
        :type="typeComputed" 
        :class="classes" 
        :value="value" 
        @input="e => $emit('input', e.target.value)"
        @change="e => $emit('change', e.target.value)"
        @keypress="e => $emit('keypress', e)"
        @keyup="e => $emit('keyup', e)"
        @keydown="e => $emit('keydown', e)"
        :placeholder=placeholder
        :disabled=disabled
        :min="typeComputed == 'number' ? this.min : null"
        :max="typeComputed == 'number' ? this.max : null"
      >

    <div class="input-group" v-if="isInput && (isFalse(append) || isFalse(prepend))">
      <div class="input-group-prepend" v-if="isFalse(prepend)">
        <span class="input-group-text">{{prepend}}</span>
      </div>
      <input 
        v-if="isInput" 
        :type="typeComputed" 
        :class="classes" 
        :value="value" 
        @input="e => $emit('input', e.target.value)"
        @change="e => $emit('change', e.target.value)"
        @keypress="e => $emit('keypress', e)"
        @keyup="e => $emit('keyup', e)"
        @keydown="e => $emit('keydown', e)"
        :placeholder=placeholder
        :disabled=disabled
        :min="typeComputed == 'number' ? this.min : null"
        :max="typeComputed == 'number' ? this.max : null"
      >
      <div class="input-group-append" v-if="isFalse(append)">
        <span class="input-group-text">{{append}}</span>
      </div>
    </div>

    <button 
      v-if="this.typeComputed == 'button'" 
      class="btn"
      :class="classes" 
      @click="$emit('click')"
      :disabled="isFalse(disabled)"
    >
      <slot>{{value}}</slot>
    </button>
    <select 
      v-if="typeComputed == 'select'"
      :value=value
      @input="e => $emit('input', e.target.value)"
      @change="e => $emit('change', e.target.value)"
      :class="classes" 
      :disabled=disabled
    >
      <option v-for="(o, index) in options" :key="`o-${index}`" :value="o.id || index">{{o.title || o.text || o}}</option>
    </select>
    <textarea 
      v-if="typeComputed == 'textarea'"
      :class="{'form-control': formControl}" 
      :value="value"
      @input="e => $emit('input', e.target.value)"
      @change="e => $emit('change', e.target.value)"
      @keypress="e => $emit('keypress', e)"
      @keyup="e => $emit('keyup', e)"
      @keydown="e => $emit('keydown', e)"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<script>
  export default {
    props: {
      type: { type: String, default: 'text' },
      control: { type: [String, Boolean], default: true },
      group: { type: [String, Boolean], default: false },
      label: { type: [String, Boolean], default: false },
      disabled: { type: [String, Boolean], default: false },
      placeholder: { type: String, default: '' },
      value: { type: [String, Number], default: '' },
      // Выравнивание
      right: { type: [String, Boolean], default: false },
      center: { type: [String, Boolean], default: false },
      left: { type: [String, Boolean], default: false },
      // Размер
      sm: { type: [String, Boolean], default: false },
      lg: { type: [String, Boolean], default: false },
      // text
      text: { type: [String, Boolean], default: false },
      valid: { type: [String, Boolean], default: false },
      invalid: { type: [String, Boolean], default: false },
      // textarea
      textarea: { type: [String, Boolean], default: false },
      // Список
      select: { type: [String, Boolean], default: false },
      options: { type: Array, default: () => [] },
      // Дополнительный текст
      append: { type: [String, Boolean], default: false },
      prepend: { type: [String, Boolean], default: false },
      // button
      button: { type: [String, Boolean], default: false },
      primary: { type: [String, Boolean], default: false },
      secondary: { type: [String, Boolean], default: false },
      danger: { type: [String, Boolean], default: false },
      outline: { type: [String, Boolean], default: false },
      // Поле для ввода цифр
      numeric: { type: [String, Boolean], default: false },
      number: { type: [String, Boolean], default: false },
      min: { type: [Number, Boolean], default: false },
      max: { type: [Number, Boolean], default: false },
      // колонки
      column: { type: [Array, Number, String, Boolean], default: false }
    },
    name: 'field',
    data() {
      return {
        columnClasses: [ 'col-', 'col-md-', 'col-lg-', 'col--' ]
      }
    },
    computed: {
      formControl: function() {
          if (this.control === '') return true;
          if (this.control == true) return true;
          if (this.control == false) return false;
          return true;
      },
      isInput() {
        if (this.typeComputed == 'button')      return false
        if (this.typeComputed == 'select')      return false
        if (this.typeComputed == 'textarea')    return false
        if (this.typeComputed == 'text')        return true;
        if (this.typeComputed == 'number')      return true;
        if (this.typeComputed == 'password')    return true;
        if (this.typeComputed == 'email')       return true;
        return false;
      },
      typeComputed() {
        if (this.isFalse(this.text))                                   return 'text'
        if (this.isFalse(this.number)   || this.isFalse(this.numeric) || this.type == 'number')  return 'number'
        if (this.isFalse(this.textarea) || this.type == 'textarea')     return 'textarea'
        if (this.isFalse(this.select)   || this.type == 'select')       return 'select'
        if (this.isFalse(this.button)   || this.type == 'button')       return 'button'
        if (this.isFalse(this.password) || this.type == 'password')     return 'password'
        if (this.isFalse(this.email)    || this.type == 'email')        return 'email'
        return this.type
      },
      classes() {
        let result = []
        if (this.isFalse(this.left))   result.push('float-left')
        if (this.isFalse(this.right))  result.push('float-right')

        if (this.typeComputed == 'button') {
          if (this.isFalse(this.outline)) {
            if (this.isFalse(this.primary))    result.push('btn-outline-primary')
            if (this.isFalse(this.secondary))  result.push('btn-outline-secondary')
            if (this.isFalse(this.danger))     result.push('btn-outline-danger')
          }
          if (!this.isFalse(this.outline)) {
            if (this.isFalse(this.primary))    result.push('btn-primary')
            if (this.isFalse(this.secondary))  result.push('btn-secondary')
            if (this.isFalse(this.danger))     result.push('btn-danger')
          }
          if (this.isFalse(this.sm))         result.push('btn-sm')
          if (this.isFalse(this.lg))         result.push('btn-lg')
        }
        if (this.isInput || this.typeComputed == 'select' || this.typeComputed == 'textarea') {
          if (this.isFalse(this.primary))    result.push('btn-primary')
          if (this.isFalse(this.secondary))  result.push('btn-secondary')
          if (this.isFalse(this.danger))     result.push('btn-danger')
          if (this.isFalse(this.sm))         result.push('form-control-sm')
          if (this.isFalse(this.lg))         result.push('form-control-lg')
          if (this.isFalse(this.control))    result.push('form-control')
          if (this.isFalse(this.valid))      result.push('is-valid')
          if (this.isFalse(this.invalid))    result.push('is-invalid')
        }
        return result
      },
      classesFormGroup() {
        let result = [];

        if (this.group === '' || this.group == true || this.label !== false) result.push('form-group');
        if (this.isFalse(this.append)) result.push('input-group')
        if (this.isFalse(this.append) && this.isFalse(this.sm)) result.push('input-group-sm')
        if (this.isFalse(this.append) && this.isFalse(this.lg)) result.push('input-group-lg')

        if (this.column) {
          if ( Array.isArray(this.column) ) {
            for(let i in this.column.slice(0, 3)) result.push( this.columnClasses[i] + this.column[i] )
          }
          if ( typeof(this.column) == 'string' || Number.isInteger(this.column) ) result.push( this.columnClasses[0] + this.column )
        }
        return result;
      }
    },
    mounted() {
    },
    methods: {
      isFalse(value) {
        if (value === '' || value == true || value) return true;
        return false;
      }
    },
    filters: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>