<script lang="ts" setup>
import { format } from 'date-fns'

const { data: blogs } = await useAsyncData('recent-blogs', () =>
  queryCollection('blogs').order('date', 'DESC').limit(3).all())
</script>

<template>
  <section class="space-y-8">
    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, delay: 1.8 }"
    >
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
            Recent Blogs
          </h2>
          <p class="text-muted-foreground">
            Share my technical insights and development experience
          </p>
        </div>
        <UButton
          to="/blogs"
          variant="ghost"
          icon="i-lucide-arrow-right"
          class="hidden sm:flex"
        >
          View All
        </UButton>
      </div>
    </Motion>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Motion
        v-for="(blog, index) in blogs"
        :key="blog.id"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 2.0 + index * 0.2 }"
      >
        <UCard class="group flex h-full flex-col transition-all hover:shadow-lg">
          <template #header>
            <div class="flex h-20 flex-col">
              <h3 class="flex-1 font-semibold">
                {{ blog.title }}
              </h3>
              <div>
                <UBadge variant="soft" size="md">
                  {{ format(new Date(blog.date), 'MMM d, yyyy') }}
                </UBadge>
              </div>
            </div>
          </template>
          <p class="text-muted-foreground line-clamp-4 h-20 text-sm">
            {{ blog.description }}
          </p>
          <template #footer>
            <div class="flex h-8 items-center">
              <NuxtLink
                :href="blog.path"
                class="text-primary hover:text-primary/85 inline-flex items-center text-sm font-medium transition-colors"
              >
                Read More
              </NuxtLink>
            </div>
          </template>
        </UCard>
      </Motion>
    </div>
  </section>
</template>
