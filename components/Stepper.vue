<template>
  <div class="stepper">
    <nuxt-link
      v-for="(page, index) in pages"
      :key="page.link"
      active-class="current"
      :class="currentPageIndex > index ? 'visited' : ''"
      class="stepper__item"
      :to="page.link"
    >
      <div class="stepper__step">
        <span>{{ index + 1 }}</span>
        <span class="stepper__title">{{ page.title }}</span>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: [
        { link: '/form/contact-info', title: 'Personal info' },
        { link: '/form/membership', title: 'Membership' },
        { link: '/form/overview', title: 'Overview' },
      ],
      currentPageIndex: 0,
    }
  },
  watch: {
    $route(to) {
      this.pages.filter((el, index) => {
        if (el.link === to.path) this.currentPageIndex = index
        return el.link === to.path
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.stepper {
  display: flex;
  width: 100%;
  max-width: 490px;
  padding-bottom: 70px;

  &__step {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 52px;
    height: 52px;
    border: 2px solid #d5dee4;
    border-radius: 50%;
    background-color: #d5dee4;
    color: white;
    font-size: 28px;
    font-weight: bold;
    line-height: 37px;
  }

  &__item {
    position: relative;
    display: flex;
    align-items: center;

    &:not(:last-child) {
      flex: 1;
    }

    &.current .stepper__step {
      border: 2px solid #15b0fc;
      background-color: white;
      color: #15b0fc;
    }

    &.visited {
      .stepper__step {
        border: 2px solid #15b0fc;
        background-color: #15b0fc;
        color: white;
      }

      &::after {
        background-color: #15b0fc;
      }
    }

    &::after {
      content: '';
      display: block;
      flex: 1;
      height: 2px;
      background-color: #d5dee4;
    }

    &:hover {
      text-decoration: none;
    }
  }

  &__title {
    position: absolute;
    bottom: -31px;
    color: #394556;
    font-size: 20px;
    font-weight: normal;
    line-height: 26px;
    white-space: nowrap;
  }
}
</style>
