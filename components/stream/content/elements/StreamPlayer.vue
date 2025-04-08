<script setup lang="ts">
import type { Stream } from '~/interfaces/StreamType'
import { inject } from 'vue'

const stream = inject<Ref<Stream>>('stream')
</script>

<template>
  <iframe
    v-if="stream"
    :src="`https://player.twitch.tv/?channel=${stream.user_name}&parent=localhost`"
    class="stream-box__stream"
    allowfullscreen
  />
  <p v-else>User not live.</p>
</template>

<style lang="scss" scoped>
.stream-box__stream {
  width: 100%;
  aspect-ratio: 16 / 9;
  height: auto;
}
</style>
