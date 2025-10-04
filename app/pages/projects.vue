<script lang="ts" setup>
const { data: page } = await useAsyncData('projects-page', () => {
  return queryCollection('pages').path('/projects').first()
})

const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects').order('date', 'DESC').all()
})

if (!projects.value || projects.value.length === 0) {
  throw createError({
    statusCode: 404,
    statusMessage: 'No projects found',
    fatal: true,
  })
}

const global = {
  email: 'linzhangsheng23@gmail.com',
}

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  ogTitle: page.value?.title,
  ogDescription: page.value?.description,
})
</script>

<template>
  <div class="min-h-screen">
    <div v-if="page" class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        class="mb-16"
      >
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
            {{ page.title }}
          </h1>
          <p class="mx-auto mt-6 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            {{ page.description }}
          </p>
          <div v-if="page.links" class="mt-8 flex items-center justify-center gap-4">
            <UButton
              :label="page.links[0]?.label"
              :to="`mailto:${global.email}`"
              v-bind="page.links[0]"
            />
          </div>
        </div>
      </Motion>

      <!-- Projects Grid -->
      <div class="space-y-12">
        <Motion
          v-for="(project, index) in projects"
          :key="project.title"
          :initial="{ opacity: 0, transform: 'translateY(20px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.2 * index }"
          :in-view-options="{ once: true }"
        >
          <div class="group relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-300/50 dark:bg-neutral-800 dark:shadow-black/20 dark:hover:shadow-black/30">
            <div class="grid gap-8 lg:grid-cols-2" :class="{ 'lg:grid-flow-col-dense': index % 2 === 1 }">
              <div class="relative h-64 overflow-hidden rounded-t-2xl lg:h-full lg:rounded-t-none lg:rounded-l-2xl" :class="{ 'lg:order-2': index % 2 === 1 }">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div class="flex flex-col justify-center p-8" :class="{ 'lg:order-1': index % 2 === 1 }">
                <div class="mb-4">
                  <span class="text-muted text-sm">
                    {{ new Date(project.date).getFullYear() }}
                  </span>
                </div>

                <h3 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {{ project.title }}
                </h3>

                <p class="mb-6 text-lg text-gray-600 dark:text-gray-300">
                  {{ project.description }}
                </p>

                <!-- Tags -->
                <div class="mb-6 flex flex-wrap gap-2">
                  <span
                    v-for="tag in project.tags"
                    :key="tag"
                    class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {{ tag }}
                  </span>
                </div>

                <!-- View Project Link -->
                <ULink
                  :to="project.url"
                  class="text-primary hover:text-primary-600 inline-flex items-center text-sm font-medium transition-colors"
                >
                  View Project
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="ml-2 size-4 transition-all group-hover:translate-x-1"
                  />
                </ULink>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </div>
</template>
