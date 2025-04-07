<script setup lang="ts">
import CollapseIcon from '~/components/icons/misc/CollapseIcon.vue'
import TheRecomendations from '~/components/StreamRecomendations.vue'

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
      <h1 v-if="isOpen">RECOMMENDED CHANNELS</h1>
      <button class="aside__icon" @click="isOpen = !isOpen">
        <CollapseIcon
          :class="{ 'aside__icon--closed': !isOpen, 'aside__icon--open': isOpen }"
        />
      </button>
    </section>
    <TheRecomendations
      v-for="recomendation in recomendations"
      :key="recomendation.user_id"
      v-bind="recomendation"
      :recomendation="recomendation"
      :is-open="isOpen"
    />
  </aside>
</template>

<style lang="scss">
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
      width: auto;
    }

    &:hover {
      background-color: var(--c-bg-light);
    }
  }
}
</style>
