<template>
  <b-form class="form" @submit.stop.prevent="onSubmit">
    <h1 class="form__title">Overview:</h1>
    <div class="form__table">
      <div class="form__table-row">
        <div class="form__table-title">First name:</div>
        <div class="form__table-value">{{ formData.name }}</div>
        <div class="form__table-title">Last name:</div>
        <div class="form__table-value">{{ formData.surname }}</div>
        <div class="form__table-title">E-mail:</div>
        <div class="form__table-value">{{ formData.email }}</div>
        <div class="form__table-title">Membership:</div>
        <div class="form__table-value">{{ formData.membership }}</div>
        <template v-for="phone in formData.phone" class="form__table-row">
          <div :key="phone.typePhone" class="form__table-title">
            {{ phone.typePhone }} Phone:
          </div>
          <div :key="phone.value" class="form__table-value">
            {{ phone.value }}
          </div>
        </template>
      </div>
      <div class="form__table-row">
        <a
          href="#"
          class="form__table-edit-button"
          @click.prevent="toggleModal(true)"
          >Edit</a
        >
      </div>
    </div>
    <transition name="fade">
      <div v-show="showModal" class="modal">
        <div class="modal__bg"></div>
        <div class="modal__container">
          <b-form class="form" @submit.stop.prevent="submitChanges">
            <div class="form__field">
              <b-form-group
                label="First name"
                label-for="first-name-input"
                label-class="form__label"
                class="form__group"
              >
                <b-form-input
                  id="first-name-input"
                  v-model="formData.name"
                  type="text"
                  class="form__input"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="form__field">
              <b-form-group
                label="Last name"
                label-for="last-name-input"
                label-class="form__label"
                class="form__group"
              >
                <b-form-input
                  id="last-name-input"
                  v-model="formData.surname"
                  type="text"
                  class="form__input"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="form__field">
              <b-form-group
                label="Email address"
                label-for="email-input"
                label-class="form__label"
                class="form__group"
              >
                <b-form-input
                  id="email-input"
                  v-model="formData.email"
                  type="email"
                  class="form__input"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="get-free-space">
              <div
                v-for="(phone, index) in formData.phone"
                :key="index"
                class="form__field"
              >
                <b-form-group
                  :label="`${phone.typePhone} Phone:`"
                  :label-for="`phone-input-${index}`"
                  label-class="form__label"
                  class="form__group"
                >
                  <b-form-input
                    :id="`phone-input-${index}`"
                    v-model="phone.value"
                    type="tel"
                    class="form__input"
                  ></b-form-input>
                </b-form-group>
              </div>
            </div>
            <b-button
              block
              class="form__button form__button_empty"
              @click="toggleModal(false)"
              >Cancel</b-button
            >
            <b-button block type="submit" class="form__button">Submit</b-button>
          </b-form>
        </div>
      </div>
    </transition>
    <b-button block class="form__button form__button_empty" @click="back"
      >Back</b-button
    >
    <b-button block type="submit" class="form__button">Submit</b-button>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
    }
  },
  computed: {
    formData() {
      return this.$store.state.form
    },
  },
  methods: {
    toggleModal(value) {
      this.showModal = value
    },
    onSubmit() {
      this.$axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
      this.$axios
        .$post('https://httpreq.com/young-union-5g923iv0/record', this.formData)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    back() {
      this.$router.push('/form/membership')
    },
    submitChanges() {
      this.$store.commit('changeFormData', this.formData)
      this.toggleModal(false)
    },
  },
}
</script>
