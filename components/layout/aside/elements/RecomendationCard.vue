<script setup lang="ts">
import { useNumberFormatter } from '~/composables/NumberNormalization'
import type { Stream } from '~/interfaces/StreamType'
const { recomendation, isOpen } = defineProps<{
  recomendation: Stream
  isOpen: boolean
}>()
</script>
<template>
  <NuxtLink :to="`/${recomendation.user_login}`" class="recomendations">
    <NuxtImg
      :src="recomendation.profile_image_url"
      class="recomendations__icon"
      alt="thumbnail"
    />

    <section v-if="isOpen" class="recomendations__info">
      <p class="recomendations__name">{{ recomendation.user_name }}</p>
      <p class="recomendations__activity">{{ recomendation.game_name }}</p>
    </section>

    <span v-if="isOpen" class="recomendations__viewers">{{
      useNumberFormatter(recomendation.viewer_count, 1)
    }}</span>
  </NuxtLink>
</template>
<style lang="scss" scoped>
.recomendations {
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0.4em;
  align-items: center;
  width: 100%;
  font-size: var(--s-font-big);
  &:hover {
    background-color: var(--c-bg-light);
  }
  &__icon {
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
    @include no-select;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }
  &__viewers {
    flex: 1;
    text-align: right;
    @include no-select;
    &:before {
      position: absolute;
      margin-left: -1.2em;
      margin-top: 0.4em;
      content: '';
      background-color: red;
      border-radius: 50%;
      width: 1em;
      height: 1em;
      pointer-events: none;
    }
  }
}
</style>
