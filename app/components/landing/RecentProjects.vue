<script lang="ts" setup>
const { data: projects } = await useAsyncData('recent-projects', () =>
  queryCollection('projects').order('date', 'DESC').limit(3).all())
</script>

<template>
  <section class="space-y-8">
    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, delay: 1.2 }"
    >
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
            Recent Focus Projects
          </h2>
          <p class="text-muted-foreground">
            Showcase of my recent focus projects
          </p>
        </div>
        <UButton
          to="/projects"
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
        v-for="(project, index) in projects"
        :key="project.id"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 1.4 + index * 0.2 }"
      >
        <UCard class="group flex h-full flex-col transition-all hover:shadow-lg">
          <template #header>
            <div class="flex h-20 items-start gap-3">
              <div class="min-w-0 flex-1">
                <h3 class="mb-1 truncate font-semibold">
                  {{ project.title }}
                </h3>
                <p class="text-muted-foreground line-clamp-2 text-sm leading-tight">
                  {{ project.description }}
                </p>
              </div>
            </div>
          </template>
          <div class="flex min-h-[2rem] flex-1 flex-wrap content-start gap-2">
            <UBadge
              v-for="tech in project.tags"
              :key="tech"
              variant="soft"
              size="sm"
            >
              {{ tech }}
            </UBadge>
          </div>
          <template #footer>
            <div class="flex h-8 items-center">
              <UButton
                :to="project.url"
                variant="ghost"
                size="sm"
                icon="i-lucide-external-link"
                target="_blank"
              >
                Learn More
              </UButton>
            </div>
          </template>
        </UCard>
      </Motion>
    </div>
  </section>
</template>
