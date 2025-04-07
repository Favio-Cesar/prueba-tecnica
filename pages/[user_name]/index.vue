<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import StreamChat from '~/components/containers/stream/StreamChat.vue'
import StreamBox from '~/components/containers/stream/StreamBox.vue'
import type { Stream } from '~/interfaces/StreamType'

const route = useRoute()
const user_name = ref<string>(route.params.user_name as string)
const stream = ref<Stream[]>([])
onMounted(async () => {
  stream.value = await data.fetchStreamInfo(user_name.value)
})
</script>

<template>
  <div class="content">
    <StreamBox />

    <StreamChat :chat-name="user_name" />
  </div>
</template>
<style lang="scss">
.content {
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  color: var(--c-font-white);
}

.chat-box {
  width: fit-content;
  height: auto;
}
</style>
