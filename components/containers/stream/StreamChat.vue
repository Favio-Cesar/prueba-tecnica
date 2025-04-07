<script setup lang="ts">
import CollapseIcon from '~/components/icons/misc/CollapseIcon.vue'
import CommunityIcon from '~/components/icons/chat/CommunityIcon.vue'
import YellowGiftIcon from '~/components/icons/chat/YellowGiftIcon.vue'
import ThinArrowIcon from '~/components/icons/chat/ThinArrowIcon.vue'
import SettingsIcon from '~/components/icons/misc/SettingsIcon.vue'
import { TwitchChatWebSocket } from '~/services/chat/TwichChatWS'
import { onMounted, onUnmounted, ref } from 'vue'

const isOpen = ref(true)
const bits_number = ref(0)
const user_coins = ref(0)

const { chatName } = defineProps<{
  chatName: string
}>()
const twitchChannel = ref<string>(chatName)
const twitchChatConnection = new TwitchChatWebSocket(twitchChannel.value as string)

onMounted(() => {
  twitchChatConnection.connectToTwitchChat(chatName)
})

onUnmounted(() => {
  if (twitchChatConnection.ws) {
    twitchChatConnection.ws.value?.close()
  }
})
const messages = ref<string[]>(twitchChatConnection.messages.value)
</script>

<template>
  <aside
    :class="{
      'chat--open': isOpen,
      'chat--closed': !isOpen,
    }"
    class="chat"
  >
    <section class="chat__header">
      <button class="chat__icon" @click="isOpen = !isOpen">
        <CollapseIcon :class="{ '': !isOpen, 'chat__icon--closed': isOpen }" />
      </button>
      <h1 v-if="isOpen">STREAM CHAT</h1>
      <button v-if="isOpen" class="chat__icon" @click="isOpen = !isOpen">
        <CommunityIcon />
      </button>
    </section>
    <section v-if="isOpen" class="chat__header">
      <button class="chat__icon">
        <ThinArrowIcon class="chat__icon--closed" />
      </button>
      <button class="chat__icon" @click="isOpen = !isOpen">
        <YellowGiftIcon />
      </button>
      <h1>Gift a Sub now to be #1!</h1>
      <button class="chat__icon">
        <ThinArrowIcon />
      </button>
    </section>
    <section v-if="isOpen" class="chat__chat">
      <span v-for="(msg, index) in messages" :key="index" class="chat__message">
        {{ msg }}
      </span>
    </section>
    <section v-if="isOpen" class="chat__actions">
      <input type="text" placeholder="Type a message..." class="actions--input" />
      <section class="actions">
        <span class="actions__buttons">
          <button class="actions__button">{{ bits_number }}</button>
          <button class="actions__button">{{ user_coins }}</button>
        </span>
        <span class="actions__buttons">
          <button class="actions__button">
            <SettingsIcon />
          </button>

          <button class="nav__item nav__item--blue">Send</button>
        </span>
      </section>
    </section>
  </aside>
</template>

<style lang="scss">
.actions {
  &__buttons {
    display: flex;
    gap: 0.5em;
    margin: 0.2em;
    align-items: center;
    justify-content: center;
  }
  &__button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5em;
    color: white;
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &--input {
    width: 100%;
    border: 0.03em solid var(--search-border-color);
    border-radius: 0.4em;
    background-color: var(--search-bg-color);
    color: white;
    outline: none;
    font-size: 1em;
    padding: 0.5em;
    height: 100%;
    margin-bottom: 0.5em;
    transition: border-color 0.3s;

    &::placeholder {
      color: #aaa;
    }

    &:focus {
      border-color: #dbdbdb;
    }
  }
}
.chat {
  @media (max-width: 57.5em) {
    & {
      display: none;
    }
  }
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  color: white;
  max-width: var(--aside-open-width);
  min-width: fit-content;
  background-color: var(--c-bg-light);

  &__chat {
    overflow-y: scroll;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    word-break: break-word;
  }
  &__message {
    padding: 0.5em;

    text-align: left;
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    &:hover {
      background-color: var(--c-bg-lighter);
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: 0.5em;
  }
  &--open {
    max-width: var(--aside-open-width);
    align-self: start;
  }
  &--closed {
    width: fit-content;
    margin: 0;
    height: fit-content;
  }
  &__header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__icon {
    display: flex;
    flex-direction: column;
    width: 3em;
    height: 3em;
    background: none;
    border: none;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    &--closed {
      transform: scaleX(-1);
    }
    &:hover {
      background-color: var(--c-bg-light);
    }
  }
}
</style>
