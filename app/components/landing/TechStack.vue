<script lang="ts" setup>

</script>

<template>
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
</template>
