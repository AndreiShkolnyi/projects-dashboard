<template>
  <header>
      <nav class="h-16 border-b bg-muted/40 flex gap-2 justify-between px-6 items-center">
      <form class="relative h-fit w-full max-w-96">
        <Icon
          class="absolute top-[50%] translate-y-[-50%] left-2.5 text-muted-foreground"
          icon="lucide:search"
        ></Icon>
        <Input class="w-full pl-8 bg-background" type="text" placeholder="Search ..." />
      </form>
      <DropdownMenu v-if="profile">
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
            :src="profile.avatar_url || ''"
            :alt="`${profile.full_name} profile picture`"
          />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
          <RouterLink
            :to="{
              name: '/profile',
            }"
            class="w-full h-full"
          >
            Profile
          </RouterLink>
        </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
    </header>
</template>

<script setup lang="ts">
const { profile } = storeToRefs(useAuthStore())
</script>

<style scoped>

</style>
