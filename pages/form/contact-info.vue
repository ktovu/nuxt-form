<template>
  <b-form class="form" @submit.stop.prevent="onSubmit">
    <h1 class="form__title">Personal info</h1>
    <div class="form__field">
      <b-form-group
        label="First name"
        label-for="first-name-input"
        label-class="form__label"
        class="form__group"
      >
        <b-form-input
          id="first-name-input"
          v-model="form.name"
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
          v-model="form.surname"
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
          v-model="form.email"
          type="email"
          class="form__input"
        ></b-form-input>
      </b-form-group>
    </div>
    <transition-group name="slide">
      <div v-for="num in quantityPhones" :key="num" class="form__field">
        <phone-field
          v-model="form.phone[num - 1]"
          :phone-types="phoneTypes"
          :num="num"
          @setSelectedType="selectedType"
          @savePhone="savePhone"
        />
      </div>
    </transition-group>
    <div
      v-if="quantityPhones !== phoneTypes.all.length"
      class="form__add-field add-field"
    >
      <a href="#" class="add-field__button" @click.prevent="addNewPhone"
        ><span class="add-field__icon"></span>Add phone</a
      >
    </div>
    <b-button block type="submit" class="form__button">Continue</b-button>
  </b-form>
</template>

<script>
import PhoneField from '~/components/PhoneField'

export default {
  components: {
    'phone-field': PhoneField,
  },
  data() {
    return {
      form: {
        name: '',
        surname: '',
        email: '',
        membership: '',
        phone: [],
      },
      quantityPhones: 1,
      phoneTypes: {
        all: ['Home', 'Work', 'Mobile', 'Main', 'Other'],
        other: [],
        selected: [],
      },
    }
  },
  created() {
    const currentOrderInput = this.quantityPhones - 1
    this.changeInputSettings()
    this.phoneTypes.selected[currentOrderInput] = this.phoneTypes.other[
      currentOrderInput
    ]
  },
  methods: {
    changeInputSettings() {
      this.phoneTypes.other = [...this.phoneTypes.all].filter((el) => {
        return !this.phoneTypes.selected.includes(el)
      })
    },
    addNewPhone() {
      if (this.quantityPhones < this.phoneTypes.all.length) {
        this.quantityPhones++
        const currentOrderInput = this.quantityPhones - 1
        this.phoneTypes.selected[currentOrderInput] = this.phoneTypes.other[0]
        this.changeInputSettings()
      }
    },
    selectedType(value) {
      this.phoneTypes.selected[value.num - 1] = value.value
      this.changeInputSettings()
    },
    savePhone(value) {
      this.form.phone[value.num] = { value: value.value, typePhone: value.type }
    },
    onSubmit() {
      this.$store.commit('changeFormData', {
        name: this.form.name,
        surname: this.form.surname,
        email: this.form.email,
        phone: this.form.phone,
      })

      this.$router.push('/form/membership')
    },
  },
}
</script>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 710px;
  max-width: 490px;
  padding: 35px;
  border-radius: 8px;
  box-shadow: 0 3px 16px #0000001a;
  background-color: white;

  &__title {
    margin-bottom: 35px;
    color: #15b0fc;
    font-size: 34px;
    font-weight: bold;
    line-height: 45px;
  }

  &__table {
    flex: 1;
  }

  &__table-edit-button {
    color: #15b0fc;
    font-weight: 500;

    &:hover {
      color: #15b0fc;
      text-decoration: none;
    }
  }

  &__group {
    margin-bottom: 20px;
  }

  &__label {
    margin-bottom: 10px;
    color: #394556;
    font-size: 18px;
    line-height: 24px;
  }

  &__input {
    border: 2px solid #c8d3db;
    border-radius: 8px;
  }

  &__add-field {
    margin-bottom: 31px;
    padding-top: 4px;
  }

  &__radio {
    label {
      position: relative;
      display: flex;
      align-items: center;
      min-height: 45px;
      margin-bottom: 30px;
      padding-left: 65px;
      color: #394556;
      font-size: 18px;
      line-height: 24px;
      cursor: pointer;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        display: block;
        width: 45px;
        height: 45px;
        border: 2px solid #c8d3db;
        border-radius: 8px;
        background-color: white;
      }

      &::after {
        content: '';
        position: absolute;
        top: 6px;
        left: 15px;
        transform: rotate(45deg);
        display: block;
        width: 15px;
        height: 25px;
        border-right: 2px solid white;
        border-bottom: 2px solid white;
      }
    }

    input {
      display: none;

      &:checked + label::before {
        background-color: #15b0fc;
      }
    }
  }

  &__button {
    margin-top: 31px;
    padding: 14px 5px;
    border: none;
    border: 2px solid #15b0fc;
    border-radius: 8px;
    background-color: #15b0fc;
    font-size: 28px;
    font-weight: bold;
    line-height: 37px;

    &_empty {
      border-color: #16affc;
      background-color: white;
      color: #15b0fc;
    }

    &:hover,
    &:focus {
      border-color: darken(#15b0fc, 10%);
      background-color: darken(#15b0fc, 10%);
    }
  }

  &__table-row {
    display: grid;
    margin-bottom: 20px;
    color: #394556;
    font-size: 18px;
    line-height: 24px;
    grid-template-columns: max-content 1fr;
    grid-column-gap: 42px;
    grid-row-gap: 20px;
  }

  &__table-title {
    font-weight: bold;
  }
}

.add-field {
  position: relative;

  &__button {
    display: inline-flex;
    align-items: center;
    padding-left: 23px;
    color: #15b0fc;

    &:hover {
      color: #15b0fc;
      text-decoration: none;
    }
  }

  &__icon {
    position: absolute;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;

    &::before {
      content: '';
      width: 16px;
      height: 2px;
      background-color: #15b0fc;
    }

    &::after {
      content: '';
      position: absolute;
      width: 2px;
      height: 16px;
      background-color: #15b0fc;
    }
  }
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: fade-out(black, 0.5);
  }

  &__container {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    width: 100%;
  }
}

.full-height {
  min-height: 100vh;
}

.get-free-space {
  flex: 1;
}

.slide-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  max-height: 0;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
