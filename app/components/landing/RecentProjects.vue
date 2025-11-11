<script lang="ts" setup>
const { data: projects } = await useAsyncData('recent-projects', () =>
  queryCollection('projects').order('date', 'DESC').limit(3).all())
</script>

<template>
  <UPageSection
    title="Recent Projects"
    description="Showcase of my recent focus projects"
    :ui="{
      container: 'px-0 !pt-0 sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted',
    }"
  >
    <div class="grid grid-cols-2 gap-6">
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
          <div class="flex min-h-8 flex-1 flex-wrap content-start gap-2">
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
  </UPageSection>
</template>
