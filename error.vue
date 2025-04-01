<script setup lang="ts"></script>
<template>
  <article class="error">
    <div class="error__div">
      <h1 class="error__title">404</h1>
      <p class="error__subtitle">Se ha producido un error</p>
    </div>
  </article>
</template>

<style scoped>
.error {
  display: grid;
  place-content: center;
  height: 100vh;
}
.error__div {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.error__title {
  font-size: 10rem;
  text-align: center;
}

.error__subtitle {
  font-size: 2rem;
  text-align: center;
}

.error__button {
  margin: 2em 0 0;
}
</style>
