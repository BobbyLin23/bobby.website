<script lang="ts" setup>
const contactEmail = 'linzhangsheng23@gmail.com'
</script>

<template>
  <section class="my-8 space-y-8">
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
            :to="`mailto:${contactEmail}`"
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
</template>
