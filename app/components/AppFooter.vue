<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <div
    class="bg-default z-10 flex items-center justify-between py-4 text-xs"
  >
    <span>
      {{ footer.credits }}
    </span>

    <div class="flex gap-2">
      <template v-if="footer?.links">
        <UTooltip v-for="(link, index) of footer?.links" :key="index" :text="link['aria-label'] ">
          <UButton
            v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
          />
        </UTooltip>
      </template>
    </div>
  </div>
</template>
