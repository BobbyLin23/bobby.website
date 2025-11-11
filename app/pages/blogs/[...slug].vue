<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('blogs').path(route.path).first())
if (!page.value)
  throw createError({ statusCode: 404, statusMessage: 'Blog not found', fatal: true })

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings('blogs', route.path, {
    fields: ['description'],
  }))

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
  <UMain class="mt-20 px-2">
    <UContainer class="relative min-h-screen">
      <UPage v-if="page">
        <ULink
          to="/blog"
          class="flex items-center gap-1 text-sm"
        >
          <UIcon name="lucide:chevron-left" />
          Blog
        </ULink>
        <div class="mt-8 flex flex-col gap-3">
          <div class="text-muted flex items-center justify-center gap-2 text-xs">
            <span v-if="page.date">
              {{ formatDate(page.date) }}
            </span>
            <span v-if="page.date && page.minRead">
              -
            </span>
            <span v-if="page.minRead">
              {{ page.minRead }} MIN READ
            </span>
          </div>
          <NuxtImg
            :src="page.image"
            :alt="page.title"
            class="h-[300px] w-full rounded-lg object-cover object-center"
          />
          <h1 class="mx-auto mt-4 max-w-3xl text-center text-4xl font-medium">
            {{ page.title }}
          </h1>
          <p class="text-muted mx-auto max-w-2xl text-center">
            {{ page.description }}
          </p>
          <div class="mt-2 flex items-center justify-center gap-2">
            <UUser
              orientation="vertical"
              color="neutral"
              variant="outline"
              class="items-center justify-center text-center"
              v-bind="page.author"
            />
          </div>
        </div>
        <UPageBody class="mx-auto max-w-3xl">
          <ContentRenderer
            v-if="page.body"
            :value="page"
          />

          <UContentSurround :surround />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
</template>
