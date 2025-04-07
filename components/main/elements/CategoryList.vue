<script setup lang="ts">
import GameIcon from '~/components/main/elements/icons/GameIcon.vue'
import IrlIcon from '~/components/main/elements/icons/IrlIcon.vue'
import MusicIcon from '~/components/main/elements/icons/MusicIcon.vue'
import CreativeIcon from '~/components/main/elements/icons/CreativeIcon.vue'
import EsportsIcon from '~/components/main/elements/icons/EsportsIcon.vue'

export type Category = {
  id: string
  name: string
  icon: Component
}

const categories: Category[] = [
  { id: 'games', name: 'Games', icon: GameIcon },
  { id: 'irl', name: 'IRL', icon: IrlIcon },
  { id: 'music', name: 'Music & DJs', icon: MusicIcon },
  { id: 'creative', name: 'Creative', icon: CreativeIcon },
  { id: 'esports', name: 'Esports', icon: EsportsIcon },
]
</script>

<template>
  <div class="category-list">
    <div v-for="category in categories" :key="category.id" class="category-item">
      <span class="category-item__name">{{ category.name }}</span>
      <component :is="category.icon" class="category-item__icon" />
    </div>
  </div>
</template>

<style lang="scss">
.category-list {
  display: flex;
  gap: 1em;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
}

.category-item {
  display: flex;
  align-items: center;
  background-color: #0073e6;
  color: white;

  padding: 0em 1em;
  border-radius: 0.5em;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  flex-grow: 1;
}

.category-item__name {
  flex-grow: 1;
}

.category-item__icon {
  margin-left: 1.5em;
}

.category-item:hover {
  background-color: #005bb5;
}
</style>
