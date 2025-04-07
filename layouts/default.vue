<script setup lang="ts">
import RecommendedChannels from '~/components/containers/layout/RecommendedChannelsAside.vue'
import TheHeader from '~/components/containers/layout/TheHeader.vue'
</script>

<template>
  <div class="layout">
    <TheHeader />
    <section class="layout__main">
      <RecommendedChannels />
      <section class="layout__content">
        <slot />
      </section>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  &__main {
    display: flex;
    flex: 1;
    overflow: hidden;

    > :first-child {
      flex-shrink: 0;
    }
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
