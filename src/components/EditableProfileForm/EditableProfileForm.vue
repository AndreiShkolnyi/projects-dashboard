<script setup lang="ts">
import type { Tables } from 'database/types';

const { profile } = defineProps<{ profile: Tables<'profiles'> | null, isEditable: boolean }>()
const editProfile = (formData: any) => console.log(formData)
const emit = defineEmits<{
  (e: 'toggle', value: boolean): void
}>()

</script>
<template>
  <div class="flex flex-col items-center justify-center pb-4">
    <Avatar size="lg">
      <AvatarImage :src="profile?.avatar_url || ''" alt="@radix-vue" />
      <AvatarFallback>{{ profile?.username }}</AvatarFallback>
    </Avatar>
    <template v-if="!isEditable">
      <p class="mt-2 text-gray-500">{{ `@${profile?.username}` }}</p>
      <h1 class="mt-5 text-4xl font-bold">{{ profile?.full_name }}</h1>
      <p class="mt-2 text-sm">{{ profile?.bio }}</p>
      <Button @click="emit('toggle', true)">Edit profile</Button>
    </template>
    <template v-if="isEditable">
      <FormKit v-if="profile" type="form" @submit="editProfile" submit-label="Edit Profile" :config="{
        validationVisibility: 'submit'
      }">
        <FormKit type="text" name="full_name" id="name" label="Name" placeholder="Name" v-model="profile.full_name"
          validation="required|length:1,255" />
        <FormKit type="text" name="avatar_url" id="avatar_url" label="Avatar" placeholder="Avatar"
          v-model="profile.avatar_url" validation="required|length:1,255" />
        <FormKit type="textarea" name="bio" id="description" label="Bio" placeholder="Your bio" v-model="profile.bio"
          validation="length:0,500" />
        <template #submit="{ node, handlers }">
          <Button type="submit" variant="outline" size="lg" @click="handlers.submit">Submit changes</Button>
        </template>
      </FormKit>
    </template>
  </div>
</template>
