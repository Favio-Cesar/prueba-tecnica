<script setup lang="ts">
import { data } from '~/composables/useFetchData'
import type { Stream } from '~/interfaces/StreamType'

const thumbnailUrl = computed(() =>
  props.stream.thumbnail_url.replace('{width}', '1920').replace('{height}', '1080'),
)
const props = defineProps<{ stream: Stream }>()
const profileImageUrl = ref<string>('')

onMounted(async () => {
  profileImageUrl.value = await data.fetchUserProfilePicture(props.stream.user_login)
})
</script>

<template>
  <NuxtLink :to="'/' + stream.user_login">
    <article class="stream-preview">
      <NuxtImg :src="thumbnailUrl" alt="thumbnail" class="stream-preview__thumbnail" />

      <section class="stream-preview__info">
        <NuxtImg
          :src="profileImageUrl"
          alt="profile picture"
          srcset=""
          class="stream-preview__profile"
        />
        <section class="stream-info">
          <h1 class="stream-info__h1">{{ stream.title }}</h1>
          <p class="stream-info__p">{{ stream.user_name }}</p>
          <p class="stream-info__p">{{ stream.game_name }}</p>
          <ul class="stream-info__tags">
            <li v-for="tag in stream.tags" :key="tag" class="stream-info__tag">
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

  &__thumbnail {
    object-fit: cover;
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
