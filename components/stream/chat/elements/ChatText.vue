<script setup lang="ts">
import { TwitchChatWebSocket } from '~/services/chat/TwichChatWS'

const { chatName } = defineProps({
  chatName: {
    type: String,
    required: true,
  },
})

const twitchChatConnection = new TwitchChatWebSocket(chatName)

onMounted(() => {
  twitchChatConnection.connectToTwitchChat(chatName)
})

onUnmounted(() => {
  if (twitchChatConnection.ws) {
    twitchChatConnection.ws.value?.close()
  }
})

const messages = twitchChatConnection.messages
</script>

<template>
  <span v-for="(msg, index) in messages" :key="index" class="chat__message">
    <strong :style="{ color: msg.color }">{{ msg.username }}:</strong>
    {{ msg.message }}
  </span>
</template>

<style lang="scss" scoped>
.chat {
  &__message {
    max-width: 23em;
    padding: 0.5em;
    width: 100%;
    text-align: left;
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    &:hover {
      background-color: var(--c-bg-lighter);
    }

    strong {
      margin-right: 0.4em;
    }
  }
}
</style>
