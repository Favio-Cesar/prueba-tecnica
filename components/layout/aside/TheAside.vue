<script setup lang="ts">
import CollapseIcon from '~/components/misc/icons/CollapseIcon.vue'
import RecomendationCard from '~/components/layout/aside/elements/RecomendationCard.vue'

import { data } from '~/composables/useFetchData'
import type { Stream } from '~/interfaces/StreamType'
const isOpen = ref(true)

const recomendations = ref<Stream[]>([])

onMounted(async () => {
  recomendations.value = await data.fetchTopStreams(6)

  for (let index = 0; index < recomendations.value.length; index++) {
    recomendations.value[index].profile_image_url = await data.fetchUserProfilePicture(
      recomendations.value[index].user_login,
    )
  }
})
</script>

<template>
  <aside
    :class="{
      'aside--open': isOpen,
      'aside--closed': !isOpen,
    }"
    class="aside"
  >
    <section class="aside__header">
      <h1 v-if="isOpen" class="aside__title">{{ $t('recommended-channels') }}</h1>
      <button
        class="aside__icon"
        :class="{ 'aside__icon--closed': !isOpen, 'aside__icon--open': isOpen }"
        @click="isOpen = !isOpen"
      >
        <CollapseIcon />
      </button>
    </section>
    <RecomendationCard
      v-for="recomendation in recomendations"
      :key="recomendation.user_id"
      v-bind="recomendation"
      :recomendation="recomendation"
      :is-open="isOpen"
    />
  </aside>
</template>

<style lang="scss">
@use '@/assets/styles/mixin';

.aside {
  display: flex;
  flex-direction: column;
  align-items: center;

  height: fit-content;
  color: white;
  max-width: var(--aside-open-width);
  min-width: fit-content;
  background-color: var(--c-bg);
  margin: 0.3em;
  &--open {
    width: var(--aside-open-width);
    align-self: start;
  }
  &--closed {
    width: fit-content;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  &__title {
    @include no-select;
  }
  &__icon {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
    background: none;
    border: none;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    &--closed {
      transform: scaleX(-1);
    }
    &--open {
      padding: 0.6em;
      width: auto;
      height: 100%;
    }

    &:hover {
      background-color: var(--c-bg-light);
    }
  }
}
</style>
