<script lang="ts" setup>
import {
  addDays,
  addMonths,
  format,
  getMonth,
  getWeek,
  getYear,
  isSameDay,
  isToday,
  parseISO,
  startOfWeek,
  subMonths,
} from 'date-fns'

const { data: page } = await useAsyncData('weekly-page', () => {
  return queryCollection('pages').path('/weekly').first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Weekly page not found',
    fatal: true,
  })
}

const { data: reports } = await useAsyncData('weekly-reports', () =>
  queryCollection('weekly').order('date', 'DESC').all())

if (!reports.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Weekly reports not found',
    fatal: true,
  })
}

const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth())
const selectedDate = ref<string | null>(null)

const calendarData = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value

  const firstDay = new Date(year, month, 1)

  const calendarStart = startOfWeek(firstDay, { weekStartsOn: 0 })

  const days = []
  let currentDate = calendarStart

  for (let i = 0; i < 42; i++) {
    const dateStr = format(currentDate, 'yyyy-MM-dd')

    const weekReport = reports.value?.find((report) => {
      const reportDate = parseISO(report.date)
      return isSameDay(reportDate, currentDate)
    })

    days.push({
      date: new Date(currentDate),
      dateStr,
      isCurrentMonth: getMonth(currentDate) === month,
      isToday: isToday(currentDate),
      weekReport,
      weekNumber: getWeekNumber(dateStr),
    })

    currentDate = addDays(currentDate, 1)
  }

  return days
})

const monthReports = computed(() => {
  return reports.value?.filter((report) => {
    const reportDate = parseISO(report.date)
    return getYear(reportDate) === currentYear.value
      && getMonth(reportDate) === currentMonth.value
  }) || []
})

function getWeekNumber(date: string) {
  const d = parseISO(date)
  return getWeek(d, { weekStartsOn: 0 })
}

function previousMonth() {
  const currentDate = new Date(currentYear.value, currentMonth.value, 1)
  const previousDate = subMonths(currentDate, 1)
  currentYear.value = getYear(previousDate)
  currentMonth.value = getMonth(previousDate)
}

function nextMonth() {
  const currentDate = new Date(currentYear.value, currentMonth.value, 1)
  const nextDate = addMonths(currentDate, 1)
  currentYear.value = getYear(nextDate)
  currentMonth.value = getMonth(nextDate)
}

function goToToday() {
  const today = new Date()
  currentYear.value = getYear(today)
  currentMonth.value = getMonth(today)
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6 }"
      class="relative overflow-hidden"
    >
      <div class="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div class="text-center">
          <Motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 0.8, delay: 0.2 }"
          >
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
              {{ page?.title }}
            </h1>
          </Motion>
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.4 }"
          >
            <p class="mx-auto mt-6 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              {{ page?.description }}
            </p>
          </Motion>
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.6 }"
          >
            <div class="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <UIcon name="i-heroicons-calendar-days" class="h-5 w-5" />
              <span>{{ reports?.length || 0 }} weekly reports</span>
              <UIcon name="i-heroicons-clock" class="h-5 w-5" />
              <span>Updated weekly</span>
            </div>
          </Motion>
        </div>
      </div>
    </Motion>

    <div class="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <!-- Calendar View -->
      <Motion
        :initial="{ opacity: 0, y: 40 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.8 }"
        class="mb-16"
      >
        <div class="rounded-2xl bg-white shadow-lg shadow-gray-200/50 dark:bg-neutral-800 dark:shadow-black/20">
          <!-- Calendar Header -->
          <div class="border-b border-gray-100 p-6 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                  {{ monthNames[currentMonth] }} {{ currentYear }}
                </h2>
                <UBadge
                  v-if="monthReports.length > 0"
                  variant="soft"
                  color="primary"
                >
                  {{ monthReports.length }} Weekly Reports
                </UBadge>
              </div>
              <div class="flex items-center gap-2">
                <UButton
                  variant="ghost"
                  icon="i-heroicons-chevron-left"
                  @click="previousMonth"
                />
                <UButton
                  variant="ghost"
                  @click="goToToday"
                >
                  Today
                </UButton>
                <UButton
                  variant="ghost"
                  icon="i-heroicons-chevron-right"
                  @click="nextMonth"
                />
              </div>
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="p-6">
            <!-- Weekday Headers -->
            <div class="mb-2 grid grid-cols-7 gap-1">
              <div
                v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
                :key="day"
                class="flex h-10 items-center justify-center text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                {{ day }}
              </div>
            </div>

            <!-- Calendar Days -->
            <div class="grid grid-cols-7 gap-1">
              <div
                v-for="day in calendarData"
                :key="day.dateStr"
                class="group relative min-h-[80px] cursor-pointer rounded-lg border border-transparent p-2 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/50 dark:hover:border-blue-700 dark:hover:bg-blue-900/20"
                :class="{
                  'bg-gray-50 text-gray-400 dark:bg-neutral-700 dark:text-gray-500': !day.isCurrentMonth,
                  'border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20': day.isToday,
                  'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20': day.weekReport,
                }"
                @click="selectedDate = day.weekReport ? day.dateStr : null"
              >
                <!-- Date Number -->
                <div class="flex items-center justify-between">
                  <span
                    class="text-sm font-medium"
                    :class="{
                      'text-gray-400': !day.isCurrentMonth,
                      'text-blue-600 dark:text-blue-400': day.isToday,
                      'text-green-600 dark:text-green-400': day.weekReport,
                      'text-gray-900 dark:text-white': day.isCurrentMonth && !day.isToday && !day.weekReport,
                    }"
                  >
                    {{ day.date.getDate() }}
                  </span>
                  <span
                    v-if="day.weekReport"
                    class="text-xs text-green-600 dark:text-green-400"
                  >
                    W{{ day.weekNumber }}
                  </span>
                </div>

                <UPopover v-if="day.weekReport" mode="hover">
                  <div class="mt-1">
                    <div class="rounded bg-green-100 p-1 dark:bg-green-900/30">
                      <div class="line-clamp-1 text-xs font-medium text-green-700 dark:text-green-300">
                        {{ day.weekReport.title }}
                      </div>
                      <div class="mt-1 flex flex-wrap gap-1">
                        <UBadge
                          v-for="tag in day.weekReport.tags?.slice(0, 2)"
                          :key="tag"
                          variant="outline"
                          size="xs"
                        >
                          {{ tag }}
                        </UBadge>
                      </div>
                    </div>
                  </div>
                  <template #content>
                    <div class="w-80 space-y-3 p-4">
                      <div>
                        <h4 class="font-semibold text-gray-900 dark:text-white">
                          {{ day.weekReport.title }}
                        </h4>
                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {{ day.weekReport.description }}
                        </p>
                      </div>
                      <div v-if="day.weekReport.tags?.length" class="flex flex-wrap gap-1">
                        <UBadge
                          v-for="tag in day.weekReport.tags"
                          :key="tag"
                          variant="soft"
                          size="xs"
                        >
                          {{ tag }}
                        </UBadge>
                      </div>
                      <div class="border-t pt-3 dark:border-gray-700">
                        <NuxtLink
                          :to="`/${day.weekReport.id.replace('weekly/', '').replace('.md', '')}`"
                          class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center text-sm font-medium"
                        >
                          Read More
                          <UIcon name="i-heroicons-arrow-right" class="ml-1 size-4" />
                        </NuxtLink>
                      </div>
                    </div>
                  </template>
                </UPopover>
              </div>
            </div>
          </div>
        </div>
      </Motion>

      <!-- Empty State -->
      <Motion
        v-if="!reports || reports.length === 0"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        class="py-16 text-center"
      >
        <div class="mx-auto max-w-md">
          <UIcon
            name="i-heroicons-calendar-days"
            class="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600"
          />
          <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No Weekly Reports
          </h3>
          <p class="mt-2 text-gray-500 dark:text-gray-400">
            Weekly reports will appear here as I write them.
          </p>
        </div>
      </Motion>
    </div>
  </div>
</template>
