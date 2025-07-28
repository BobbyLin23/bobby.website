<script lang="ts" setup>
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description,
})
</script>

<template>
  <div
    v-if="page"
    class="mx-auto flex w-full max-w-(--ui-container) flex-col gap-16 px-4 py-18 sm:gap-y-24 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
  >
    <Hero :page="page" />

    <section class="space-y-8">
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.7 }"
      >
        <h2 class="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Tech Stack
        </h2>
        <p class="text-muted-foreground text-center">
          I focus on modern full-stack development technologies
        </p>
      </Motion>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <Motion
          v-for="(skill, index) in techs"
          :key="skill.name"
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.5, delay: 0.8 + index * 0.1 }"
        >
          <div class="group bg-card border-default relative overflow-hidden rounded-lg border p-6 text-center transition-all hover:shadow-lg">
            <div class="mb-3 flex justify-center">
              <div class="text-3xl">
                <Icon :name="skill.icon" />
              </div>
            </div>
            <h3 class="font-medium">
              {{ skill.name }}
            </h3>
          </div>
        </Motion>
      </div>
    </section>

    <!-- Recent Focus Projects -->
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
          v-for="(project, index) in [
            {
              title: 'Personal Website',
              description: 'Modern personal website built with Nuxt 4 and Tailwind CSS',
              tags: ['Nuxt 4', 'Vue 3', 'Tailwind CSS'],
              icon: 'i-lucide-globe',
              color: 'bg-blue-500/10 text-blue-500',
            },
            {
              title: 'E-commerce Platform',
              description: 'Full-stack e-commerce solution based on Vue 3 and Node.js',
              tags: ['Vue 3', 'Node.js', 'PostgreSQL'],
              icon: 'i-lucide-shopping-cart',
              color: 'bg-green-500/10 text-green-500',
            },
            {
              title: 'Data Visualization',
              description: 'Interactive data visualization platform built with D3.js and Vue 3',
              tags: ['Vue 3', 'D3.js', 'TypeScript'],
              icon: 'i-lucide-bar-chart-3',
              color: 'bg-purple-500/10 text-purple-500',
            },
          ]"
          :key="project.title"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 1.4 + index * 0.2 }"
        >
          <UCard class="group h-full transition-all hover:shadow-lg">
            <template #header>
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg" :class="project.color">
                  <Icon :name="project.icon" />
                </div>
                <div>
                  <h3 class="font-semibold">
                    {{ project.title }}
                  </h3>
                  <p class="text-muted-foreground text-sm">
                    {{ project.description }}
                  </p>
                </div>
              </div>
            </template>
            <div class="flex flex-wrap gap-2">
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
              <UButton
                variant="ghost"
                size="sm"
                icon="i-lucide-external-link"
              >
                Learn More
              </UButton>
            </template>
          </UCard>
        </Motion>
      </div>
    </section>

    <!-- Blog Preview -->
    <section class="space-y-8">
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 1.8 }"
      >
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
              Tech Blogs
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
          v-for="(blog, index) in [
            {
              title: 'Nuxt 4 New Features and Performance Improvements',
              description: 'Deep dive into the new features and performance improvements of Nuxt 4, and how to apply these features in real projects.',
              date: '2024-01-15',
              icon: 'i-lucide-file-text',
              color: 'bg-blue-500/10 text-blue-500',
            },
            {
              title: 'Best Practices for Vue 3 Composition API',
              description: 'Share my experiences and best practices for using Vue 3 Composition API, helping developers write clearer code.',
              date: '2024-01-10',
              icon: 'i-lucide-code',
              color: 'bg-green-500/10 text-green-500',
            },
            {
              title: 'Modern Frontend Performance Optimization Strategies',
              description: 'Explore various strategies for optimizing the performance of modern frontend applications, from code splitting to cache strategies.',
              date: '2024-01-05',
              icon: 'i-lucide-zap',
              color: 'bg-yellow-500/10 text-yellow-500',
            },
          ]"
          :key="blog.title"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 2.0 + index * 0.2 }"
        >
          <UCard class="group h-full transition-all hover:shadow-lg">
            <template #header>
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg" :class="blog.color">
                  <Icon :name="blog.icon" />
                </div>
                <div>
                  <h3 class="font-semibold">
                    {{ blog.title }}
                  </h3>
                  <p class="text-muted-foreground text-sm">
                    {{ new Date(blog.date).toLocaleDateString('zh-CN') }}
                  </p>
                </div>
              </div>
            </template>
            <p class="text-muted-foreground line-clamp-3 text-sm">
              {{ blog.description }}
            </p>
            <template #footer>
              <UButton
                variant="ghost"
                size="sm"
              >
                Read More
              </UButton>
            </template>
          </UCard>
        </Motion>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="space-y-8">
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 2.4 }"
      >
        <div class="border-default rounded-lg border p-8 text-center">
          <h2 class="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Let's work together
          </h2>
          <p class="text-muted-foreground mb-6">
            If you have project ideas or want to discuss technical issues, I'd love to chat with you
          </p>
          <div class="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <UButton
              to="mailto:bobby@example.com"
              color="primary"
              size="lg"
              icon="i-lucide-mail"
            >
              Contact Me
            </UButton>
            <UButton
              to="/projects"
              variant="outline"
              size="lg"
              icon="i-lucide-folder"
            >
              View Works
            </UButton>
          </div>
        </div>
      </Motion>
    </section>
  </div>
</template>
