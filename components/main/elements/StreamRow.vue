<script setup lang="ts">
import ArrowDownIcon from '~/components/misc/icons/ArrowDownIcon.vue'
import StreamCard from '~/components/main/elements/StreamCard.vue'

import { data as dataFetcher } from '~/composables/useFetchData'
import type { Stream } from '~/interfaces/StreamType'
const streams = ref<Stream[]>([])

const streamNumber = ref<number>(3)
watchEffect(async () => {
  const data = await dataFetcher.fetchRandomStreams(streamNumber.value)
  streams.value = data as Stream[]
})
</script>

<template>
  <section class="body__col">
    <h1 class="body__text--title">
      <span class="body__text--highlight">Live channels</span> we think you'll like
    </h1>
    <section class="body__row">
      <StreamCard v-for="stream in streams" :key="stream.user_id" :stream="stream" />
    </section>
    <button class="body__button--show" @click="streamNumber += 3">
      <span class="body__text--highlight">Show more</span><ArrowDownIcon />
    </button>
    <span class="body__button--line"></span>
  </section>
</template>

<style lang="scss">
.body {
  &__row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    justify-content: space-between;
    width: 100%;
  }

  &__col {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    overflow: hidden;
    color: white;
  }

  &__text {
    &--highlight {
      color: var(--c-font-highlight);
    }

    &--title {
      align-self: start;
      font-size: 1rem;
    }
  }

  &__button {
    overflow: visible;

    &--line {
      background-color: var(--search-border-color);
      border-color: transparent;
      width: 100%;
      height: 0.1em;

      margin: 0.5rem 0;
    }

    &--show {
      position: relative;
      flex-direction: row;
      text-align: center;
      justify-content: center;
      align-items: center;
      color: white;
      width: fit-content;
      display: flex;
      gap: 1rem;
      background-color: var(--c-bg);
      border-color: transparent;
      margin-bottom: -1.7rem;
      padding: 0.5rem 1rem;
    }
  }
}

@media (max-width: 57.5em) {
  .body__row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .body__text--title {
    font-size: 1.5rem;
  }
}
</style>
