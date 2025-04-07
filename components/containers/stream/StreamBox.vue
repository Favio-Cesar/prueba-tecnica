<script setup lang="ts">
import { NuxtImg } from '#components'
import { useRoute } from 'vue-router'

import UserIcon from '~/components/icons/header/UserIcon.vue'
import StarIcon from '~/components/icons/description/StarIcon.vue'
import HeartIcon from '~/components/icons/description/HeartIcon.vue'
import { data } from '~/composables/useFetchData'
import ShareIcon from '~/components/icons/description/ShareIcon.vue'
import ThreeDotsIcon from '~/components/icons/misc/ThreeDotsIcon.vue'
import type { Stream } from '~/interfaces/StreamType'
import type { User } from '~/interfaces/UserType'
import YoutubeIcon from '~/components/icons/description/YoutubeIcon.vue'
import TwitterIcon from '~/components/icons/description/TwitterIcon.vue'
import InstagramIcon from '~/components/icons/description/InstagramIcon.vue'
import TiktokIcon from '~/components/icons/description/TiktokIcon.vue'
import { onMounted, ref } from 'vue'

const route = useRoute()
const user_name = ref<string>(
  Array.isArray(route.params.user_name)
    ? route.params.user_name[0]
    : route.params.user_name,
)

const stream = ref<Stream | null>(null)
const user_info = ref<User | null>(null)
const profileImageUrl = ref('')
const number_followers = ref<number>(0)
const socialMedias = [
  { name: 'YouTube', icon: YoutubeIcon },
  { name: 'Twitter', icon: TwitterIcon },
  { name: 'Instagram', icon: InstagramIcon },
  { name: 'TikTok', icon: TiktokIcon },
]

onMounted(async () => {
  if (!user_name.value) return

  const users = await data.fetchUserInfo(user_name.value)
  if (users.length > 0) {
    user_info.value = users[0]
    profileImageUrl.value = user_info.value.profile_image_url
  }

  if (user_info.value) {
    const streams = await data.fetchStreamInfo(user_name.value)
    stream.value = streams[0] || null

    number_followers.value = await data.fetchFollowers(user_info.value.id)
  }
})
</script>

<template>
  <section class="stream-box">
    <iframe
      v-if="stream"
      :src="`https://player.twitch.tv/?channel=${stream.user_name}&parent=localhost`"
      class="stream-box__stream"
      allowfullscreen
    />
    <p v-else>User not in live.</p>
    <section class="stream-box__description">
      <section class="stream-box__left">
        <NuxtImg :src="profileImageUrl" class="stream-box__profile" />
      </section>
      <section class="stream-box__right">
        <section class="stream-box__action">
          <h1 v-if="stream">{{ stream.user_name }}</h1>
          <section class="stream-box__action--buttons">
            <button class="nav__item nav__item--blue"><HeartIcon />Follow</button>
            <button class="nav__item nav__item--gray"><StarIcon />Subscribe</button>
          </section>
        </section>
        <section class="stream-box__info">
          <section class="stream-box__info--text-box">
            <h2 v-if="stream">{{ stream.title }}</h2>
            <h3 v-if="stream" class="body__text--highlight">{{ stream.game_name }}</h3>
            <ul class="stream-info__tags">
              <li v-for="tag in stream?.tags" :key="tag" class="stream-info__tag">
                {{ tag }}
              </li>
            </ul>
          </section>
          <section class="stream-box__info--status">
            <UserIcon style="fill: var(--c-bg-viewer)" />
            {{ stream?.viewer_count }}
            <span>0:00:00</span>
            <ShareIcon />
            <ThreeDotsIcon />
          </section>
        </section>
      </section>
    </section>
    <section class="stream-box__about-user">
      <h1>About {{ user_name }}</h1>
      <div class="stream-box__about-user--description">
        <p>{{ useNumberFormatter(number_followers, 1) }} followers</p>
        <p>{{ user_info?.description }}</p>
        <section class="stream-box__about-user--social-media">
          <component
            :is="socialMedia.icon"
            v-for="(socialMedia, index) in socialMedias"
            :key="index"
            ><p>{{ socialMedia.name }}</p>
          </component>
        </section>
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.stream-box {
  width: 100%;
  &__right {
    width: 100%;
  }
  &__profile {
    border-radius: 50%;
    height: 6em;
    width: 6em;
    aspect-ratio: 1/1;
  }
  &__description {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: row;
    gap: 1em;
    width: 100%;
  }
  &__stream {
    width: 100%;
    aspect-ratio: 16 / 9;
    height: auto;
  }

  &__action {
    display: flex;
    justify-content: space-between;
    &--buttons {
      display: flex;
      gap: 1em;
    }
  }
  &__info {
    display: flex;
    justify-content: space-between;
    &--status {
      display: flex;
      gap: 0.5em;
    }
  }
  &__about-user {
    &--description {
      padding: 1em;
      display: flex;
      background-color: var(--c-bg-light);
      flex-direction: column;
      gap: 1em;
    }
    &--social-media {
      display: flex;
      flex-direction: row;
      gap: 1em;
    }
  }
}
</style>
