<script setup lang="ts">
import StarIcon from '~/components/stream/content/elements/icons/StarIcon.vue'
import HeartIcon from '~/components/stream/content/elements/icons/HeartIcon.vue'
import type { Stream } from '~/interfaces/StreamType'
const stream = inject<Ref<Stream>>('stream')
</script>

<template>
  <section class="stream-box__action">
    <h1 v-if="stream">{{ stream.user_name }}</h1>
    <section class="stream-box__action--buttons">
      <button class="nav__item nav__item--blue"><HeartIcon />Follow</button>
      <button class="nav__item nav__item--gray"><StarIcon />Subscribe</button>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.stream-box {
  &__action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    &--buttons {
      display: flex;
      gap: 1em;
    }
  }
}
</style>
