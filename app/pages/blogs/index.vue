<script lang="ts" setup>
const { data: page } = await useAsyncData('blog-page', () => {
  return queryCollection('pages').path('/blogs').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

const { data: posts } = await useAsyncData('blogs', () =>
  queryCollection('blogs').order('date', 'DESC').all())
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'blogs posts not found',
    fatal: true,
  })
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getReadTimeColor(minRead: number) {
  if (minRead <= 5)
    return 'text-emerald-600 bg-emerald-50'
  if (minRead <= 10)
    return 'text-blue-600 bg-blue-50'
  if (minRead <= 15)
    return 'text-orange-600 bg-orange-50'
  return 'text-red-600 bg-red-50'
}
</script>

<template>
  <template v-if="page">
    <div class="min-h-screen">
      <!-- Hero Section -->
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        class="relative overflow-hidden"
      >
        <div class="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div class="text-center">
            <Motion
              :initial="{ opacity: 0, scale: 0.9 }"
              :animate="{ opacity: 1, scale: 1 }"
              :transition="{ duration: 0.8, delay: 0.2 }"
            >
              <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                {{ page.title }}
              </h1>
            </Motion>
            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.8, delay: 0.4 }"
            >
              <p class="mx-auto mt-6 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
                {{ page.description }}
              </p>
            </Motion>
            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.8, delay: 0.6 }"
            >
              <div class="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <UIcon name="i-heroicons-document-text" class="h-5 w-5" />
                <span>{{ posts?.length || 0 }} posts</span>
                <UIcon name="i-heroicons-clock" class="h-5 w-5" />
                <span>Updating...</span>
              </div>
            </Motion>
          </div>
        </div>
      </Motion>

      <!-- Blog Posts Grid -->
      <div class="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <Motion
          :initial="{ opacity: 0, y: 40 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.8 }"
        >
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Motion
              v-for="(post, index) in posts"
              :key="post.path"
              :initial="{ opacity: 0, y: 30, scale: 0.95 }"
              :while-in-view="{ opacity: 1, y: 0, scale: 1 }"
              :transition="{
                duration: 0.6,
                delay: 0.1 * index,
                ease: [0.25, 0.46, 0.45, 0.94],
              }"
              :in-view-options="{ once: true, margin: '-100px' }"
              class="group"
            >
              <NuxtLink
                :to="post.path"
                class="block h-full"
              >
                <div class="relative h-full overflow-hidden rounded-2xl bg-white shadow-lg shadow-gray-200/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-gray-300/50 dark:bg-slate-800 dark:shadow-black/20 dark:group-hover:shadow-black/30">
                  <!-- Image -->
                  <div class="relative h-48 overflow-hidden rounded-t-2xl">
                    <img
                      :src="post.image"
                      :alt="post.title"
                      class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    >
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                    <!-- Read Time Badge -->
                    <div class="absolute top-4 right-4">
                      <span
                        class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
                        :class="[
                          getReadTimeColor(post.minRead),
                        ]"
                      >
                        <UIcon name="i-heroicons-clock" class="h-3 w-3" />
                        {{ post.minRead }} minutes
                      </span>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="p-6">
                    <!-- Date -->
                    <div class="mb-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <UIcon name="i-heroicons-calendar" class="h-4 w-4" />
                      <time :datetime="post.date">{{ formatDate(post.date) }}</time>
                    </div>

                    <!-- Title -->
                    <h3 class="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {{ post.title }}
                    </h3>

                    <!-- Description -->
                    <p class="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                      {{ post.description }}
                    </p>

                    <!-- Author -->
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <img
                          v-if="post.author.avatar"
                          :src="post.author.avatar.src"
                          :alt="post.author.name"
                          class="h-8 w-8 rounded-full object-cover"
                        >
                        <div v-else class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                          <span class="text-xs font-bold text-white">{{ post.author.name.charAt(0) }}</span>
                        </div>
                        <span class="text-sm font-medium text-gray-900 dark:text-white">
                          {{ post.author.name }}
                        </span>
                      </div>

                      <!-- Arrow Icon -->
                      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors duration-200 group-hover:bg-blue-100 dark:bg-slate-700 dark:group-hover:bg-blue-900/30">
                        <UIcon
                          name="i-heroicons-arrow-right"
                          class="h-4 w-4 text-gray-600 transition-colors duration-200 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Hover Effect Overlay -->
                  <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 transition-all duration-500 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-pink-600/5" />
                </div>
              </NuxtLink>
            </Motion>
          </div>
        </Motion>

        <!-- Empty State -->
        <Motion
          v-if="!posts || posts.length === 0"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          class="py-16 text-center"
        >
          <div class="mx-auto max-w-md">
            <UIcon
              name="i-heroicons-document-text"
              class="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600"
            />
            <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              No blog posts
            </h3>
            <p class="mt-2 text-gray-500 dark:text-gray-400">
              Coming soon...
            </p>
          </div>
        </Motion>
      </div>
    </div>
  </template>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
