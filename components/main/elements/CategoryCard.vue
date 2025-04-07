<script setup lang="ts">
import { useNumberFormatter } from '#imports'
export type TopGames = {
  data: object[]
  id: string
  name: string
  box_art_url: string
}

const thumbnailUrl = computed(() =>
  props.category.box_art_url.replace('{width}', '1920').replace('{height}', '1080'),
)
const props = defineProps<{ category: TopGames }>()

const viewers = await data.fetchGameViewers(props.category.id)
</script>

<template>
  <NuxtLink :to="'/' + category.name">
    <article class="stream-preview">
      <NuxtImg :src="thumbnailUrl" alt="thumbnail" class="stream-preview__category" />

      <section class="stream-preview__info">
        <section class="stream-info">
          <h1 class="stream-info__h1">{{ category.name }}</h1>
          <p>{{ useNumberFormatter(viewers, 1) }} viewers</p>
        </section>
      </section>
    </article>
  </NuxtLink>
</template>

<style lang="scss">
.stream-preview {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: fit-content;

  overflow: hidden;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  cursor: pointer;

  &__category {
    object-fit: fill;
    aspect-ratio: 12 / 16;
    border-radius: 0.4em;
  }
  &__profile {
    width: 2em;
    height: 2em;
    border-radius: 50%;
    object-fit: cover;
  }
  &__info {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
    padding: 1em;

    background-color: var(--c-bg);
  }
}
.stream-info {
  font-size: 0.8em;
  text-align: left;
  width: 100%;
}
</style>
