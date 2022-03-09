<script setup>
import { useBoardStore } from './stores/BoardStore'
const boardStore = useBoardStore()
</script>

<template>
  <div class="h-full p-4 overflow-auto bg-teal-600">
    <div class="flex flex-row items-start">
      <div
        class="p-2 mr-4 text-left bg-gray-200 rounded shadow min-w column min-w-350px"
        v-for="(column, key) of boardStore.data.columns"
        :key="key"
      >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div>
          <div
            class="flex flex-wrap items-center px-2 py-2 mb-2 text-gray-900 no-underline bg-white rounded shadow"
            v-for="task of column.tasks"
            :key="task.id"
          >
            <span class="w-full font-bold shrink-0">
              {{ task.name }}
            </span>
            <p class="w-full mt-1 text-sm shrink-0" v-if="task.description">
              {{ task.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.min-w-350px {
  min-width: 350px;
}
</style>
