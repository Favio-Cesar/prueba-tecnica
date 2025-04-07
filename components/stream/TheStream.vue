<script setup lang="ts">
import { useRoute } from 'vue-router'

import TheStreamContent from '~/components/stream/content/TheStreamContent.vue'
import type { Stream } from '~/interfaces/StreamType'

const route = useRoute()
const user_name = ref<string>('')
const stream = ref<Stream>()
watchEffect(() => {
  user_name.value = (route.params.user_name as string) || ''
})

onMounted(async () => {
  if (!user_name.value) return

  stream.value = await data.fetchStreamInfo(user_name.value)
})

provide('user_name', user_name)

provide('stream', stream)
</script>

<template>
  <div class="content">
    <TheStreamContent />
  </div>
</template>
<style lang="scss">
.content {
  display: flex;
  justify-content: space-between;
  width: 100%;

  color: var(--c-font-white);
}

.chat-box {
  width: fit-content;
  height: 100%;
}
</style>
