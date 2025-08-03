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
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
})
</script>

<template>
  <div
    v-if="page"
    class="mx-auto flex w-full max-w-(--ui-container) flex-col gap-16 px-4 py-18 sm:gap-y-24 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
  >
    <LandingHero :page="page" />

    <LandingTechStack />

    <LandingRecentProjects />

    <LandingRecentBlogs />

    <LandingContactCTA />
  </div>
</template>
