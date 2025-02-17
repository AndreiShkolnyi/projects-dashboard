<template>
  <section>
    <nav>
      <ul>
        <li><RouterLink to="/projects">Projects</RouterLink></li>
      </ul>
    </nav>
  </section>
</template>

<script setup lang="ts">

usePageStore().pageData.title = 'Home page'
</script>

<style scoped></style>
