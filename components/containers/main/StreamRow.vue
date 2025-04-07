<script setup lang="ts">
import ArrowDownIcon from '~/components/icons/misc/ArrowDownIcon.vue'
import StreamCard from '~/components/ui/StreamCard.vue'

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
  padding-bottom: 4rem;

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    flex-direction: row;
    height: fit-content;
    gap: 2em;

    justify-content: space-between;
  }
  &__col {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1.7em;
    align-items: center;
    overflow: hidden;
  }
  &__text {
    &--highlight {
      color: var(--c-font-highlight);
    }
    &--title {
      align-self: start;
    }
  }
  &__button {
    overflow: visible;

    &--line {
      background-color: var(--search-border-color);
      border-color: transparent;
      width: 100%;
      height: 0.2em;
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
      gap: 1em;
      background-color: var(--c-bg);
      border-color: transparent;
      margin-bottom: -1.7em;
      padding-bottom: 1em;
    }
  }
}
</style>
