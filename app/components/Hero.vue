<script lang="ts" setup>
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const { footer } = useAppConfig()
</script>

<template>
  <div class="text-center">
    <div class="flex items-center justify-center mb-4">
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
          class="size-18 ring ring-default ring-offset-3 ring-offset-(--ui-bg)"
          src="/image.png"
        />
      </Motion>
    </div>
    <h1 class="tracking-tight font-bold text-pretty text-3xl sm:text-4xl lg:text-5xl text-shadow-md max-w-lg mx-auto">
      <div class="text-shadow-md max-w-lg mx-auto">
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
    <div class="text-md mx-auto max-w-2xl sm:text-md text-muted text-balance mt-6">
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
    <div class="gap-x-4 inline-flex mt-4">
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
    <div class="mt-8">
      <UCarousel
        v-slot="{ item }"
        loop
        :autoplay="{ delay: 2000 }"
        :items="page.hero.images"
        :ui="{ item: 'basis-1/4', container: 'w-full' }"
      >
        <img :src="item.src" :alt="item.alt" width="234" height="234" class="rounded-lg">
      </UCarousel>
    </div>
  </div>
</template>
