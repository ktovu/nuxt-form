<template>
  <b-container fluid>
    <b-row
      align-v="center"
      class="flex-column justify-content-center full-height"
    >
      <Stepper />
      <Nuxt />
    </b-row>
  </b-container>
</template>

<script>
import Stepper from '~/components/Stepper'
export default {
  components: {
    Stepper,
  },
}
</script>

<style>
html {
  font-family: Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
