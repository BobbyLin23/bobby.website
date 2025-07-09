<script lang="ts" setup>

</script>

<template>
  <UContainer class="sm:border-x border-default pt-10">
    <AppHeader :links="navLinks" />
    <slot />
    <AppFooter />
  </UContainer>
</template>
