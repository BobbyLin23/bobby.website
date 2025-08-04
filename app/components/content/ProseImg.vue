<script setup lang="ts">
interface Props {
  src: string
  alt?: string
  width?: number | string
  height?: number | string
  sizes?: string
  quality?: number
}

defineProps<Props>()
</script>

<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    format="webp"
    loading="lazy"
    class="my-6 h-auto max-w-full rounded-lg shadow-md"
    :sizes="sizes || 'sm:100vw md:80vw lg:800px'"
    :quality="quality || 85"
  />
</template>
