<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <div
    class="z-10 bg-default text-xs flex justify-between items-center"
  >
    <span>
      {{ footer.credits }}
    </span>

    <div class="flex gap-2">
      <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </div>
  </div>
</template>
