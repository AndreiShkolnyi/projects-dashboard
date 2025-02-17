<template>
  <ul class="text-sm text-left text-red-500" v-if="errors?.length">
              <li v-for="error in errors" :key="error" class="list-disc">
                {{ error }}
              </li>
            </ul>
</template>

<script setup lang="ts">
defineProps<{ errors: string[]}>()
</script>

<style scoped>

</style>
