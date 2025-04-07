<script setup lang="ts">
export type TopGames = {
  data: object[]
  id: string
  name: string
  box_art_url: string
  tags: string[]
}

const thumbnailUrl = computed(() =>
  props.category.box_art_url.replace('{width}', '1920').replace('{height}', '1080'),
)
const props = defineProps<{ category: TopGames }>()
</script>

<template>
  <NuxtLink :to="'/' + category.name">
    <article class="stream-preview">
      <NuxtImg :src="thumbnailUrl" alt="thumbnail" class="stream-preview__category" />

      <section class="stream-preview__info">
        <section class="stream-info">
          <h1 class="stream-info__h1">{{ category.name }}</h1>

          <ul class="stream-info__tags">
            <li v-for="tag in category.tags" :key="tag" class="stream-info__tag">
              {{ tag }}
            </li>
          </ul>
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
    aspect-ratio: 9 / 16;
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
  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: flex-start;
    padding: 0;
  }

  &__tag {
    background-color: rgba(162, 162, 162, 0.185);
    padding: 0.3em 0.6em;
    list-style-type: none;
    margin: 0.2em;
    border-radius: 1em;
  }
}
</style>
