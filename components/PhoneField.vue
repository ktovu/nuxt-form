<template>
  <div class="form-group form__group phone-field">
    <label :for="`phone-input-${num}`" class="d-block form__label">Phone</label>
    <b-input-group class="phone-field__container">
      <b-input-group-prepend>
        <b-form-select
          v-model="selectedType"
          :options="inputTypes"
        ></b-form-select>
      </b-input-group-prepend>
      <b-form-input :id="`phone-input-${num}`" v-model="phone"></b-form-input>
    </b-input-group>
  </div>
</template>

<script>
export default {
  props: {
    phoneTypes: {
      type: Object,
      default: null,
    },
    num: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      phone: '',
      selectedType: this.phoneTypes.selected[this.num - 1],
    }
  },
  computed: {
    inputTypes() {
      return [this.selectedType, ...this.phoneTypes.other]
    },
  },
  watch: {
    phone() {
      this.$emit('savePhone', {
        num: this.num - 1,
        value: this.phone,
        type: this.selectedType,
      })
    },
    selectedType() {
      this.sendSelectedType()
    },
  },
  mounted() {
    this.sendSelectedType()
  },
  methods: {
    sendSelectedType() {
      this.$emit('setSelectedType', {
        num: this.num,
        value: this.selectedType,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.phone-field {
  &__container {
    border: 2px solid #c8d3db;
    border-radius: 8px;
    overflow: hidden;
  }

  input,
  select {
    border: none;
  }

  select {
    border-right: 2px solid #c8d3db;
    border-radius: 0;
    background-color: #eee;
    color: #394556;
    font-size: 16px;
    line-height: 21px;
  }
}
</style>
