<script setup lang="ts">
import TheHeader from '~/components/layout/header/TheHeader.vue'
import TheAside from '~/components/layout/aside/TheAside.vue'
import StreamChat from '~/components/stream/chat/StreamChat.vue'
import type { Stream } from '~/interfaces/StreamType'
const user_name = ref<string>('')
const stream = ref<Stream>()
const route = useRoute()

watchEffect(() => {
  user_name.value = (route.params.user_name as string) || ''
})

onMounted(async () => {
  if (!user_name.value) return

  stream.value = await data.fetchStreamInfo(user_name.value)
})
provide('user_name', user_name)
</script>

<template>
  <section class="layout">
    <TheHeader />
    <section class="layout__main">
      <TheAside />
      <section class="layout__content">
        <slot />
      </section>
      <StreamChat></StreamChat>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  &__main {
    display: flex;
    flex: 1;
    overflow: hidden;

    > :first-child {
      flex-shrink: 0;
    }
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
