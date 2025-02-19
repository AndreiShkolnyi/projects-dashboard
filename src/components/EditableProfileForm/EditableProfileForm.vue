<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
import type { Tables } from 'database/types';
import { useToggle } from '@vueuse/core'

interface FormData {
  full_name: string
  avatar_url: string
  bio: string
}

const isEditable = ref(false)
const toggle = useToggle(isEditable)

const { profile } = defineProps<{ profile: Tables<'profiles'> | null }>()

const _profile = ref({ ...profile })
const editProfile = (formData: FormData) => {
  console.log(formData)
  toggle(false)
}
</script>
<template>
  <div class="flex flex-col items-center justify-center pb-4 relative">
    <Button v-if="isEditable" class="absolute -right-4 -top-4 bg-red-400" variant="ghost" @click="toggle(false)">Discard changes</Button>
    <Avatar size="lg">
      <AvatarImage :src="profile?.avatar_url || ''" alt="@radix-vue" />
      <AvatarFallback>{{ profile?.username }}</AvatarFallback>
    </Avatar>
    <template v-if="isEditable">
      <FormKit v-if="profile" type="form" @submit="editProfile" submit-label="Edit Profile" :config="{
        validationVisibility: 'submit'
      }">
        <FormKit type="text" name="full_name" id="name" label="Name" placeholder="Name" v-model="_profile.full_name"
          validation="required|length:1,255" />
        <FormKit type="text" name="avatar_url" id="avatar_url" label="Avatar" placeholder="Avatar"
          :model-value="_profile.avatar_url ?? undefined" validation="required|length:1,255" />
        <FormKit type="textarea" name="bio" id="description" label="Bio" placeholder="Your bio" :model-value="_profile.bio ?? undefined"
          validation="length:0,500" />
        <template #submit="{ handlers }">
          <Button type="submit" variant="outline" size="lg" @click="handlers.submit">Submit changes</Button>
        </template>
      </FormKit>
    </template>
    <template v-else>
      <p class="mt-2 text-gray-500">{{ `@${profile?.username}` }}</p>
      <h1 class="mt-5 text-4xl font-bold">{{ profile?.full_name }}</h1>
      <p class="mt-2 text-sm">{{ profile?.bio }}</p>
      <Button @click="toggle(true)">Edit profile</Button>
    </template>
  </div>
</template>
