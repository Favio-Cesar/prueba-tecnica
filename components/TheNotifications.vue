<script setup lang="ts">
defineProps<{
  amount: number
}>()
</script>

<template>
  <span class="icon"
    ><span class="icon__notification">{{ amount }}</span
    ><slot
  /></span>
</template>

<style lang="scss" scoped>
.icon {
  position: relative;
  bottom: 0.5em;
  &__notification {
    background-color: var(--notification-bg-color);
    color: var(--c-font-white);
    font-size: var(--s-font-small);
    padding: 0.05em 0.5em;
    border-radius: 1em;
    border: 0.2em solid var(--notification-border-color);
    position: relative;
    top: 0.5em;
  }
}
</style>
