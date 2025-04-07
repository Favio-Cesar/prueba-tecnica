<script setup lang="ts">
import SearchBar from '~/components/modules/layout/SearchBar.vue'
import UserActions from '~/components/modules/layout/UserActions.vue'
import Midutch from '~/components/modules/layout/LogoSection.vue'
</script>

<template>
  <header class="header">
    <Midutch />

    <SearchBar />

    <UserActions />
  </header>
</template>
<style lang="scss" scoped>
.header {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  min-height: var(--s-header-height);
  background-color: var(--c-bg-light);
  @include flex-center(space-between);
  padding: 0 1rem;
  color: white;
  z-index: 1000;

  &__left,
  &__center,
  &__right {
    gap: 0.7em;
    display: flex;
    align-items: center;
    height: var(--header-section-height);
  }
}
</style>
