<script lang="ts" setup>
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const { footer } = useAppConfig()
</script>

<template>
  <div class="text-center">
    <div class="mb-4 flex items-center justify-center">
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)',
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
        }"
        :transition="{
          duration: 0.6,
          delay: 0.1,
        }"
      >
        <UAvatar
          class="ring-default size-18 ring ring-offset-3 ring-offset-(--ui-bg)"
          src="/image.png"
        />
      </Motion>
    </div>
    <h1 class="mx-auto max-w-lg text-3xl font-bold tracking-tight text-pretty text-shadow-md sm:text-4xl lg:text-5xl">
      <div class="mx-auto max-w-lg text-shadow-md">
        <Motion
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)',
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
          }"
          :transition="{
            duration: 0.6,
            delay: 0.1,
          }"
        >
          {{ page.title }}
        </Motion>
      </div>
    </h1>
    <div class="text-md sm:text-md text-muted mx-auto mt-6 max-w-2xl text-balance">
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)',
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
        }"
        :transition="{
          duration: 0.6,
          delay: 0.3,
        }"
      >
        {{ page.description }}
      </Motion>
    </div>
    <div class="mt-4 inline-flex gap-x-4">
      <Motion
        v-for="(link, index) of footer?.links"
        :key="index"
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)',
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
        }"
        :transition="{
          duration: 0.6,
          delay: 0.5 + index * 0.1,
        }"
      >
        <UButton
          v-bind="{ size: 'md', color: 'neutral', variant: 'ghost', ...link }"
        />
      </Motion>
    </div>
  </div>
</template>
