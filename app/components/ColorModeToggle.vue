<script setup lang="ts">
const colorMode = useColorMode()

const currentTheme = computed(() => colorMode.value)

const currentPreference = computed(() => colorMode.preference || 'system')

const nextPreference = computed((): 'system' | 'light' | 'dark' => {
  const preferences: ('system' | 'light' | 'dark')[] = ['system', 'light', 'dark']
  const currentPref = currentPreference.value as 'system' | 'light' | 'dark'
  const currentIndex = preferences.indexOf(currentPref)
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % preferences.length
  return preferences[nextIndex] || 'system'
})

const currentIcon = computed(() => {
  if (currentPreference.value === 'system') {
    return 'i-lucide-monitor'
  }
  return currentTheme.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'
})

const nextThemeLabel = computed(() => {
  if (nextPreference.value === 'system') {
    return 'system'
  }
  return nextPreference.value === 'dark' ? 'dark' : 'light'
})

function switchTheme() {
  colorMode.preference = nextPreference.value
}

function startViewTransition(event: MouseEvent) {
  if (!document.startViewTransition) {
    switchTheme()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )

  const transition = document.startViewTransition(() => {
    switchTheme()
  })

  transition.ready.then(() => {
    const duration = 600
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: 'cubic-bezier(.76,.32,.29,.99)',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  })
}
</script>

<template>
  <ClientOnly>
    <UButton
      :aria-label="`Switch to ${nextThemeLabel} mode`"
      :icon="currentIcon"
      color="neutral"
      variant="ghost"
      size="sm"
      class="cursor-pointer rounded-full"
      @click="startViewTransition"
    />
    <template #fallback>
      <div class="size-4" />
    </template>
  </ClientOnly>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}
::view-transition-old(root) {
  z-index: 1;
}
</style>
