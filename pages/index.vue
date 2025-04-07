<script setup lang="ts">
import CategoryRow from '~/components/containers/main/CategoryRow.vue'
import StreamRow from '~/components/containers/main/StreamRow.vue'
</script>

<template>
  <span>
    <StreamRow />
    <StreamRow />
    <CategoryRow />
  </span>
</template>

<style lang="scss">
.body {
  padding-bottom: 4rem;
}
</style>
