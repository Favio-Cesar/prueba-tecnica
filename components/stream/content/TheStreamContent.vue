<script setup lang="ts">
import { NuxtImg } from '#components'
import { useRoute } from 'vue-router'
import StreamInformation from '~/components/stream/content/elements/StreamInformation.vue'
import StreamActions from '~/components/stream/content/elements/StreamActions.vue'
import { data } from '~/composables/useFetchData'
import type { User } from '~/interfaces/UserType'
import StreamPlayer from '~/components/stream/content/elements/StreamPlayer.vue'
import StreamerAbout from '~/components/stream/content/elements/StreamerAbout.vue'
import TheNotifications from '~/components/misc/TheNotification.vue'

const route = useRoute()
const user_name = ref<string>(
  Array.isArray(route.params.user_name)
    ? route.params.user_name[0]
    : route.params.user_name,
)

const user_info = ref<User | null>(null)
const profileImageUrl = ref('')

onMounted(async () => {
  if (!user_name.value) return

  const users = await data.fetchUserInfo(user_name.value)
  if (users.length > 0) {
    user_info.value = users[0]
    profileImageUrl.value = user_info.value.profile_image_url
  }
})
const notificationText = ref('LIVE')
</script>

<template>
  <section class="stream-box">
    <StreamPlayer />
    <section class="stream-box__description">
      <section class="stream-box__left">
        <TheNotifications :notification="notificationText" position="bottom-large"
          ><NuxtImg :src="profileImageUrl" class="stream-box__profile"
        /></TheNotifications>
      </section>
      <section class="stream-box__right">
        <StreamActions />
        <StreamInformation />
      </section>
    </section>
    <StreamerAbout />
  </section>
</template>

<style lang="scss" scoped>
.stream-box {
  width: 100%;
  margin: 0em 0em 4em;

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
}

@media (max-width: 57.5em) {
  .stream-box {
    &__description {
      flex-direction: column;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
