<script setup lang="ts">
import SettingsIcon from '~/components/misc/icons/SettingsIcon.vue'
const bits_number = ref(0)
const user_coins = ref(0)
</script>

<template>
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
</template>

<style lang="scss" scoped>
.actions {
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
}
</style>
