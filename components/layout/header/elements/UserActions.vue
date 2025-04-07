<script setup lang="ts">
import TheNotifications from '~/components/misc/TheNotification.vue'
import CrownIcon from '~/components/layout/header/elements/icons/CrownIcon.vue'
import UserIcon from '~/components/misc/icons/UserIcon.vue'
import { pageData } from '~/mocks/indexData'
const notificationAmount = ref(pageData.primeNotifications)
</script>

<template>
  <div class="header__right">
    <button class="header__prime">
      <TheNotifications :notification="notificationAmount.toString()"
        ><CrownIcon
      /></TheNotifications>
    </button>
    <nav class="nav">
      <NuxtLink to="/" class="nav__item nav__item--gray">{{ $t('log-in') }}</NuxtLink>
      <NuxtLink to="/" class="nav__item nav__item--blue">{{ $t('sign-up') }}</NuxtLink>
    </nav>
    <button class="header__user">
      <UserIcon class="header__user--icon" />
    </button>
  </div>
</template>

<style lang="scss">
.header {
  &__prime,
  &__user {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5em;
    &--icon {
      fill: white;
    }
  }
}
.nav {
  display: flex;
  gap: 0.7em;

  &__item {
    text-decoration: none;
    font-size: 1rem;
    color: white;
    transition: background-color 0.3s ease;
    padding: 0.3em 0.6em;
    border-radius: 0.3em;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    &--gray {
      background-color: #29292e;
    }

    &--blue {
      background-color: #3b82f6;
    }

    &:hover {
      background-color: #5c5c5c51;
    }
  }
}

@media (max-width: 30em) {
  .header {
    padding: 0 max(1vw, 0.5rem);
  }

  .header__center {
    display: none;
  }

  .nav {
    display: none;
  }
}
</style>
