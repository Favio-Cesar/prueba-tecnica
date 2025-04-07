<script setup lang="ts">
import UserIcon from '~/components/misc/icons/UserIcon.vue'
import ShareIcon from '~/components/stream/content/elements/icons/ShareIcon.vue'
import ThreeDotsIcon from '~/components/misc/icons/ThreeDotsIcon.vue'
import type { Stream } from '~/interfaces/StreamType'

const stream = inject<Ref<Stream>>('stream')
</script>

<template>
  <section class="stream-info">
    <section class="stream-info__text">
      <h2 v-if="stream">{{ stream.title }}</h2>
      <h3 v-if="stream" class="highlight">{{ stream.game_name }}</h3>
      <ul class="stream-info__tags">
        <li v-for="tag in stream?.tags || []" :key="tag" class="stream-info__tag">
          {{ tag }}
        </li>
      </ul>
    </section>

    <section class="stream-info__status">
      <UserIcon class="icon__profile" />
      <span class="viewer-count">{{ stream?.viewer_count || 0 }}</span>
      <span>0:00:00</span>
      <ShareIcon class="icon" />
      <ThreeDotsIcon class="icon" />
    </section>
  </section>
</template>

<style lang="scss" scoped>
.stream-info {
  display: flex;
  justify-content: space-between;
  margin: 1em 0;
  flex-wrap: wrap;
  &__text {
    flex: 1;
  }

  &__status {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75em;
  }
  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: flex-start;
    padding: 0;
  }
  &__tag {
    background-color: rgba(162, 162, 162, 0.185);
    padding: 0.3em 0.6em;
    list-style-type: none;
    margin: 0.2em;
    border-radius: 1em;
  }
}

.highlight {
  font-weight: bold;
}

.viewer-count {
  color: var(--c-bg-viewer);
}

.icon {
  flex-shrink: 0;
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: middle;
  fill: var(--c-bg-viewer);
  &__profile {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    fill: var(--c-bg-viewer);
  }
}

.icon--user {
  aspect-ratio: 1 / 1;
}
</style>
