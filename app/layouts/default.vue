<script lang="ts" setup>

</script>

<template>
  <div>
    <UContainer class="border-default pt-10 sm:border-x">
      <AppHeader :items="navLinks" />
      <slot />
      <AppFooter />
    </UContainer>
  </div>
</template>
