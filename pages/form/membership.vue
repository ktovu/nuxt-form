<template>
  <b-form class="form" @submit.stop.prevent="onSubmit">
    <h1 class="form__title">Membership</h1>
    <div
      v-for="(option, index) in options"
      :key="option.text"
      class="form__field"
    >
      <div class="form__radio">
        <input
          :id="`form-radio-${index}`"
          v-model="selected"
          type="radio"
          name="form-radio"
          :value="option.value"
        />
        <label :for="`form-radio-${index}`">{{ option.text }}</label>
      </div>
    </div>
    <p v-if="selected === options[0].value" v-html="options[0].description"></p>
    <p
      v-else-if="selected === options[1].value"
      v-html="options[1].description"
    ></p>
    <b-button block class="form__button form__button_empty" @click="back"
      >Back</b-button
    >
    <b-button block type="submit" class="form__button">Continue</b-button>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          text: 'Regular',
          value: 'Regular',
          description:
            "<b>Regular</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
          text: 'Premium',
          value: 'Premium',
          description:
            "<b>Premium</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
      selected: 'Regular',
    }
  },
  methods: {
    onSubmit() {
      this.$store.commit('changeFormData', {
        membership: this.selected,
      })

      this.$router.push('/form/overview')
    },
    back() {
      this.$router.push('/form/contact-info')
    },
  },
}
</script>
