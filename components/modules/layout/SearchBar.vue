<script setup lang="ts">
import SearchIcon from '~/components/icons/header/SearchIcon.vue'
</script>

<template>
  <article class="header__center">
    <section class="header__search-container">
      <input
        id="search"
        type="text"
        name="search"
        class="header__search"
        placeholder="Search"
      />
      <SearchIcon class="header__search-icon" />
    </section>
  </article>
</template>
<style lang="scss" scoped>
.header {
  &__center {
    flex-grow: 1;
    max-width: 50%;

    justify-content: center;
  }

  &__search-container {
    position: relative;
    display: flex;
    height: var(--s-header-section-height);
    width: min(50%, 50vw);
  }

  &__search {
    width: 100%;

    border: 0.03em solid var(--search-border-color);
    border-radius: 0.4em 0 0 0.4em;
    background-color: var(--search-bg-color);
    color: white;
    outline: none;
    font-size: 1em;
    padding: 0.5em;
    height: 100%;

    transition: border-color 0.3s;

    &::placeholder {
      color: #aaa;
    }

    &:focus {
      border-color: #dbdbdb;
    }
  }

  &__search-icon {
    border: 0.4em solid var(--search-bg-icon-color);
    background-color: var(--search-bg-icon-color);
    border-radius: 0em 0.4em 0.4em 0em;
    height: 100%;
    padding: 0.15em 0.2em;

    width: auto;
    color: #aaa;
  }
}
</style>
