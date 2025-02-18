<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(breadcrumb, index) in breadCrumbs" :key="breadcrumb.to">
        <BreadcrumbItem>
        <BreadcrumbLink v-if="index + 1 < breadCrumbs?.length" :as="RouterLink" :to="breadcrumb.to">
          {{ breadcrumb.title }}
        </BreadcrumbLink>
        <BreadcrumbItem v-else>
        <BreadcrumbPage>{{ breadcrumb.title }}</BreadcrumbPage>
      </BreadcrumbItem>
      </BreadcrumbItem>
      <BreadcrumbSeparator v-if="index + 1 < breadCrumbs?.length" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<script setup lang="ts">
import type { BreadCrumb } from '@/types/BreadCrumb';
import { RouterLink } from 'vue-router';

defineProps<{breadCrumbs: BreadCrumb[]}>()
</script>

<style scoped>

</style>
