<script setup lang="ts">
import { useRoute } from 'vue-router'
import { data } from '~/composables/useFetchData'
import type { User } from '~/interfaces/UserType'
import YoutubeIcon from '~/components/stream/content/elements/icons/YoutubeIcon.vue'
import TwitterIcon from '~/components/stream/content/elements/icons/TwitterIcon.vue'
import InstagramIcon from '~/components/stream/content/elements/icons/InstagramIcon.vue'
import TiktokIcon from '~/components/stream/content/elements/icons/TiktokIcon.vue'

const route = useRoute()
const user_name = ref<string>(
  Array.isArray(route.params.user_name)
    ? route.params.user_name[0]
    : route.params.user_name,
)

const user_info = ref<User | null>(null)

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
  }

  if (user_info.value) {
    number_followers.value = await data.fetchFollowers(user_info.value.id)
  }
})
</script>

<template>
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
</template>

<style lang="scss" scoped>
.stream-box {
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
