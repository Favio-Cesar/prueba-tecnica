<script setup lang="ts">
import CollapseIcon from '~/components/misc/icons/CollapseIcon.vue'
import CommunityIcon from '~/components/stream/chat/elements/icons/CommunityIcon.vue'
import YellowGiftIcon from '~/components/stream/chat/elements/icons/YellowGiftIcon.vue'
import ThinArrowIcon from '~/components/stream/chat/elements/icons/ThinArrowIcon.vue'
import ChatText from './elements/ChatText.vue'
import ChatActions from '~/components/stream/chat/elements/ChatActions.vue'

const chatName = inject<Ref<string>>('user_name') || ref('')
const thereIsChat = computed(() => chatName.value !== '')
const isOpen = ref(true)
</script>

<template>
  <aside
    v-if="thereIsChat"
    :class="{
      'chat--open': isOpen,
      'chat--closed': !isOpen,
    }"
    class="chat"
  >
    <section class="chat__header-group">
      <section class="chat__header">
        <button class="chat__icon" @click="isOpen = !isOpen">
          <CollapseIcon :class="{ 'chat__icon--closed': isOpen }" />
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
    </section>

    <section v-if="isOpen" class="chat__chat">
      <ChatText :chat-name="chatName" />
    </section>

    <section v-if="isOpen" class="chat__actions">
      <ChatActions />
    </section>
  </aside>
</template>

<style lang="scss">
.chat {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  justify-content: space-between;
  height: 100%;
  right: 0;

  color: white;
  width: var(--aside-open-width);
  min-width: fit-content;
  background-color: var(--c-bg-light);

  &__chat {
    overflow-y: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    word-break: break-word;
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
  @media (max-width: 57.5em) {
    & {
      display: none;
    }
  }
}
</style>
