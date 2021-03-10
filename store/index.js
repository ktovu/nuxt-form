export const state = () => ({
  form: {
    name: '',
    surname: '',
    email: '',
    membership: '',
    phone: [],
  },
})

export const mutations = {
  changeFormData(state, data) {
    if (data.name) {
      state.form.name = data.name
    }

    if (data.surname) {
      state.form.surname = data.surname
    }

    if (data.email) {
      state.form.email = data.email
    }

    if (data.phone) {
      state.form.phone = data.phone
    }

    if (data.membership) {
      state.form.membership = data.membership
    }
  },
}
