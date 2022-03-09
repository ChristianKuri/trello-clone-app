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
      </div>
    </div>
  </div>
</template>

<style lang="css">
.min-w-350px {
  min-width: 350px;
}
</style>
