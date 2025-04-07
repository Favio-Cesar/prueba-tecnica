<script setup lang="ts">
import { data as dataFetcher } from '~/composables/useFetchData'
import CategoryPreview from '~/components/ui/CategoryCard.vue'
import type { Game } from '~/services/api/FetchTwitchApiService'

const categories = ref<Game[]>([])

watchEffect(async () => {
  const data = await dataFetcher.fetchTopCategories()
  categories.value = data
})
</script>

<template>
  <section class="body__col">
    <h1 class="body__text--title">
      <span class="body__text--highlight">Categories</span> we think you'll like
    </h1>
    <section class="body__row--category">
      <CategoryPreview
        v-for="category in categories"
        :key="category.id"
        :category="category"
      />
    </section>
  </section>
</template>

<style lang="scss">
.body {
  padding-bottom: 4rem;

  &__row {
    &--category {
      display: flex;
      gap: 1em;
    }
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
