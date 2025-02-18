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
      <div class="flex justify-center items-center gap-1">
      <Button variant="ghost" @click="toggleDark()" class="w-8 h-8">
        <Transition name="scale" mode="out-in">
          <Icon v-if="isDark" icon="lucide:sun"></Icon>
          <Icon v-else icon="lucide:moon"></Icon>
        </Transition>
      </Button>
      <div class="w-8">
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
                  name: '/users/[username]',
                  params: { username: profile.username }
                }"
                class="w-full h-full"
              >
                Profile
              </RouterLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    </nav>
    </header>
</template>

<script setup lang="ts">
const { profile } = storeToRefs(useAuthStore())

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>

<style scoped>

</style>
