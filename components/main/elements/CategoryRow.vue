<script setup lang="ts">
import { data as dataFetcher } from '~/composables/useFetchData'
import CategoryCard from '~/components/main/elements/CategoryCard.vue'
import CategoryList from '~/components/main/elements/CategoryList.vue'
import type { Game } from '~/services/api/FetchTwitchApiService'

const categories = ref<Game[]>([])

watchEffect(async () => {
  const data = await dataFetcher.fetchTopCategories()
  categories.value = data
})
</script>

<template>
  <section class="category__col">
    <h1 class="category__text--title">
      <span class="category__text--highlight">Categories</span> we think you'll like
    </h1>
    <section class="category__row--category">
      <CategoryCard
        v-for="category in categories"
        :key="category.id"
        :category="category"
      />
    </section>
    <section class="category__row--type">
      <CategoryList />
    </section>
  </section>
</template>

<style lang="scss">
.category {
  padding-bottom: 4rem;

  &__row {
    &--category {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 1.5rem;
    }
    &--type {
      display: flex;

      gap: 1.5rem;
    }
  }

  &__col {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1.7rem;
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
      height: 0.2rem;
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
      padding-bottom: 1rem;
    }
  }
}

@media (max-width: 57.5em) {
  .category__row--category {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
