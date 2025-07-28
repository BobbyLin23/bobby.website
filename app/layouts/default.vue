<script lang="ts" setup>

</script>

<template>
  <div class="border-default mx-auto min-h-screen max-w-[var(--ui-container)] px-4 pt-10 pb-10 sm:border-x sm:px-6 lg:px-8">
    <AppHeader :items="navLinks" />
    <slot />
    <AppFooter />
  </div>
</template>
