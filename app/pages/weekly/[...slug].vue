<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('weekly').path(route.path).first())
if (!page.value)
  throw createError({ statusCode: 404, statusMessage: 'Weekly not found', fatal: true })

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title,
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="min-h-screen">
    <Motion
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.6 }"
      class="relative"
    >
      <div class="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <Motion
          :initial="{ opacity: 0, x: -20 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.6, delay: 0.1 }"
        >
          <NuxtLink
            to="/weekly"
            class="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors duration-200 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <UIcon name="i-lucide-chevron-left" class="h-4 w-4" />
            Weekly
          </NuxtLink>
        </Motion>

        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.2 }"
          class="mt-8"
        >
          <div class="flex flex-col gap-6">
            <div class="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span v-if="page?.date" class="flex items-center gap-1">
                <UIcon name="i-lucide-calendar" class="h-4 w-4" />
                {{ formatDate(page.date) }}
              </span>
            </div>

            <Motion
              :initial="{ opacity: 0, scale: 0.95 }"
              :animate="{ opacity: 1, scale: 1 }"
              :transition="{ duration: 0.8, delay: 0.4 }"
              class="relative overflow-hidden rounded-2xl"
            >
              <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </Motion>

            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.8, delay: 0.6 }"
            >
              <h1 class="text-center text-4xl leading-tight font-bold text-gray-900 md:text-5xl dark:text-white">
                {{ page?.title }}
              </h1>
            </Motion>

            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.8, delay: 0.8 }"
            >
              <p class="mx-auto max-w-3xl text-center text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                {{ page?.description }}
              </p>
            </Motion>
          </div>
        </Motion>

        <Motion
          :initial="{ opacity: 0, y: 40 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 1.2 }"
          class="mt-16"
        >
          <div class="max-w-none">
            <ContentRenderer
              v-if="page?.body"
              :value="page"
            />
          </div>
        </Motion>
      </div>
    </Motion>
  </div>
</template>
