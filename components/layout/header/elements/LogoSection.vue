<script setup lang="ts">
import MidutchIcon from '~/components/layout/header/elements/icons/MidutchIcon.vue'
import ThreeDotsIcon from '~/components/misc/icons/ThreeDotsIcon.vue'
</script>

<template>
  <div class="header__left">
    <NuxtLink to="/" class="header__left">
      <MidutchIcon class="header__logo" />
      <h1 class="header__title">{{ $t('midutch') }}</h1>
    </NuxtLink>
    <button type="button" class="header__menu-button">
      <ThreeDotsIcon />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.header {
  &__left {
    gap: 0.5em;
    display: flex;
  }

  &__title {
    font-size: 1.2em;
    font-weight: bold;
    text-transform: uppercase;
  }

  &__menu-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.5em;
  }
}
</style>
