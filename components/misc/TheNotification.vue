<script setup lang="ts">
defineProps<{
  notification: string
  position?: 'bottom-large'
}>()
</script>

<template>
  <span class="icon"
    ><span class="icon__notification" :class="position">{{ notification }}</span
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

  .top {
    top: -0.5em;
    right: 3.5em;
  }

  .bottom-large {
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(200%);
    font-size: 1.2em;
    border-radius: 0.5em;
    padding: 0em 0.3em;
  }
}
</style>
